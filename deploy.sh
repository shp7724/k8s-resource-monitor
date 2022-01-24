#!/bin/bash
cd k8s
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl rollout restart deployment/django-k8s-resource-monitor-deployment
