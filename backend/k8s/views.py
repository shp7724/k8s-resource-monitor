from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import k8s
import json


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})


@api_view(["GET"])
def list_all_pods(request):
    response = k8s.list_pod_for_all_namespaces(watch=False, _preload_content=False)

    pods_list = json.loads(response.data)

    return Response(pods_list)
