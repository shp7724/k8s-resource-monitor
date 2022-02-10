from xml.dom.expatbuilder import parseFragmentString
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s


class ListPod(APIView):
    def get(self, request: Request):
        namespace = request.query_params.get("namespace")
        if namespace is None:
            res = k8s.core.list_pod_for_all_namespaces()
        else:
            res = k8s.core.list_namespaced_pod(namespace=namespace)
        data = [Serializer.pod(pod) for pod in res.items]
        return Response(data)


class DeletePod(APIView):
    def delete(self, request, namespace, name):
        try:
            k8s.core.delete_namespaced_pod(namespace=namespace, name=name)
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
