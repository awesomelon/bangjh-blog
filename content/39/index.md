---
emoji: ☀️
title: IOS safari touch이벤트시 window.open 실행 안 됨
date: '2020-03-06 09:58:00'
author: Bangjh
tags: javascript ios clickEvent touchEvent
categories: FRONTEND
---

## 현상

IOS safari에서 `touch` 이벤트 내에서 `window.open`을 사용하여 팝업 창을 열 수 없습니다.

## 이유

iOS 9.0부터 `touch` 이벤트 내에서 `window.open`을 사용할 수 없게 된 이유는, 보안 및 사용자 경험 향상을 위한 조치입니다.

iOS 9.0 이전 버전에서는 `touch` 이벤트 내에서 `window.open`을 사용하여 팝업 창을 열 수 있었지만, 이 기능은 악성 스크립트가 사용자 동의 없이 팝업 창을 열 수 있는 보안 취약점을 유발할 수 있었습니다.

iOS 9.0부터 Apple은 이 문제를 해결하기 위해 `touch` 이벤트 내에서 `window.open`을 사용할 수 없게 제한하였습니다. 대신, 개발자들은 `click` 이벤트를 사용하여 팝업 창을 열 수 있습니다. 이 변경은 사용자 경험을 향상시키고 보안을 강화하기 위한 조치입니다.

<br />

예를 들어, 이전에는 다음과 같은 코드를 사용하여 `touch` 이벤트 내에서 팝업 창을 열 수 있었지만:
```javascript
document.addEventListener('touchstart', function(event) {
  window.open('https://example.com', '_blank');
});
```

<br />

이제는 다음과 같은 코드를 사용하여 `click` 이벤트를 사용하여 팝업 창을 열 수 있습니다:
```javascript
document.addEventListener('click', function(event) {
  window.open('https://example.com', '_blank');
});
```

## 결론
이 변경은 iOS 9.0부터 적용되었으며, 이후 버전에서도 유지되고 있습니다. 따라서, 개발자들은 이 변경을 고려하여 코드를 수정해야 합니다.



```toc

```
