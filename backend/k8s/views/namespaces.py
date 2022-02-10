from kubernetes.client.models import *
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s


class ListCreateNamespace(APIView):
    def get(self, request: Request):
        """List all namespaces."""
        res = k8s.core.list_namespace()
        data = [Serializer.namespace(ns) for ns in res.items]
        return Response(data)


class RetrieveUpdateDestroyNamespace(APIView):
    def get(self, request):
        """Retrieves a single namespace object."""
        try:
            res = k8s.core.read_namespace(self.kwargs.get("name"))
        except Exception as e:
            raise ResourceNotFound(resource_name="Namespace", detail=str(e))
        return Response(Serializer.namespace(res))

    def delete(self, request):
        """Deletes specified namespace"""
        try:
            k8s.core.delete_namespace(name=self.kwargs.get("name"))
        except Exception as e:
            raise ResourceNotFound(resource_name="Namespace", detail=str(e))
        return Response(status=204)
