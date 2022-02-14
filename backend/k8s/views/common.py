from typing import Any

import yaml
from k8s.exceptions import *
from k8s.utils import create_resource, k8s
from rest_framework.decorators import api_view
from rest_framework.exceptions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


@api_view(["POST"])
def create_resource_view(request: Request):
    if not request.user.is_active:
        raise PermissionDenied(detail="리소스를 생성하려면 관리자 권한이 필요합니다.")
    create_resource(request)
    return Response(status=201)


# ---------------------------------------------------------------------------- #
#                             K8S Generic APIViews                             #
# ---------------------------------------------------------------------------- #


class GenericMixins:
    def serialize(self, resource):
        raise NotImplementedError()


class GenericListView(GenericMixins, APIView):
    def list_resource_for_all_namespaces(self):
        raise NotImplementedError()

    def list_namespaced_resource(self, namespace: str):
        raise NotImplementedError()

    def get(self, request):
        namespace = request.query_params.get("namespace")
        if namespace is None:
            res = self.list_resource_for_all_namespaces()
        else:
            res = self.list_namespaced_resource(namespace)

        data = [self.serialize(resource) for resource in res.items]
        return Response(data)


class GenericRetrieveUpdateDestroyView(GenericMixins, APIView):
    def get_resource(self, namespace: str, name: str):
        raise NotImplementedError()

    def patch_namespaced_resource(self, namespace: str, name: str, body: Any):
        raise NotImplementedError()

    def delete_namespaced_resource(self, namespace: str, name: str):
        raise NotImplementedError()

    def sanitize(self, dict_object: dict):
        del dict_object["metadata"]["annotations"]
        del dict_object["metadata"]["managedFields"]
        return dict_object

    def protect_system_resource(self) -> bool:
        return True

    # ------------------------------- HTTP METHODS ------------------------------- #

    def get(self, request: Request, namespace: str, name: str):
        try:
            resource = self.get_resource(namespace, name)
        except Exception as e:
            raise ResourceNotFound(
                detail=str(e),
                resource_name=self.__class__.__name__.replace(
                    "RetrieveUpdateDestroy", ""
                ),
            )
        dict_object = k8s.api.sanitize_for_serialization(resource)
        dict_object = self.sanitize(dict_object)
        yaml_str = yaml.dump(dict_object)
        return Response(yaml_str)

    def patch(self, request, name, namespace):
        if not self.request.user.is_active:
            raise PermissionDenied(detail="리소스를 수정하려면 관리자 권한이 필요합니다.")

        yaml_data = request.data.get("yaml")
        if yaml_data is None:
            raise ParseError(detail="yaml file not found.")
        try:
            updated = self.patch_namespaced_resource(
                name=name,
                namespace=namespace,
                body=yaml.safe_load(yaml_data),
            )
        except Exception as e:
            raise FailedToPatch(detail=str(e))
        return Response(self.serialize(updated))

    def delete(self, request, namespace, name):
        if not self.request.user.is_active:
            raise PermissionDenied(detail="리소스를 삭제하려면 관리자 권한이 필요합니다.")
        if self.protect_system_resource() and namespace.endswith("-system"):
            raise ProtectedError()
        try:
            self.delete_namespaced_resource(namespace=namespace, name=name)
        except Exception as e:
            raise FailedToDelete(detail=str(e))
        return Response(status=204)
