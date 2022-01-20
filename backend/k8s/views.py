from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import k8s


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})


@api_view(["GET"])
def list_pods(request):
    return Response(k8s.list_pod_for_all_namespaces())
