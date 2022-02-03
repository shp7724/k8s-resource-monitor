from datetime import datetime

import requests
from kubernetes import client, config
from kubernetes.config.config_exception import ConfigException
from rest_framework.response import Response
from kubernetes.stream import stream


class K8sClient:
    def __init__(self) -> None:
        config.load_config()
        self.core = client.CoreV1Api()
        self.custom = client.CustomObjectsApi()
        self.apps = client.AppsV1Api()
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


def labels_to_string(labels: dict) -> str:
    label_strings = [f"{key}={value}" for key, value in labels.items()]
    return ", ".join(label_strings)
