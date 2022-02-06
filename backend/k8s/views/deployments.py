import requests
import yaml
from k8s.exceptions import *
from k8s.serializers import Serializer
from k8s.utils import create_resource, k8s
from kubernetes.client.models import *
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime
import pytz


class ListCreateDeployment(APIView):
    def get(self, request):
        """List deployments with an optional `namespace` parameter."""
        namespace = request.query_params.get("namespace")
        if namespace is None or namespace == "전체":
            res: V1DeploymentList = k8s.apps.list_deployment_for_all_namespaces(
                watch=False
            )
        else:
            res = k8s.apps.list_namespaced_deployment(namespace=namespace, watch=False)
        data = [Serializer.deployment(dep) for dep in res.items]
        return Response(data)

    def post(self, request):
        """Creates deployments (or other k8s objects) from a single yaml file.

        Raises:
            ParseError: Raised when no yaml file data is given.
            FailedToCreate: Raised when the names of the objects already exist.
        """
        create_resource(request)
        return Response(status=201)


class RetrieveUpdateDestroyDeployment(APIView):
    def get_deployment(self, deploy_name: str, deploy_namespace: str) -> V1Deployment:
        try:
            deployment: V1Deployment = k8s.apps.read_namespaced_deployment(
                name=deploy_name,
                namespace=deploy_namespace,
            )
        except Exception as e:
            raise ResourceNotFound(detail=str(e), resource_name="Deployment")
        else:
            return deployment

    def get(self, request: Request, deploy_name: str, deploy_namespace: str):
        """Retrieves the specified deployment."""
        deployment = self.get_deployment(
            deploy_name=deploy_name,
            deploy_namespace=deploy_namespace,
        )
        dict_object = k8s.api.sanitize_for_serialization(deployment)
        del dict_object["metadata"]["annotations"]
        del dict_object["metadata"]["managedFields"]
        del dict_object["status"]
        yaml_str = yaml.dump(dict_object)
        return Response(yaml_str)

    def patch(
        self, request: Request, deploy_name: str, deploy_namespace: str
    ) -> Response:
        """Updates the desired number of replicas for the specified deployment.

        Raises:
            ResourceNotFound: Raised when the specified deployment does not exist.
            K8sClientError: Raised when PATCH operation fails.
        """
        yaml_data = request.data.get("yaml")
        if yaml_data is None:
            raise ParseError(detail="yaml file not found.")
        try:
            updated_deployment = k8s.apps.patch_namespaced_deployment(
                name=deploy_name,
                namespace=deploy_namespace,
                body=yaml.safe_load(yaml_data),
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e))
        return Response(Serializer.deployment(updated_deployment))

    def put(self, request, deploy_name: str, deploy_namespace: str):
        """Restarts the specified deployment."""
        deployment = self.get_deployment(deploy_name, deploy_namespace)

        deployment.spec.template.metadata.annotations = {
            "kubectl.kubernetes.io/restartedAt": datetime.utcnow()
            .replace(tzinfo=pytz.UTC)
            .isoformat()
        }

        try:
            updated_deployment = k8s.apps.patch_namespaced_deployment(
                name=deploy_name, namespace=deploy_namespace, body=deployment
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e))
        return Response(Serializer.deployment(updated_deployment))

    def delete(self, request, deploy_name: str, deploy_namespace: str):
        """Deletes the specified deployment.

        Raises:
            ProtectedError: Raised when trying to delete essential resources.
            K8sClientError: Raised when DELETE operation fails.
        """
        if deploy_namespace.endswith("-system"):
            raise ProtectedError(message="System Deployment는 삭제할 수 없습니다.")

        try:
            k8s.apps.delete_namespaced_deployment(
                name=deploy_name,
                namespace=deploy_namespace,
                body=V1DeleteOptions(
                    propagation_policy="Foreground", grace_period_seconds=5
                ),
            )
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
