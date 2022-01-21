from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path("list_pods/", list_pods),
    path("list_namespaces/", list_namespaces),
    path("list_deployments/", list_deployments),
    path("top/nodes/", top_nodes),
    path("top/pods/", top_pods),
]
