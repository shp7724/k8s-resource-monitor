from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path("hello_world/", hello_world),
    path("list_all_pods/", list_all_pods),
]
