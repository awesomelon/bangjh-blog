---
emoji: ☀️
title: $(this).index()를 javascript로 만들기
date: '2018-10-01 17:58:00'
author: Bangjh
tags: Javascript IE ajax cache
categories: FRONTEND
---

## 문제

IE에서의 ajax 요청이 캐싱되는 문제
정확히는 GET방식으로 요청할 때 캐싱되는 문제이다.

jQuery에서는 아래의 방식으로 이 문제를 해결한다.

```javascript
jQuery.ajax({ cache: false });
```
[jQuery공식 홈페이지](https://api.jquery.com/jquery.ajax/)를 가보니 이렇게 적혀있다.
`cache (default: true, false for dataType 'script' and 'jsonp') Type: Boolean If set to false, it will force requested pages not to be cached by the browser. Note: Setting cache to false will only work correctly with HEAD and GET requests. It works by appending "_={timestamp}" to the GET parameters. The parameter is not needed for other types of requests, except in IE8 when a POST is made to a URL that has already been requested by a GET.`

**It works by appending "_={timestamp}" to the GET parameters.**

쿼리스트링으로 url에 timestamp를 붙여 요청을 해 이 문제를 해결한다.


이것을 javascript로 변경하면 아래 방식이 될 것이다.

javascript로 하면 아래 방식이다.

```javascript
var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('GET','test.php?_=' + new Date().getTime());
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(null);
```

## 결론

GET방식만 캐시된다면 POST방식을 그냥 쓰면 되지 않을까 생각했지만 그건 아닌 것 같다. 전혀 RESTful하지 못하다.

그렇다면 쿼리스트링을 상황에 맞게 적용하는 것이 제일 나은 방법이라 생각한다.

```toc

```
