from datetime import datetime
from typing import Any

import pytz
from k8s.exceptions import FailedToPatch
from k8s.serializers import Serializer
from k8s.utils import k8s
from kubernetes.client.models import *
from rest_framework.response import Response

from .common import *


class DeploymentMixins(GenericMixins):
    def serialize(self, resource):
        return Serializer.deployment(resource)


class ListDeployment(DeploymentMixins, GenericListView):
    def list_resource_for_all_namespaces(self):
        return k8s.apps.list_deployment_for_all_namespaces()

    def list_namespaced_resource(self, namespace: str):
        return k8s.apps.list_namespaced_deployment(namespace=namespace)


class RetrieveUpdateDestroyDeployment(
    DeploymentMixins, GenericRetrieveUpdateDestroyView
):
    def protect_system_resource(self) -> bool:
        return False

    def get_resource(self, namespace: str, name: str):
        return k8s.apps.read_namespaced_deployment(name, namespace)

    def sanitize(self, dict_object: dict):
        dict_object = super().sanitize(dict_object)
        del dict_object["status"]
        return dict_object

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        return k8s.apps.patch_namespaced_deployment(
            name=name, namespace=namespace, body=body
        )

    def delete_namespaced_resource(self, namespace: str, name: str):
        return k8s.apps.delete_namespaced_deployment(
            name=name,
            namespace=namespace,
            body=V1DeleteOptions(
                propagation_policy="Foreground", grace_period_seconds=5
            ),
        )

    def put(self, request, name: str, namespace: str):
        """Restarts the specified deployment."""
        if not self.request.user.is_active:
            raise PermissionDenied(detail="리소스를 수정하려면 관리자 권한이 필요합니다.")

        deployment = self.get_resource(namespace, name)

        deployment.spec.template.metadata.annotations = {
            "kubectl.kubernetes.io/restartedAt": datetime.utcnow()
            .replace(tzinfo=pytz.UTC)
            .isoformat()
        }

        try:
            updated_deployment = self.patch_namespaced_resource(
                namespace, name, deployment
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e), message="재시작 요청이 실패했습니다.")
        return Response(Serializer.deployment(updated_deployment))
