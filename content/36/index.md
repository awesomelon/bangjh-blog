---
emoji: ☀️
title: input 입력 시 한글만 입력하게 하고 싶을 때
date: '2019-07-14 17:58:00'
author: Bangjh
tags: javascript input 한글
categories: FRONTEND
---

입력 폼 개발 시 사용자가 input에 한글만 적게 하고 싶을 때가 있다.

처음엔 이런식으로 하면 될 줄 알았지만

```javascript
var name = document.querySelector('#name');
var onlyKorean = function() {
  var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  this.value = this.value.replace(pattern, '');
};
name.addEventListener('keyup', onlyKorean);
```

크롬에선 정상 작동되는데 IE에서는 정상적으로 작동하지 않았다 (망할 IE 망했으면...);

그때 여러 구글링을 통해 알아본 결과

숫자나 영어는 123, abc 이렇게 적히는 반면

한글은 ㄱ ㅏ ㅁ 을 합쳐서 감으로 만들어야 하기 때문에 keyup을 하면 안된다는 것이었다.

그래서 위 코드를 수정한 것이 keypress이다.

```javascript
// ... 생략
name.addEventListener('keypress', onlyKorean);
```

keypress로 적용하니 정상 작동하였다.

**결론 한글 입력 시 이벤트를 걸려면 keyup 말고 keypress !!!!**

```toc

```
