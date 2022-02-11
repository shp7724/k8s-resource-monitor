from typing import Any

from k8s.serializers import Serializer
from k8s.utils import k8s

from .common import *


class PVCMixins(GenericMixins):
    def serialize(self, resource):
        return Serializer.pvc(resource)


class ListPVC(PVCMixins, GenericListView):
    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_persistent_volume_claim(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.core.list_persistent_volume_claim_for_all_namespaces()


class RetrieveUpdateDestroyPVC(PVCMixins, GenericRetrieveUpdateDestroyView):
    def get_resource(self, namespace: str, name: str):
        return k8s.core.read_namespaced_persistent_volume_claim(name, namespace)

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_persistent_volume_claim(name, namespace)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_namespaced_persistent_volume_claim(name, namespace, body)
