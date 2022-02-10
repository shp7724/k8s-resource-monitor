from typing import Any

import yaml
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s
from kubernetes.client.models import *
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .common import GenericListView, GenericRetrieveUpdateDestroyView


class ListService(GenericListView):
    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_service(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.core.list_service_for_all_namespaces()

    def serialize(self, resource):
        return Serializer.service(resource)


class RetrieveUpdateDestroyService(GenericRetrieveUpdateDestroyView):
    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_service(namespace, name)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_namespaced_service(namespace, name, body)

    def get_resource(self, namespace: str, name: str):
        return k8s.core.read_namespaced_service(namespace, name)
