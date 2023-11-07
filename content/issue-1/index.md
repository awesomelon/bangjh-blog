---
emoji: ☀️
title: ArgoCD err_too_many_redirects
date: '2023-09-03 22:00:00'
author: Bangjh
tags: ArgoCD err_too_many_redirects debugging
categories: ISSUE
---

## 이슈

ArgoCD에 도메인을 연결하여 https로 접근하니 err_too_many_redirects 이슈가 발생함

<br >

## 원인

- ingress controller는 TLS를 자체적으로 종료하고 HTTP를 통해 백엔드 서비스와 통신
- argocd-server는 자체적으로 TLS를 종료하고 항상 HTTP 요청을 HTTPS로 리다이렉션

둘이 결합하면서 ArgoCD 서버는 HTTPS로 무한 리다이렉션이 발생

<br >

## 해결

argocd-server deployment시 `--insecure` 플래그 추가

```yaml
containers:
  - command:
      - argocd-server
      - --insecure
```

<br >

## 참고

- [GITHUB ISSUE](https://github.com/argoproj/argo-cd/issues/2953)
- [ArgoCD DOCS](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-2-multiple-ingress-objects-and-hosts)

---

```toc

```
