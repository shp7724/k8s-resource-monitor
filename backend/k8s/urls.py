from django.contrib import admin
from django.urls import include, path


from .views import *
from .consumers import PodSSHConsumer

urlpatterns = [
    path("common/create/", create_resource_view),
    path("top/", top),
    path("nodes/", ListNode.as_view()),
    # ----------------------------------- Pods ----------------------------------- #
    path("pods/", ListPod.as_view()),
    path("pods/<str:namespace>/<str:name>/", DeletePod.as_view()),
    path("pods/top/", top_pods),
    # -------------------------------- Namespaces -------------------------------- #
    path("namespaces/", ListCreateNamespace.as_view()),
    path("namespaces/<str:name>/", RetrieveUpdateDestroyNamespace.as_view()),
    # -------------------------------- Deployments ------------------------------- #
    path("deployments/", ListDeployment.as_view()),
    path(
        "deployments/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyDeployment.as_view(),
    ),
    # -------------------------------- ConfigMaps -------------------------------- #
    path("configmaps/", ListConfigMaps.as_view()),
    path(
        "configmaps/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyConfigMap.as_view(),
    ),
    # ---------------------------------- Ingress --------------------------------- #
    path("ingresses/", ListIngress.as_view()),
    path(
        "ingresses/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyIngress.as_view(),
    ),
    # --------------------------------- Services --------------------------------- #
    path("services/", ListService.as_view()),
    path(
        "services/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyService.as_view(),
    ),
    # -------------------------- PersistentVolumeClaims -------------------------- #
    path("pvcs/", ListPVC.as_view()),
    path(
        "pvcs/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyPVC.as_view(),
    ),
    # ----------------------------- PersistentVolumes ---------------------------- #
    path("pvs/", ListPV.as_view()),
    path(
        "pvs/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyPV.as_view(),
    ),
]

websocket_urlpatterns = [
    path(
        "ws/ssh/pod/<str:namespace>/<str:pod_name>/<str:container_name>/",
        PodSSHConsumer.as_asgi(),
    ),
]
