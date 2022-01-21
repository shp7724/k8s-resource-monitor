from rest_framework.exceptions import APIException


class K8sClientError(APIException):
    status_code = 503
    default_detail = "An error occurred while executing kubernetes client."
    message = "쿠버네티스 클라이언트와 관련된 알 수 없는 문제가 발생했습니다."
    default_code = "kubernetes_error"


class FailedToCreate(K8sClientError):
    message = "Deployment 생성 중 오류가 발생했습니다. 같은 이름의 Deployment가 이미 존재하지 않는지 확인해주세요."
