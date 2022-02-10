import yaml
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import get_ingress, k8s
from kubernetes.client.models import *
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class ListIngress(APIView):
    def get(self, request: Request):
        namespace = request.query_params.get("namespace")
        if namespace is None:
            res = k8s.network.list_ingress_for_all_namespaces()
        else:
            res = k8s.network.list_namespaced_ingress(namespace=namespace)
        return Response([Serializer.ingress(ing) for ing in res.items])


class RetrieveUpdateDestroyIngress(APIView):
    def get(self, request: Request, namespace: str, name: str):
        ingress = k8s.get_ingress(namespace, name)
        dict_object = k8s.api.sanitize_for_serialization(ingress)
        del dict_object["metadata"]["annotations"]
        del dict_object["metadata"]["managedFields"]
        yaml_str = yaml.dump(dict_object)
        return Response(yaml_str)

    def patch(self, request, name, namespace):
        yaml_data = request.data.get("yaml")
        if yaml_data is None:
            raise ParseError(detail="yaml file not found.")
        try:
            updated = k8s.network.patch_namespaced_ingress(
                name=name,
                namespace=namespace,
                body=yaml.safe_load(yaml_data),
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e))
        return Response(Serializer.ingress(updated))

    def delete(self, request, namespace, name):
        if namespace.endswith("-system"):
            raise ProtectedError()
        try:
            k8s.network.delete_namespaced_ingress(namespace=namespace, name=name)
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
