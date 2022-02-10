from typing import Any

from k8s.serializers import Serializer
from k8s.utils import k8s
from rest_framework.response import Response

from .common import GenericListView, GenericRetrieveUpdateDestroyView


class ListPV(GenericListView):
    def get(self, request):
        res = k8s.core.list_persistent_volume()
        data = [self.serialize(resource) for resource in res.items]
        return Response(data)

    def serialize(self, resource):
        return Serializer.pv(resource)


class RetrieveUpdateDestroyPV(GenericRetrieveUpdateDestroyView):
    def get_resource(self, namespace: str, name: str):
        return k8s.core.read_persistent_volume(name)

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.core.delete_persistent_volume(name)

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.core.patch_persistent_volume(name, body)
