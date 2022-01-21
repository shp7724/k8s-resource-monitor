from django.contrib import admin
from django.urls import include, path

from .views import *

urlpatterns = [
    path("pods/", list_pods),
    path("namespaces/", list_namespaces),
    path("nodes/top/", top_nodes),
    path("pods/top/", top_pods),
    path("deployments/", ListCreateDeployment.as_view()),
    path(
        "deployments/<str:deploy_namespace>/<str:deploy_name>/",
        RetrieveUpdateDestroyDeployment.as_view(),
    ),
]
