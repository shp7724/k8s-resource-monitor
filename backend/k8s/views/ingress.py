from typing import Any

import yaml
from .common import GenericListView, GenericRetrieveUpdateDestroyView
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import k8s
from kubernetes.client.models import *
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class ListIngress(GenericListView):
    def serialize(self, resource):
        return Serializer.ingress(resource)

    def list_namespaced_resource(self, namespace: str):
        return k8s.network.list_namespaced_ingress(namespace=namespace)

    def list_resource_for_all_namespaces(self):
        return k8s.network.list_ingress_for_all_namespaces()


class RetrieveUpdateDestroyIngress(GenericRetrieveUpdateDestroyView):
    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.network.patch_namespaced_ingress(namespace, name, body)

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.network.delete_namespaced_ingress(namespace, name)

    def get_resource(self, namespace: str, name: str):
        return k8s.get_ingress(namespace, name)
