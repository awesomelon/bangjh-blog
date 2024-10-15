---
emoji: ☀️
title: 이미지에 CSS translate 사용 시 주의사항
date: '2018-05-25 09:58:00'
author: Bangjh
tags: img css translate
categories: FRONTEND
---

프론트엔드 개발을 하다 보면 `img` 태그에 CSS `translate`를 적용할 때 이미지가 흐릿해지는 현상을 경험할 수 있습니다. 이 문제는 이미지의 가로 또는 세로 크기와 관련이 있으며, 이에 대한 간단한 해결 방법을 제공하고자 합니다.

## 이미지 흐릿해짐 방지하기

`img` 태그에 CSS `translate`를 적용할 때 이미지의 가로 또는 세로 크기가 홀수인 경우, 이미지가 흐릿해질 수 있습니다. 예를 들어, `translateX`를 적용할 때 이미지의 가로 크기가 홀수이면 이미지가 정확하게 픽셀 단위에 맞춰지지 않아 흐릿하게 보일 수 있습니다. 비슷하게, `translateY`를 적용할 때 세로 크기가 홀수인 경우에도 같은 현상이 발생합니다.

### 해결 방법

1. **짝수 크기 유지**: `translateX`를 사용하는 경우, 이미지의 가로 크기는 짝수여야 하고, `translateY`를 사용하는 경우에는 세로 크기를 짝수로 유지해야 합니다. 이렇게 하면 이미지가 픽셀 단위에 맞춰져 흐릿해지는 현상을 방지할 수 있습니다.

2. **이미지를 배경으로 사용**: 이 문제를 간단하게 해결하려면 이미지를 `img` 태그 대신 CSS의 `background` 속성을 사용해 배경으로 설정하는 방법이 있습니다. 배경 이미지로 사용할 경우, 브라우저는 이미지를 픽셀 단위에 맞춰 렌더링하여 흐릿함을 방지합니다. 예를 들어:

   ```css
   .image-container {
     width: 200px;
     height: 200px;
     background: url('test.png') no-repeat center center;
     background-size: cover;
   }
   ```

   이 방법을 사용하면 `translate`를 적용해도 이미지가 흐릿해지지 않고 선명하게 표시됩니다.

## 추가 고려 사항

- **하위 픽셀 문제**: 이미지가 흐릿해지는 이유는 브라우저가 이미지를 하위 픽셀 단위로 렌더링하면서 발생하는 문제와 관련이 있습니다. `translate`가 하위 픽셀(예: `0.5px`)로 이동하게 되면, 브라우저는 반올림을 하여 이미지를 렌더링하고, 이로 인해 흐릿해질 수 있습니다. 이를 방지하려면 `translate` 값을 정수로 유지하거나, `transform: translate3d(x, y, 0);`와 같이 3D 변환을 사용해 GPU 가속을 유도하는 것도 도움이 될 수 있습니다.

- **이미지의 렌더링 품질**: CSS 속성 중 `image-rendering`을 사용하여 이미지의 렌더링 품질을 조절할 수도 있습니다. 예를 들어, 다음과 같이 설정하여 이미지를 좀 더 선명하게 보이도록 할 수 있습니다:

  ```css
  img {
    image-rendering: crisp-edges;
  }
  ```

  하지만 이 방법은 이미지의 유형에 따라 결과가 다를 수 있으므로 상황에 맞게 사용하는 것이 좋습니다.

## 결론

`img` 태그에 `translate`를 적용할 때 발생하는 흐릿해짐 문제는 이미지의 가로 또는 세로 크기가 홀수인 경우에 주로 발생합니다. 이를 방지하기 위해서는 이미지 크기를 짝수로 유지하거나, 이미지를 `background`로 사용하여 흐릿함을 방지할 수 있습니다. 이러한 간단한 팁을 적용하여 더욱 선명하고 깔끔한 이미지를 유지하세요.

```toc

```