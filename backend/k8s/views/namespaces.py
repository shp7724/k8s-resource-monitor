from kubernetes.client.models import *
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response

from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s


@api_view(["GET"])
def list_namespaces(request: Request):
    res = k8s.core.list_namespace()
    data = [Serializer.namespace(ns) for ns in res.items]
    return Response(data)
