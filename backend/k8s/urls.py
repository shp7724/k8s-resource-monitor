from django.contrib import admin
from django.urls import include, path

from .views import *

urlpatterns = [
    path("list_pods/", list_pods),
    path("list_namespaces/", list_namespaces),
    path("deployments/", ListCreateDeployment.as_view()),
    path("top/nodes/", top_nodes),
    path("top/pods/", top_pods),
]
