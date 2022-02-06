from django.contrib import admin
from django.urls import include, path


from .views import *
from .consumers import PodSSHConsumer

urlpatterns = [
    path("pods/", list_pods),
    path("nodes/top/", top_nodes),
    path("pods/top/", top_pods),
    path("namespaces/", ListCreateNamespace.as_view()),
    path("namespaces/<str:name>/", RetrieveUpdateDestroyNamespace.as_view()),
    path("deployments/", ListCreateDeployment.as_view()),
    path(
        "deployments/<str:deploy_namespace>/<str:deploy_name>/",
        RetrieveUpdateDestroyDeployment.as_view(),
    ),
    path("configmaps/", ListCreateConfigMaps.as_view()),
    path(
        "configmaps/<str:namespace>/<str:name>/",
        UpdateDestroyConfigMap.as_view(),
    ),
]

websocket_urlpatterns = [
    path(
        "ws/ssh/pod/<str:namespace>/<str:pod_name>/<str:container_name>/",
        PodSSHConsumer.as_asgi(),
    ),
]
