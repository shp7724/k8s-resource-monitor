from k8s.exceptions import *
from k8s.utils import create_resource
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["POST"])
def create_resource_view(request: Request):
    create_resource(request)
    return Response(status=201)
