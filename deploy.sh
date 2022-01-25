#!/bin/bash
cd devops
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl rollout restart deployment/django-k8s-resource-monitor-deployment -n backend-system
