#!/bin/bash
cd devops
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f django-deployment.yaml
kubectl apply -f react-deployment.yaml
kubectl rollout restart deployment/django-k8s-resource-monitor-deployment -n resource-monitor-system
kubectl rollout restart deployment/react-k8s-resource-monitor-deployment -n resource-monitor-system
