from kubernetes.client.models import *
from kubernetes.client.models import (
    V1DeploymentCondition,
    V1NamespaceCondition,
    V1Condition,
)


class Serializers:
    @staticmethod
    def pod(instance: V1Pod) -> dict:
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            pod_ip=instance.status.pod_ip,
            creation_timestamp=instance.metadata.creation_timestamp,
            status=Serializers.condition(instance.status.conditions),
        )

    @staticmethod
    def deployment(instance: V1Deployment) -> dict:
        return dict(
            name=instance.metadata.name,
            namespace=instance.metadata.namespace,
            labels=instance.metadata.labels,
            creation_timestamp=instance.metadata.creation_timestamp,
            available_replicas=instance.status.available_replicas,
            ready_replicas=instance.status.ready_replicas,
            replicas=instance.status.replicas,
        )

    @staticmethod
    def namespace(instance: V1Namespace) -> dict:
        return dict(
            name=instance.metadata.name,
            conditions=Serializers(instance.status.conditions),
        )

    @staticmethod
    def condition(data: list[V1Condition]) -> list[dict]:
        ret = []
        for cond in data:
            ret.append(
                dict(
                    type=cond.type,
                    message=cond.message,
                    reason=cond.reason,
                    status=cond.status,
                )
            )
        return ret
