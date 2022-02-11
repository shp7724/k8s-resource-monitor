from typing import Any

from k8s.serializers import Serializer
from k8s.utils import k8s

from .common import *


class ConfigMapMixins(GenericMixins):
    def serialize(self, resource):
        return Serializer.configmap(resource)


class ListConfigMaps(ConfigMapMixins, GenericListView):
    def list_resource_for_all_namespaces(self):
        return k8s.core.list_config_map_for_all_namespaces()

    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_config_map(namespace=namespace)


class RetrieveUpdateDestroyConfigMap(ConfigMapMixins, GenericRetrieveUpdateDestroyView):
    def protect_system_resource(self) -> bool:
        return False

    def get_resource(self, namespace: str, name: str):
        return k8s.core.read_namespaced_config_map(name, namespace)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_namespaced_config_map(
            name=name, namespace=namespace, body=body
        )

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_config_map(name=name, namespace=namespace)
