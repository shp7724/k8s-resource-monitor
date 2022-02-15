from typing import Any

from k8s.serializers import Serializer
from k8s.utils import k8s

from .common import *


class ServiceMixins(GenericMixins):
    def serialize(self, resource):
        return Serializer.service(resource)


class ListService(ServiceMixins, GenericListView):
    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_service(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.core.list_service_for_all_namespaces()


class RetrieveUpdateDestroyService(ServiceMixins, GenericRetrieveUpdateDestroyView):
    def protect_system_resource(self) -> bool:
        return False

    def get_resource(self, namespace: str, name: str):
        return k8s.core.read_namespaced_service(name, namespace)

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_service(name, namespace)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_namespaced_service(name, namespace, body)
