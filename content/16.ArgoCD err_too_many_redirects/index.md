---
emoji: ☀️
title: ArgoCD err_too_many_redirects
date: '2023-07-08 22:00:00'
author: Bangjh
tags: ArgoCD err_too_many_redirects debugging
categories: ISSUE
---

> 회사에서 ArgoCD 서버를 세팅하는 과정에서 생긴 이슈와 그것을 해결한 방법을 공유하고자 합니다.

<br >

## 이슈

ArgoCD 서버를 띄운 후 https를 연결하여 브라우저에서 https로 접속하려고 보니 `err_too_many_redirects` 이슈가 발생하였습니다.

<br >

## 원인

원인을 파악하니 아래와 같은 이슈가 있었습니다.

- `ingress controller`는 TLS를 자체적으로 종료하고 HTTP를 통해 백엔드 서비스와 통신
- `argocd-server`는 자체적으로 TLS를 종료하고 항상 HTTP 요청을 HTTPS로 리다이렉션

둘이 결합하면서 ArgoCD 서버는 HTTPS로 무한 리다이렉션이 발생하는 것이였습니다.

<br >

## 해결

argocd-server deployment시 `--insecure` 플래그 추가하는 것으로 간단하게 해결

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
