from rest_framework.views import exception_handler
from k8s.exceptions import K8sClientError


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        response.data["status_code"] = response.status_code
        response.data["success"] = False
    if isinstance(exc, K8sClientError):
        response.data["message"] = exc.message

    return response
