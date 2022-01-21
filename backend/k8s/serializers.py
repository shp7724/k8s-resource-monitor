from kubernetes.client.models import *
from kubernetes.client.models import (
    V1DeploymentCondition,
    V1NamespaceCondition,
    V1Condition,
)


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
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            creation_timestamp=instance.metadata.creation_timestamp,
            desired_replicas=instance.spec.replicas,
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
            image=instance.image,
            image_pull_policy=instance.image_pull_policy,
            # ports=[port.to_dict() for port in instance.ports],
        )

    @staticmethod
    def containers(data: list[V1Container]) -> dict:
        return [Serializer.container(container) for container in data]

    @staticmethod
    def namespace(instance: V1Namespace) -> dict:
        return dict(
            name=instance.metadata.name,
            conditions=Serializer(instance.status.conditions),
        )

    @staticmethod
    def condition(instance: V1Container) -> dict:
        return dict(
            type=instance.type,
            message=instance.message,
            reason=instance.reason,
            status=instance.status,
        )

    @staticmethod
    def conditions(data: list[V1Condition]) -> list[dict]:
        return [Serializer.condition(instance) for instance in data]
