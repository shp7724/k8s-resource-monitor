from kubernetes import client
from datetime import datetime


class K8sClient:
    def __init__(self) -> None:
        config = client.Configuration()
        config.api_key["authorization"] = open(
            "/var/run/secrets/kubernetes.io/serviceaccount/token"
        ).read()
        config.api_key_prefix["authorization"] = "Bearer"
        config.host = "https://kubernetes.default"
        config.ssl_ca_cert = "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
        config.verify_ssl = True
        self.config = config
        api_client = client.ApiClient(config)

        self.core: client.CoreV1Api = client.CoreV1Api(api_client=api_client)
        self.custom: client.CustomObjectsApi = client.CustomObjectsApi(
            api_client=api_client
        )


k8s = K8sClient()
