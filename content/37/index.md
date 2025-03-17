---
emoji: ☀️
title: image 높이 값 불러올 때 주의점
date: '2019-06-29 17:58:00'
author: j-ho
tags: javascript image height
categories: FRONTEND
---

프론트엔드 개발자라면 이미지를 불러와 높이 값에 따라 레이아웃을 변경해야 할 때가 있을 것입니다. 예를 들어, 다음과 같은 코드를 사용할 수 있습니다:

```javascript
// 이미지를 선택하여 가져옵니다
var img = document.querySelector('img'); // 예시 img

// 이미지를 변경한 다음
img.src = 'test.png';

// #wrapper의 높이를 변경된 img의 clientHeight 값으로 설정합니다.
document.querySelector('#wrapper').style.height = img.clientHeight + 'px';
```

하지만 결론적으로 위의 코드는 제대로 작동하지 않습니다. 왜 그럴까요?

## 문제의 원인: 이미지 로딩 타이밍

이 코드가 작동하지 않는 이유는 `test.png` 이미지가 로딩되기 전에 `clientHeight`를 구하려고 하기 때문입니다. 이미지가 로드되지 않은 상태에서는 `clientHeight` 값이 정확하지 않거나 0으로 반환될 수 있습니다. 따라서 이미지의 크기를 기반으로 레이아웃을 변경하는 경우, 이미지가 완전히 로드된 이후에 높이 값을 계산해야 합니다.

## 해결 방법: 이미지 로드 후 높이 값 설정

위 코드가 정상적으로 작동하도록 하려면, 이미지가 로드된 후에 높이 값을 설정해야 합니다. 이를 위해 `onload` 이벤트를 사용하여 이미지가 완전히 로드된 이후에 원하는 작업을 수행할 수 있도록 합니다:

```javascript
// 이미지를 선택하여 가져옵니다
var img = document.querySelector('img'); // 예시 img

// 이미지를 변경한 다음
img.src = 'test.png';

// 이미지가 로드된 후에
// #wrapper의 높이를 변경된 img의 clientHeight 값으로 설정합니다.
img.onload = function () {
  document.querySelector('#wrapper').style.height = img.clientHeight + 'px';
};
```

위 코드에서는 `img.onload` 콜백을 사용하여 이미지가 완전히 로드된 후에 `#wrapper`의 높이를 이미지의 높이에 맞춰 설정합니다. 이렇게 하면 이미지가 로드되지 않은 상태에서 잘못된 높이 값이 설정되는 것을 방지할 수 있습니다.

## 추가 고려 사항

- **이미지 캐싱 문제**: 브라우저가 이미지를 캐싱하고 있는 경우, `onload` 이벤트가 발생하지 않을 수 있습니다. 이 경우에는 `img.complete` 속성을 확인하여 이미지가 이미 로드된 상태인지 체크한 후 높이를 설정하는 방법도 고려할 수 있습니다:

  ```javascript
  var img = document.querySelector('img');
  img.src = 'test.png';

  if (img.complete) {
    // 이미지가 이미 로드된 경우
    document.querySelector('#wrapper').style.height = img.clientHeight + 'px';
  } else {
    img.onload = function () {
      document.querySelector('#wrapper').style.height = img.clientHeight + 'px';
    };
  }
  ```

- **반응형 디자인**: 이미지가 로드된 후에도 사용자가 브라우저 크기를 조절할 수 있기 때문에, `resize` 이벤트를 추가하여 레이아웃이 변경될 때마다 높이를 재설정하는 것도 좋은 방법입니다.

  ```javascript
  window.addEventListener('resize', function () {
    document.querySelector('#wrapper').style.height = img.clientHeight + 'px';
  });
  ```

## 결론

이미지의 높이나 크기를 기반으로 레이아웃을 변경할 때는 반드시 이미지가 로드된 이후에 해당 작업을 수행해야 합니다. 이미지가 로드되지 않은 상태에서 높이 값을 구하면 잘못된 값을 얻거나 원하는 레이아웃 변경이 이루어지지 않을 수 있습니다. 따라서 `onload` 이벤트를 활용해 이미지가 완전히 로드된 이후에 높이 값을 설정하는 것이 중요합니다.

이미지 로딩 타이밍을 정확히 관리함으로써 사용자에게 더 나은 레이아웃과 안정적인 사용자 경험을 제공할 수 있습니다.

```toc

```
