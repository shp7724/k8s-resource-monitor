# K8s 리소스 조회 서버

[![Build & Deploy to K8S](https://github.com/shp7724/k8s-resource-monitor/actions/workflows/deploy.yaml/badge.svg?branch=main)](https://github.com/shp7724/k8s-resource-monitor/actions/workflows/deploy.yaml)

```
nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
```

```
sudo certbot certonly --manual -d '*.resource-monitor.findy.co.kr'

sudo kubectl create secret tls resource-monitor-findy-tls --cert=/private/etc/letsencrypt/live/resource-monitor.findy.co.kr/fullchain.pem --key=/private/etc/letsencrypt/live/resource-monitor.findy.co.kr/privkey.pem -n resource-monitor-system
```
