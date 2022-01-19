#!/bin/bash
cd k8s
kubectl apply -f deployment.yaml
kubectl apply -f configmap.yaml
kubectl rollout restart deployment/backend-deployment