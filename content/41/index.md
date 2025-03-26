---
title: iPhone에서 Input Focus 시 Zoom 문제 해결하기
date: '2020-11-25 09:58:00'
author: j-ho
tags: IOS CSS input zoom
categories: FRONTEND
---

모바일 웹 개발을 하다 보면 iPhone에서 `input` 필드에 포커스를 줄 때 화면이 확대되는 현상을 종종 겪게 됩니다. 특히 작은 화면에서 의도치 않은 확대는 사용자 경험을 저하시키며 불편함을 초래합니다. 이번 글에서는 이 문제의 원인과 다양한 해결책, 그리고 가장 최적화된 방법에 대해 자세히 알아보겠습니다.

## 문제의 원인

이 문제의 원인은 주로 `font-size` 때문입니다. [가장 많이 득표한 스택오버플로우 답변](https://stackoverflow.com/a/6394497)에 따르면, Safari는 `input` 필드의 `font-size`가 16px 미만인 경우 자동으로 확대를 트리거합니다. 이는 사용자가 작은 글씨를 쉽게 보지 못할 것을 우려하여 설계된 기능입니다. `font-size`가 16px 미만인 한, `em` 또는 `rem` 같은 다른 단위가 사용되더라도 확대 현상은 동일하게 발생합니다.

## 기존 해결책

iPhone의 자동 확대 문제를 해결하기 위해 흔히 시도되는 방법은 다음과 같습니다.

1. **`font-size`를 16px로 설정하기**
   - 모든 입력 필드의 `font-size`를 16px 이상으로 설정하면 확대 현상을 방지할 수 있습니다.
2. **페이지 확대/축소 비활성화**
   - 메타 태그를 사용하여 페이지 확대/축소 기능을 비활성화합니다.
     ```html
     <meta
       name="viewport"
       content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
     />
     ```

## 기존 해결책의 문제점

하지만 위의 해결책들은 몇 가지 단점이 있습니다.

- **디자인 저하**: `font-size`를 16px로 설정하면 기존 디자인이 깨질 수 있습니다. 특히 작은 크기의 입력 필드를 사용하는 디자인에서는 텍스트 크기가 비례하지 않아 전체적인 UI가 불균형하게 보일 수 있습니다.
- **사용성 저하**: 페이지 확대/축소를 비활성화하면 사용자가 원하는 부분을 확대해서 보는 기능이 제한됩니다. 이는 접근성 측면에서 부정적인 영향을 미칩니다.

## 최적의 해결책: CSS `scale()` 사용

이 문제를 해결하기 위한 가장 좋은 방법 중 하나는 CSS의 `scale()` 함수를 사용하는 것입니다. 이 방법을 사용하면 확대 현상을 방지하면서도 시각적인 디자인을 유지할 수 있습니다.

다음과 같이 입력 필드 스타일이 지정되어 있다고 가정합니다:

```css
input[type='text'] {
  border-radius: 5px;
  font-size: 12px;
  line-height: 20px;
  padding: 5px;
  width: 100%;
}
```

### 1단계: 필드 확대

먼저 필드를 확대하여 `font-size`를 16px로 설정합니다. 기존의 12px에서 16px로 변경하므로, 비율은 `16 / 12 = 133.33%`입니다.

```css
input[type='text'] {
  border-radius: 6.67px;
  font-size: 16px;
  line-height: 26.67px;
  padding: 6.67px;
  width: 133.33%;
}
```

이렇게 하면 `font-size`가 16px이 되어 포커스를 줄 때 확대되지 않습니다.

### 2단계: 필드 축소

이제 `scale()`을 사용하여 입력 필드를 시각적으로 다시 원래 크기로 줄입니다. `12 / 16 = 75%`로 축소하면 됩니다.

```css
input[type='text'] {
  border-radius: 6.67px;
  font-size: 16px;
  line-height: 26.67px;
  padding: 6.67px;
  width: 133.33%;

  transform: scale(0.75);
  transform-origin: left top;
}
```

### 3단계: 여백 제거

`scale()`을 사용하면 입력 필드 오른쪽과 아래에 불필요한 여백이 생길 수 있습니다. 이를 제거하기 위해 `margin`을 음수 값으로 설정합니다.

```css
input[type='text'] {
  border-radius: 6.67px;
  font-size: 16px;
  line-height: 26.67px;
  padding: 6.67px;
  width: 133.33%;

  transform: scale(0.75);
  transform-origin: left top;

  margin-bottom: -10px;
  margin-right: -33.33%;
}
```

## 마무리 및 고려 사항

- 이 방법을 적용한 후, 입력 필드의 가독성을 테스트하는 것이 중요합니다. 축소된 `16px`이 실제로 `12px`과 비슷하게 보이지만, 미세한 차이가 있을 수 있습니다.
- `scale()` 변환으로 인해 일부 요소들이 1px 단위에서 미세하게 어긋나 보일 수 있습니다. 이는 UI 테스트를 통해 보정해야 합니다.

위 방법을 통해 iPhone에서 `input` 필드에 포커스를 줄 때 발생하는 자동 확대 문제를 효과적으로 해결할 수 있습니다. 디자인의 일관성을 유지하면서도 사용자 경험을 해치지 않는 최적의 방법이므로, 비슷한 문제를 겪는 경우 적용해 보시기 바랍니다.

```toc

```
