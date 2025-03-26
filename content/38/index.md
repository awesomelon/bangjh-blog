---
title: iOS 모바일에서 Click 이벤트 지연 문제 해결하기
date: '2020-02-07 12:58:00'
author: j-ho
tags: javascript ios click event
categories: FRONTEND
---

웹 개발을 하다 보면 대부분 `click` 이벤트를 자주 사용하게 됩니다. 예를 들어:

```javascript
target.addEventListener('click', function () {
  // ..
});
```

PC 환경에서는 이 코드로 전혀 문제가 없습니다. 하지만 iOS 모바일 기기에서 동일한 코드를 사용할 경우, 클릭에 대한 반응이 약간 느리다는 것을 느낄 수 있습니다. 무엇이 문제일까요?

## 문제의 원인: iOS의 Click 이벤트 지연

iOS에서는 사용자가 화면을 터치했을 때 해당 동작이 더블 탭(줌)이나 스와이프 제스처와 같은 다른 동작이 아닌지 확인하기 위해 약 300ms의 지연을 추가합니다. 이러한 지연은 제스처 및 스와이프가 올바르게 작동하도록 하기 위한 조치입니다. 이 때문에 클릭 이벤트가 느리게 반응하는 문제가 발생합니다.

## 해결 방법: Touch 이벤트 사용

iOS에서 `click` 이벤트의 지연을 해결하기 위해서는 `touchstart` 또는 `touchend` 이벤트를 사용하는 것이 좋습니다. 이 이벤트들은 `click` 이벤트와 달리 300ms의 지연 없이 즉시 실행됩니다. 아래는 그 예시입니다:

```javascript
target.addEventListener('touchstart', function () {
  // ...
});

// 또는

target.addEventListener('touchend', function () {
  // ...
});
```

이렇게 하면 사용자가 터치했을 때 즉각적인 반응을 얻을 수 있습니다.

## Click과 Touch 이벤트를 함께 사용해야 할 때

만약 `click` 이벤트와 `touch` 이벤트를 모두 처리해야 하는 경우, 다음과 같은 방식으로 코드를 작성할 수 있습니다. 이 방법은 브라우저 환경에 따라 적절한 이벤트를 선택하여 사용할 수 있게 해줍니다:

```javascript
var clickEvent = (function () {
  if ('ontouchstart' in document.documentElement) {
    return 'touchstart';
  } else {
    return 'click';
  }
})();

target.addEventListener(clickEvent, function () {
  // ...
});
```

위 코드는 `touchstart`가 지원되는 브라우저라면 `touchstart` 이벤트를 사용하고, 그렇지 않으면 `click` 이벤트를 사용하도록 합니다. 이를 통해 모바일과 데스크톱 환경 모두에서 효율적으로 반응하는 인터페이스를 구현할 수 있습니다.

## 추가 고려 사항

- **이벤트 중복 처리 방지**: `touch` 이벤트와 `click` 이벤트를 모두 추가하는 경우, 일부 환경에서는 두 이벤트가 모두 발생하여 동일한 동작이 두 번 실행되는 문제가 발생할 수 있습니다. 이를 방지하기 위해 `touchend` 이벤트가 발생했을 때 `click` 이벤트의 기본 동작을 막는 등의 추가 처리가 필요할 수 있습니다.
- **제스처 라이브러리 사용**: 여러 가지 제스처와 복잡한 터치 이벤트를 다뤄야 한다면, [Hammer.js](https://hammerjs.github.io/)와 같은 제스처 라이브러리를 사용하는 것도 좋은 방법입니다. 이러한 라이브러리는 다양한 터치 이벤트를 쉽게 처리할 수 있게 해줍니다.

## 결론

iOS 기기에서 `click` 이벤트의 지연 문제는 사용자 경험을 저하시킬 수 있는 중요한 요소입니다. 이를 해결하기 위해서는 `touchstart`나 `touchend`와 같은 즉각적인 터치 이벤트를 사용하거나, 환경에 따라 적절한 이벤트를 선택하는 방식으로 개발해야 합니다. 이를 통해 모바일 기기에서도 빠르고 반응성 높은 사용자 경험을 제공할 수 있습니다.

모바일 환경에서의 터치 인터랙션 최적화는 사용자 경험을 크게 향상시킬 수 있는 중요한 부분입니다. 이러한 방법들을 고려하여 더 나은 인터페이스를 구현해 보세요.

```toc

```
