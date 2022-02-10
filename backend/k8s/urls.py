from django.contrib import admin
from django.urls import include, path

from backend.k8s.views.ingress import ListIngress, RetrieveUpdateDestroyIngress


from .views import *
from .consumers import PodSSHConsumer

urlpatterns = [
    path("common/create/", create_resource_view),
    path("nodes/top/", top_nodes),
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
    path("ingress/", ListIngress.as_view()),
    path(
        "ingress/<str:namespace>/<str:name>/",
        RetrieveUpdateDestroyIngress.as_view(),
    ),
    # --------------------------------- Services --------------------------------- #
]

websocket_urlpatterns = [
    path(
        "ws/ssh/pod/<str:namespace>/<str:pod_name>/<str:container_name>/",
        PodSSHConsumer.as_asgi(),
    ),
]
