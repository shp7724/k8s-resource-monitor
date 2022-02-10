from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s

from .common import GenericListView, GenericRetrieveUpdateDestroyView


class ListPod(GenericListView):
    def serialize(self, resource):
        return Serializer.pod(resource)

    def list_namespaced_resource(self, namespace: str):
        return k8s.core.list_namespaced_pod(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.core.list_pod_for_all_namespaces()


class DeletePod(GenericRetrieveUpdateDestroyView):
    def protect_system_resource(self) -> bool:
        return False

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_namespaced_pod(namespace=namespace, name=name)
