from kubernetes.client.models import *
from kubernetes.client.models import (
    V1Condition,
    V1DeploymentCondition,
    V1NamespaceCondition,
)
from kubernetes.utils import parse_quantity

from .utils import k8s, labels_to_string


class Serializer:
    @staticmethod
    def pod(instance: V1Pod) -> dict:
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            pod_ip=instance.status.pod_ip,
            creation_timestamp=instance.metadata.creation_timestamp,
            status=Serializer.conditions(instance.status.conditions),
        )

    @staticmethod
    def deployment(instance: V1Deployment) -> dict:
        pods_managed_by_this_deployment = k8s.core.list_namespaced_pod(
            namespace=instance.metadata.namespace,
            label_selector=labels_to_string(instance.spec.selector.match_labels),
            watch=False,
        )
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            creation_timestamp=instance.metadata.creation_timestamp,
            desired_replicas=instance.spec.replicas,
            pods=[Serializer.pod(pod) for pod in pods_managed_by_this_deployment.items],
            status=dict(
                available_replicas=instance.status.available_replicas,
                ready_replicas=instance.status.ready_replicas,
                replicas=instance.status.replicas,
            ),
            containers=Serializer.containers(instance.spec.template.spec.containers),
        )

    @staticmethod
    def container(instance: V1Container) -> dict:
        return dict(
            name=instance.name,
            image=instance.image,
            image_pull_policy=instance.image_pull_policy,
        )

    @staticmethod
    def containers(data: list[V1Container]) -> dict:
        return [Serializer.container(container) for container in data]

    @staticmethod
    def namespace(instance: V1Namespace) -> dict:
        return dict(
            name=instance.metadata.name,
        )

    @staticmethod
    def configmap(instance: V1ConfigMap) -> dict:
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            data=instance.data,
        )

    @staticmethod
    def condition(instance: V1Container) -> dict:
        return dict(
            type=instance.type,
            message=instance.message,
            reason=instance.reason,
            status=instance.status == "True",
        )

    @staticmethod
    def conditions(data: list[V1Condition]) -> list[dict]:
        return [Serializer.condition(instance) for instance in data]

    @staticmethod
    def pod_usage(data: dict) -> dict:
        return dict(
            name=data.get("metadata", {}).get("name"),
            timestamp=data.get("timestamp"),
            window=int(data.get("window").strip("s")),
            usage=[
                dict(
                    name=container.get("name"),
                    cpu=parse_quantity(container["usage"]["cpu"]),
                    memory=parse_quantity(container["usage"]["memory"]),
                )
                for container in data.get("containers", [])
            ],
        )

    @staticmethod
    def node_usage(data: dict) -> dict:
        return dict(
            name=data.get("metadata", {}).get("name"),
            timestamp=data.get("timestamp"),
            window=int(data.get("window").strip("s")),
            usage=dict(
                name=data.get("metadata", {}).get("name"),
                cpu=parse_quantity(data["usage"]["cpu"]),
                memory=parse_quantity(data["usage"]["memory"]),
            ),
        )
