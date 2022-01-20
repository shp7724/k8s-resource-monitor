from kubernetes import client
from datetime import datetime

config = client.Configuration()


config.api_key["authorization"] = open(
    "/var/run/secrets/kubernetes.io/serviceaccount/token"
).read()
config.api_key_prefix["authorization"] = "Bearer"
config.host = "https://kubernetes.default"
config.ssl_ca_cert = "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
config.verify_ssl = True
k8s = client.CoreV1Api(client.ApiClient(config))

