#!/bin/bash
docker build . -t shp7724/django-k8s-resource-monitor:latest
docker push shp7724/django-k8s-resource-monitor:latest