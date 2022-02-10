from datetime import datetime

import requests
import yaml
from kubernetes import client, config
from kubernetes.client.models import *
from kubernetes.config.config_exception import ConfigException
from kubernetes.stream import stream
from kubernetes.utils import create_from_yaml
from rest_framework.exceptions import ParseError
from rest_framework.request import Request
from rest_framework.response import Response

from .exceptions import *


class K8sClient:
    def __init__(self) -> None:
        config.load_config()
        self.core = client.CoreV1Api()
        self.custom = client.CustomObjectsApi()
        self.apps = client.AppsV1Api()
        self.network = client.NetworkingV1Api()
        self.api = client.ApiClient()

    def get_ssh_stream(self, namespace: str, pod_name: str, container_name: str = ""):
        exec_command = ["/bin/sh"]

        cont_stream = stream(
            self.core.connect_get_namespaced_pod_exec,
            name=pod_name,
            namespace=namespace,
            container=container_name,
            command=exec_command,
            stderr=True,
            stdin=True,
            stdout=True,
            tty=True,
            _preload_content=False,
        )
        return cont_stream

    def get_deployment(self, namespace: str, name: str) -> V1Deployment:
        try:
            res = self.apps.read_namespaced_deployment(name=name, namespace=namespace)
        except Exception as e:
            raise ResourceNotFound(detail=str(e), resource_name="Deployment")
        else:
            return res

    def get_configmap(self, namespace: str, name: str) -> V1ConfigMap:
        try:
            res = self.core.read_namespaced_config_map(name=name, namespace=namespace)
        except Exception as e:
            raise ResourceNotFound(detail=str(e), resource_name="ConfigMap")
        else:
            return res

    def get_ingress(self, namespace: str, name: str) -> V1Ingress:
        try:
            res = self.network.read_namespaced_ingress(name=name, namespace=namespace)
        except Exception as e:
            raise ResourceNotFound(detail=str(e), resource_name="Ingress")
        else:
            return res

    def get_service(self, namespace: str, name: str) -> V1Service:
        try:
            res = self.core.read_namespaced_service(name=name, namespace=namespace)
        except Exception as e:
            raise ResourceNotFound(detail=str(e), resource_name="Service")
        else:
            return res


k8s = K8sClient()

# -------------------
# Utility Functions
# -------------------


def create_resource(request: Request):
    yaml_data = request.data.get("yaml")
    if yaml_data is None:
        raise ParseError(detail="yaml file not found.")
    try:
        create_from_yaml(k8s_client=k8s.api, yaml_objects=yaml.safe_load_all(yaml_data))
    except Exception as e:
        raise FailedToCreate(detail=str(e))


def labels_to_string(labels: dict) -> str:
    label_strings = [f"{key}={value}" for key, value in labels.items()]
    return ", ".join(label_strings)
