from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response

from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s


@api_view(["GET"])
def list_pods(request: Request):
    namespace = request.query_params.get("namespace")
    if namespace is None or namespace == "전체":
        res = k8s.core.list_pod_for_all_namespaces(watch=False)
    else:
        res = k8s.core.list_namespaced_pod(namespace=namespace, watch=False)
    data = [Serializer.pod(pod) for pod in res.items]
    return Response(data)
