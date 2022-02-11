from typing import Any

from k8s.serializers import Serializer
from k8s.utils import k8s

from .common import *


class IngressMixins(GenericMixins):
    def serialize(self, resource):
        return Serializer.ingress(resource)


class ListIngress(IngressMixins, GenericListView):
    def list_namespaced_resource(self, namespace: str):
        return k8s.network.list_namespaced_ingress(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.network.list_ingress_for_all_namespaces()


class RetrieveUpdateDestroyIngress(IngressMixins, GenericRetrieveUpdateDestroyView):
    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.network.patch_namespaced_ingress(name, namespace, body)

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.network.delete_namespaced_ingress(name, namespace)

    def get_resource(self, namespace: str, name: str):
        return k8s.network.read_namespaced_ingress(name, namespace)
