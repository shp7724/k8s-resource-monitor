from kubernetes.client.models import *
from rest_framework.decorators import api_view
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

    def post(self, request):
        """Create a namespace.

        Body:
            name: Name of the namespace.
            labels [dict]: Labels of the namespace.
        """
        namespace = V1Namespace(
            api_version="v1",
            kind="Namespace",
            metadata=V1ObjectMeta(
                name=request.data.get("name"),
                labels=request.data.get("labels"),
            ),
        )
        data = k8s.core.create_namespace(body=namespace)
        return Response(Serializer.namespace(data))


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
