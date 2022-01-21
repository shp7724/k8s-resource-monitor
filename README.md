# K8s 리소스 조회 서버

## APIs

변경이 잦은 API라서 접속이 어려울 수 있습니다.

- [/api/list_pods](http://182.225.15.97:31234/api/list_pods/)
  - `namespace: str`
- [/api/list_namespaces](http://182.225.15.97:31234/api/list_namespaces/)
- [/api/list_deployments](http://182.225.15.97:31234/api/list_deployments/)
  - `namespace: str`
- [/api/top/nodes](http://182.225.15.97:31234/api/top/nodes/)
- [/api/top/pods](http://182.225.15.97:31234/api/top/pods/)
  - `namespace: str`
