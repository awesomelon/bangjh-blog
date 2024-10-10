---
emoji: ☀️
title: iOS Safari에서 터치 이벤트 내 팝업 창 제한 문제 해결하기
date: '2020-03-06 09:58:00'
author: Bangjh
tags: javascript ios clickEvent touchEvent open
categories: FRONTEND
---

모바일 웹 개발을 하다 보면 iOS Safari에서 `touch` 이벤트 내에서 `window.open`을 호출하여 팝업 창을 여는 것이 작동하지 않는 현상을 경험할 수 있습니다. 이는 iOS 9.0 이후 보안 및 사용자 경험을 고려한 변화 때문입니다. 이번 글에서는 이 문제의 원인과 해결 방법에 대해 자세히 알아보겠습니다.

## 문제 현상

iOS Safari에서 `touch` 이벤트 내에서 `window.open`을 사용해 팝업 창을 열 수 없습니다. 이로 인해 터치 기반 인터랙션에서 팝업을 여는 기능이 제한됩니다.

## 원인

iOS 9.0부터 `touch` 이벤트 내에서 `window.open`을 사용할 수 없게 된 이유는 보안 및 사용자 경험 향상을 위한 조치입니다.

iOS 9.0 이전 버전에서는 `touch` 이벤트 내에서 `window.open`을 통해 팝업 창을 여는 것이 가능했습니다. 그러나 이 기능은 악성 스크립트가 사용자 동의 없이 팝업 창을 열 수 있는 보안 취약점을 유발할 수 있었습니다. 이러한 위험을 줄이기 위해 Apple은 iOS 9.0부터 `touch` 이벤트 내에서 `window.open` 사용을 제한하였습니다.

대신, Apple은 개발자들에게 `click` 이벤트를 사용하여 팝업 창을 열 것을 권장합니다. 이 변경은 사용자의 의도를 명확히 반영하여 팝업이 열리도록 하고, 사용자 경험을 보호하는 동시에 보안을 강화하기 위한 조치입니다.

## 해결 방법

이전에는 다음과 같은 코드를 통해 `touch` 이벤트 내에서 팝업 창을 열 수 있었습니다:

```javascript
document.addEventListener('touchstart', function (event) {
  window.open('https://example.com', '_blank');
});
```

그러나 현재는 이 방식으로는 팝업을 열 수 없으므로, `click` 이벤트를 사용하는 것으로 변경해야 합니다. 이를 통해 사용자의 명시적인 클릭 동작에 의해서만 팝업 창이 열리도록 해야 합니다:

```javascript
document.addEventListener('click', function (event) {
  window.open('https://example.com', '_blank');
});
```

이 방법은 사용자가 의도한 클릭이 발생할 때에만 팝업 창을 열 수 있도록 보장하여, 사용자 경험을 보호하고 불필요한 보안 문제를 방지합니다.

## 추가 고려 사항

1. **이벤트 핸들링 최적화**: 터치 기반의 모바일 인터페이스에서는 `click` 이벤트 사용이 직관적이지 않을 수 있으므로, 이를 보완하기 위해 `touchend` 이벤트와 `click` 이벤트를 함께 사용하는 방법도 고려할 수 있습니다. 다만, 이 경우에도 팝업이 제대로 열리는지 다양한 iOS 버전에서 테스트해야 합니다.

   ```javascript
   document.addEventListener('touchend', function (event) {
     window.open('https://example.com', '_blank');
   });

   document.addEventListener('click', function (event) {
     window.open('https://example.com', '_blank');
   });
   ```

2. **팝업 대체 방법**: 팝업 창 대신 모달을 사용하여 사용자에게 추가 정보를 제공하는 방식도 좋은 대안이 될 수 있습니다. 팝업은 브라우저 설정에 따라 차단될 수 있지만, 모달은 페이지 내에서 표시되기 때문에 차단되지 않습니다.

## 결론

iOS 9.0부터 `touch` 이벤트 내에서 `window.open`을 사용하는 것이 제한되었으며, 이후 버전에서도 이 정책이 유지되고 있습니다. 따라서 개발자들은 이를 고려하여 코드를 수정해야 하며, 터치 이벤트가 아닌 클릭 이벤트를 사용하거나 팝업 대신 모달을 사용하는 등의 대안을 고민해야 합니다. 이러한 변경을 통해 사용자 경험을 개선하고 보안을 강화할 수 있습니다.

iOS 환경에서의 터치 기반 인터랙션을 고려한 개발은 사용자 경험을 높이는 중요한 요소입니다. 따라서 위와 같은 제약 사항을 이해하고, 최적의 대안을 적용하는 것이 중요합니다.

```toc

```
