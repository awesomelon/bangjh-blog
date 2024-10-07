---
emoji: ☀️
title: IOS input zoom 막기
date: '2020-11-25 09:58:00'
author: Bangjh
tags: IOS CSS input zoom
categories: FRONTEND
---

## 문제
iphone에서 input에 focus를 줬을 때 zoom이 되는 문제

## 문제의 원인
이 문제의 원인은 font-size때문이다.

[가장 많이 득표한 스택오버플로우 답변](https://stackoverflow.com/a/6394497)에 따르면 font-size가 16px 미만인 경우 필드에 초점이 맞춰지면 Safari가 확대됩니다. 계산 된 font-size가 16px 미만인 한 em 또는 rem과 같은 다른 단위가 사용되는지 여부는 중요하지 않습니다.

## 지금까지의 해결책

- font-size를 16px로 설정합니다.
- 최대 확대 크기를 1.0으로 지정하거나 `maximum-scale=1.0`,
  페이지 확대 / 축소를 비활성화합니다 `user-scalable=no`


## 위의 해결책의 문제점

- font-size를 16px로 설정하면 시각적 디자인이 저하됩니다.
    - 다른 요소를 조정하지 않고 요소의 텍스트 크기만을 늘리면 페이지의 디자인이 망가질 수도 있습니다.

- 페이지 확대 / 축소를 비활성화하면 사용성이 떨어집니다.
    - 이용자는 원할 때 확대 / 축소를 할 수 있어야 합니다.



## 최종 해결 책

위의 문제를 해결하는 방법은 css의 scale()을 사용하는 것입니다.

아래와 같이 스타일이 지정되어 있다고 가정합니다.
```css
input[type="text"] {
    /* styles to be adjusted */
    border-radius: 5px;
    font-size: 12px;
    line-height: 20px;
    padding: 5px;
    width: 100%;
}
```

먼저 필드를 16 ÷ 12 = 133.33%로 계산해서 필드들을 수정한다.

```css
input[type="text"] {
    /* enlarge by 16/12 = 133.33% */
    border-radius: 6.666666667px;
    font-size: 16px;
    line-height: 26.666666667px;
    padding: 6.666666667px;
    width: 133.333333333%;
}
```

이제 font-size가 16px이므로 초점 확대를 트리거하지 않습니다.

다음으로, scale() 사용하여 입력 필드를 12 ÷ 16 = 75 %로 줄입니다.

```css
input[type="text"] {
    /* enlarge by 16/12 = 133.33% */
    border-radius: 6.666666667px;
    font-size: 16px;
    line-height: 26.666666667px;
    padding: 6.666666667px;
    width: 133.333333333%;

    /* scale down by 12/16 = 75% */
    transform: scale(0.75);
    transform-origin: left top;
}
```

이 시점에서 입력 필드 오른쪽과 아래에 공백이 생깁니다.
이는 scale()은 시각적 모양에만 영향을 주기 때문입니다.

공백을 제거하려면

```css
input[type="text"] {
    /* enlarge by 16/12 = 133.33% */
    border-radius: 6.666666667px;
    font-size: 16px;
    line-height: 26.666666667px;
    padding: 6.666666667px;
    width: 133.333333333%;

    /* scale down by 12/16 = 75% */
    transform: scale(0.75);
    transform-origin: left top;

    /* remove extra white space */
    margin-bottom: -10px;
    margin-right: -33.333333333%;
}
```


## 마무리

- 12px로 축소된 16px은 12px로 설정된 font-size와 매우 비슷하지만 동일하지는 않습니다. 위 방법을 적용한 후 input의 가독성을 테스트해야합니다.

- scale() 변환 반올림으로 인해 1px이 얇게 보이거나 할 수 있다.

```toc

```
