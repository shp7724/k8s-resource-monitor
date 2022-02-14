from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from k8s.serializers import Serializer
from django.contrib.auth.models import User

from k8s.exceptions import *
from k8s.utils import k8s
from kubernetes.utils import parse_quantity


@api_view(["GET"])
def top_nodes(request: Request):
    data = k8s.custom.list_cluster_custom_object("metrics.k8s.io", "v1beta1", "nodes")
    data = [Serializer.node_usage(node) for node in data.get("items", [])]
    return Response(data)


@api_view(["GET"])
def top_pods(request: Request):
    data = k8s.custom.list_cluster_custom_object("metrics.k8s.io", "v1beta1", "pods")
    data = [Serializer.pod_usage(pod) for pod in data.get("items", [])]
    return Response(data)


@api_view(["GET"])
def top(request: Request):
    node_data = k8s.custom.list_cluster_custom_object(
        "metrics.k8s.io", "v1beta1", "nodes"
    )
    node_data = [Serializer.node_usage(node) for node in node_data.get("items", [])]

    pod_data = k8s.custom.list_cluster_custom_object(
        "metrics.k8s.io", "v1beta1", "pods"
    )
    pod_data = [Serializer.pod_usage(pod) for pod in pod_data.get("items", [])]

    return Response(dict(pod=pod_data, node=node_data))
