import imp
from typing import Any

import yaml
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import create_resource, k8s
from kubernetes.client.models import *
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .common import GenericListView, GenericRetrieveUpdateDestroyView


class ListConfigMaps(GenericListView):
    def list_resource_for_all_namespaces(self):
        return k8s.core.list_config_map_for_all_namespaces()

    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_config_map(namespace=namespace)

    def serialize(self, resource):
        return Serializer.configmap(resource)


class RetrieveUpdateDestroyConfigMap(GenericRetrieveUpdateDestroyView):
    def protect_system_resource(self) -> bool:
        return False

    def get_resource(self, namespace: str, name: str):
        return k8s.get_configmap(namespace, name)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_namespaced_config_map(
            name=name, namespace=namespace, body=body
        )

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_config_map(name=name, namespace=namespace)
