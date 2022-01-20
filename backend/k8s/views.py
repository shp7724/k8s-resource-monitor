from django.http import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.exceptions import NotFound
from .utils import k8s
import json


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})


@api_view(["GET"])
def list_pods(request: Request):
    namespace = request.query_params.get("namespace")
    if namespace is None:
        res = k8s.core.list_pod_for_all_namespaces(watch=False)
    else:
        res = k8s.core.list_namespaced_pod(namespace=namespace, watch=False)
    data = [
        dict(
            name=pod.metadata.name,
            namespace=pod.metadata.namespace,
            pod_ip=pod.status.pod_ip,
        )
        for pod in res.items
    ]
    return Response(data)


@api_view(["GET"])
def list_namespaces(request: Request):
    res = k8s.core.list_namespace()
    data = [dict(name=ns.metadata.name) for ns in res.items]
    return Response(data)


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
