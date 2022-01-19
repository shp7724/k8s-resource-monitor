#!/bin/bash
kubectl apply -f deployment.yaml
kubectl rollout restart deployment/backend-deployment