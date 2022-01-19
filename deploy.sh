#!/bin/bash
cd k8s
microk8s kubectl apply -f deployment.yaml
microk8s kubectl apply -f configmap.yaml
microk8s kubectl rollout restart deployment/backend-deployment
