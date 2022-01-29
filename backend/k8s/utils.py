from datetime import datetime

import requests
from kubernetes import client, config
from kubernetes.config.config_exception import ConfigException
from rest_framework.response import Response


class K8sClient:
    def __init__(self) -> None:
        config.load_config()
        self.core = client.CoreV1Api()
        self.custom = client.CustomObjectsApi()
        self.apps = client.AppsV1Api()
        self.api = client.ApiClient()


k8s = K8sClient()

# -------------------
# Utility Functions
# -------------------


def labels_to_string(labels: dict) -> str:
    label_strings = [f"{key}={value}" for key, value in labels.items()]
    return ", ".join(label_strings)
