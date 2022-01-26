#!/bin/bash
cd backend
docker build . -t shp7724/django-k8s-resource-monitor:latest
docker push shp7724/django-k8s-resource-monitor:latest
cd ../frontend
docker build . -t shp7724/react-k8s-resource-monitor:latest
docker push shp7724/react-k8s-resource-monitor:latest