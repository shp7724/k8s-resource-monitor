from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response

from k8s.exceptions import *
from k8s.utils import k8s


@api_view(["GET"])
def top_nodes(request: Request):
    data = k8s.custom.list_cluster_custom_object("metrics.k8s.io", "v1beta1", "nodes")
    data = [node for node in data.get("items", [])]
    return Response(data)


@api_view(["GET"])
def top_pods(request: Request):
    namespace = request.query_params.get("namespace")
    data = k8s.custom.list_cluster_custom_object("metrics.k8s.io", "v1beta1", "pods")
    data = [
        pod
        for pod in data.get("items", [])
        if namespace is None or pod["metadata"]["namespace"] == namespace
    ]
    return Response(data)
