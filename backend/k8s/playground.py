from datetime import datetime

import requests
import yaml
from kubernetes import client, config
from kubernetes.client.models import *
from kubernetes.config.config_exception import ConfigException
from kubernetes.utils import create_from_yaml


class K8sClient:
    def __init__(self) -> None:
        config.load_config()
        self.core = client.CoreV1Api()
        self.custom = client.CustomObjectsApi()
        self.apps = client.AppsV1Api()
        self.api = client.ApiClient()


k8s = K8sClient()

if __name__ == "__main__":
    res = requests.get(
        "http://localhost:8000/api/deployments/default/nginx_deployment/"
    )
    with open("res.html", "w") as f:
        f.write(res.text)
    # deployment: V1Deployment = k8s.apps.read_namespaced_deployment(
    #     name="nginx-deployment",
    #     namespace="default",
    # )
    # print(deployment)
    # deployment.spec.template.spec.containers[0].image = "nginx:1.9.1"
    # deployment.spec.replicas = 1
    # a = k8s.apps.patch_namespaced_deployment(
    #     name=deployment.metadata.name,
    #     namespace=deployment.metadata.namespace,
    #     body=deployment,
    # )
    # print(a)
