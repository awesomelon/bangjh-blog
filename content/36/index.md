---
emoji: ☀️
title: IE에서 AJAX 요청 캐싱 문제 해결하기
date: '2019-08-09 17:58:00'
author: Bangjh
tags: javascript ajax cache IE
categories: FRONTEND
---

## 문제 정의

인터넷 익스플로러(IE)에서 `GET` 방식으로 AJAX 요청을 보낼 때, 요청이 캐싱되어 기대한 대로 작동하지 않는 문제가 발생할 수 있습니다. 특히, 서버에서 제공하는 최신 데이터를 반복적으로 받아와야 하는 경우, 캐싱으로 인해 불필요하게 오래된 데이터를 받게 되어 문제가 발생합니다.

이 문제는 IE가 브라우저 캐싱을 강하게 적용하기 때문에 생깁니다. 이러한 캐싱은 브라우저 성능을 높이기 위한 의도이지만, 최신 데이터를 필요로 하는 AJAX 요청에서는 오히려 문제를 일으킬 수 있습니다. 이 글에서는 이 문제를 해결하기 위한 방법을 소개합니다.

## jQuery를 이용한 해결 방법

jQuery에서는 `ajax` 메서드에서 `cache` 옵션을 통해 쉽게 이 문제를 해결할 수 있습니다. 예를 들어, 아래와 같이 `cache`를 `false`로 설정하면 됩니다.

```javascript
jQuery.ajax({ cache: false });
```

jQuery 공식 문서에 따르면, 이 옵션을 사용하면 `GET` 요청 시 URL에 타임스탬프를 추가하여 요청을 새롭게 만듭니다. 즉, 각 요청마다 고유한 URL을 가지게 하여 브라우저가 이전의 응답을 캐싱하지 못하게 합니다. 문서에는 다음과 같은 설명이 있습니다:

> `cache (default: true, false for dataType 'script' and 'jsonp') Type: Boolean If set to false, it will force requested pages not to be cached by the browser. Note: Setting cache to false will only work correctly with HEAD and GET requests. It works by appending "_={timestamp}" to the GET parameters. The parameter is not needed for other types of requests, except in IE8 when a POST is made to a URL that has already been requested by a GET.`

**즉, 타임스탬프를 쿼리스트링에 추가함으로써 각 요청이 고유하게 만들어지고, 이를 통해 캐싱 문제를 우회하게 됩니다.**

## 순수 JavaScript로 구현하기

jQuery 없이 순수 JavaScript로 이 문제를 해결하려면, 아래와 같은 방식으로 타임스탬프를 직접 추가해 AJAX 요청을 보낼 수 있습니다.

```javascript
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('GET', 'test.php?_=' + new Date().getTime());
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(null);
```

위 코드에서는 `new Date().getTime()`을 통해 현재 시간을 타임스탬프로 생성하고, 이를 쿼리스트링에 추가하여 각 요청이 고유하게 만들어집니다. 이를 통해 브라우저는 매번 새로운 요청으로 인식하고 캐싱된 데이터를 사용하지 않게 됩니다.

## 다른 접근 방법들

1. **HTTP 헤더 설정**

   - 서버 쪽에서 `Cache-Control: no-cache, no-store` 또는 `Pragma: no-cache`와 같은 HTTP 헤더를 설정하여 브라우저가 해당 응답을 캐싱하지 않도록 할 수 있습니다. 하지만 이 방법은 브라우저의 설정이나 네트워크 환경에 따라 항상 완벽하게 작동하지 않을 수 있습니다.

2. **POST 요청 사용**
   - `GET` 요청 대신 `POST` 요청을 사용하는 방법도 있지만, 데이터의 성격에 맞지 않는 경우가 많습니다. 예를 들어, 단순 조회 요청에 `POST`를 사용하는 것은 RESTful한 설계 원칙에 위배됩니다. `POST`는 리소스를 생성하거나 변경하는 작업에 적합하기 때문입니다.

## 결론

`GET` 방식의 AJAX 요청이 브라우저에 의해 캐싱되는 문제는 특히 IE와 같은 구형 브라우저에서 자주 발생합니다. 이 문제를 해결하기 위해 타임스탬프를 쿼리스트링에 추가하는 방법이 가장 일반적이고 간단한 해결책입니다. 서버 측의 헤더 설정도 도움이 될 수 있지만, 완전한 해결책이 되지 않을 수 있습니다.

따라서 **상황에 맞게 쿼리스트링을 이용한 캐시 회피 방법을 사용하는 것이 가장 효율적**입니다. 이 방법은 RESTful한 설계를 유지하면서도 클라이언트에서 원하는 데이터를 항상 최신 상태로 유지할 수 있게 해줍니다.

```toc

```
