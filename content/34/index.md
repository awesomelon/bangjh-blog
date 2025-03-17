---
emoji: ☀️
title: $(this).index()를 javascript로 만들기
date: '2019-10-20 17:58:00'
author: j-ho
tags: Javascript Jquery
categories: FRONTEND
---

## jquery를 쓰다보면 현재 클릭한 요소의 인덱스 값을 구하는 것을 많이 쓰는데 코드로 보면 다음과 같다.

```javascript
// 클릭한 요소의 형제들 중 자신이 몇 번째인지 확인
$(this).index();

// 또는
// 특정 element들 중 자신이 몇 번째인지 확인
$(element).index(this);
```

어떻게 구현하는 걸까? 생각해보자.

우선 현재 클릭한 요소의 부모 요소부터 찾아야 할 듯하다.

함수로 만들어 보겠다

```javascript
function getParentNode(element) {
  return element.parentNode;
}
```

이런식으로하면 element의 부모 요소를 찾을 것이다.
그리고 부모 요소 중 element는 몇 번째 자식인지 찾아야 한다.
그러려면 Array객체의 메서드 중 indexOf() 메서드가 유용하다.

```javascript
function getElementIndex(element) {
  return [].indexOf.call(element.parentNode.children, element);
}
```

1차로 element의 인덱스 값을 구하는 함수가 완성이 되었다.

함수를 살펴보면

```javascript
[].indexOf.call(element.parentNode.children, element);
```

이라고 되어 있는데 indexOf는 Array객체의 메서드라서 parentNode.children같은 유사 배열엔 적용되지 않는다.(크롬은 되는데 그놈의 IE ㅠㅠ)

mdn을 찾아보면 indexOf 사용법이 이렇게 적혀 있다.

#### arr.indexOf(searchElement[, fromIndex])

#### searchElement

배열에서 찾을 요소입니다.

#### fromIndex Optional

검색을 시작할 색인입니다. 인덱스가 배열의 길이보다 크거나 같은 경우 -1이 반환되므로 배열이 검색되지 않습니다. 제공된 색인 값이 음수이면 배열 끝에서부터의 오프셋 값으로 사용됩니다. 참고 : 제공된 색인이 음수이면 배열은 여전히 앞에서 뒤로 검색됩니다. 계산 된 인덱스가 0보다 작 으면 전체 배열이 검색됩니다. 기본값 : 0 (전체 배열 검색).

#### 반환 값

배열 내의 요소의 최초의 인덱스. 발견되지 않으면 -1.

**여기서 우린 arr부분을 call로 element.parentNode.children로 바꿔주었다.**

그다음으로 추가해야할 부분은 특정 element들중 자신이 몇 번째 element인지 확인해야하는 부분이다.

```javascript
function getElementIndex(element, range) {
  // 추가
  if (!!range) return [].indexOf.call(element, range);
  return [].indexOf.call(element.parentNode.children, element);
}
```

getElementIndex함수에 인자를 하나 추가했다.

찾고자 하는 element(range)를 추가해서 그것들 중 element는 몇 번째 인지 확인한다.

range 인자가 있을 때만 적용되게 하기 위해 if문을 추가했다.

#### 사용법

```html
<div id="wrapper">
  <div class="ss">p1</div>
  <div>p2</div>
  <p>444</p>
  <div class="ss">p3</div>
  <div>p4</div>
  <div class="ss">p5</div>
</div>
```

```javascript
// ex)
[].forEach.call(document.querySelectorAll('#wrapper div'), function(el) {
  el.addEventListener('click', function() {
    console.log(getElementIndex(document.querySelectorAll('#wrapper div'), el));
  });
});
// ex)
[].forEach.call(document.querySelectorAll('#wrapper div'), function(el) {
  el.addEventListener('click', function() {
    console.log(getElementIndex(document.querySelectorAll('.ss'), el);
  });
});

```

이것으로 swiper안에 youtube넣기를 마치겠습니다 :)

```toc

```
