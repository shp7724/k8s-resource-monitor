from kubernetes import client, config
from datetime import datetime


class K8sClient:
    def __init__(self) -> None:
        config.load_incluster_config()
        self.core = client.CoreV1Api()
        self.custom = client.CustomObjectsApi()
        self.apps = client.AppsV1Api()


k8s = K8sClient()
