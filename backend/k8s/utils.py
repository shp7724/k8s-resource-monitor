from datetime import datetime

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

print('dummy')

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
