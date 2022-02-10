import requests
import yaml
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import create_resource, get_configmap, k8s
from kubernetes.client.models import *
from kubernetes.utils import create_from_yaml
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class ListCreateConfigMaps(APIView):
    def get(self, request):
        namespace = request.query_params.get("namespace")
        if namespace is None or namespace == "전체":
            res = k8s.core.list_config_map_for_all_namespaces(watch=False)
        else:
            res = k8s.core.list_namespaced_config_map(namespace=namespace, watch=False)
        data = [Serializer.configmap(config) for config in res.items]
        return Response(data)

    def post(self, request):
        create_resource(request)
        return Response(status=201)


class RetrieveUpdateDestroyConfigMap(APIView):
    def get(self, request, namespace, name):
        configmap = get_configmap(namespace=namespace, name=name)
        dict_object = k8s.api.sanitize_for_serialization(configmap)
        del dict_object["metadata"]["annotations"]
        del dict_object["metadata"]["managedFields"]
        yaml_str = yaml.dump(dict_object)
        return Response(yaml_str)

    def patch(self, request: Request, namespace: str, name: str):
        yaml_data = request.data.get("yaml")
        if yaml_data is None:
            raise ParseError(detail="yaml file not found.")
        try:
            updated_configmap = k8s.core.patch_namespaced_config_map(
                name=name,
                namespace=namespace,
                body=yaml.safe_load(yaml_data),
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e))
        return Response(Serializer.deployment(updated_configmap))

    def delete(self, request, namespace: str, name: str):
        try:
            k8s.core.delete_namespaced_config_map(namespace=namespace, name=name)
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
