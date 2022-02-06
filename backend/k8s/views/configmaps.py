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
    def get(request):
        namespace = request.query_params.get("namespace")
        if namespace is None or namespace == "전체":
            res = k8s.core.list_config_map_for_all_namespaces(watch=False)
        else:
            res = k8s.core.list_namespaced_config_map(namespace=namespace, watch=False)
        data = [Serializer.configmap(config) for config in res.items]
        return Response(data)

    def post(request):
        create_resource(request)
        return Response(status=201)


class UpdateDestroyConfigMap(APIView):
    def patch(request: Request, namespace: str, name: str):
        configmap = get_configmap(namespace=namespace, name=name)

        new_namespace = request.data.get("namespace")
        new_name = request.data.get("name")
        new_data = request.data.get("data")

        if new_namespace is not None:
            configmap.metadata.namespace = new_namespace
        if new_name is not None:
            configmap.metadata.name = new_name
        if new_data is not None:
            configmap.data = new_data

        try:
            updated_configmap = k8s.core.patch_namespaced_config_map(
                namespace=namespace, naem=name, body=configmap
            )
        except Exception as e:
            raise K8sClientError(detail=str(e), message="ConfigMap 설정 변경 중 오류가 발생했습니다.")
        return Response(Serializer.configmap(updated_configmap))

    def delete(request, namespace: str, name: str):
        try:
            k8s.core.delete_namespaced_config_map(namespace=namespace, name=name)
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
