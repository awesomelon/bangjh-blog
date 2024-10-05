---
emoji: ☀️
title: IOS 모바일 기기에서 click event 사용시 문제점
date: '2020-02-07 12:58:00'
author: Bangjh
tags: javascript ios click event
categories: FRONTEND
---

### 다들 웹개발을 하실 때 click event를 많이 사용하실 겁니다.

```javascript
target.addEventListener('click',function(){
  // .. 
});
```

아마 이런 식으로 이벤트를 추가하실텐데 pc에선 문제가 없습니다.

하지만 IOS 모바일 기기에서 확인해보면 약간 반응이 느린걸 알 수 있습니다.

무엇이 문제일까요??

이는 IOS가 의도적으로 클릭이벤트를 지연시키기 때문입니다.

일부러 클릭이벤트를 지연시켜 제스쳐/스와이프가 올바르게 작동하게 하기 위함입니다.

이를 해결하기 위해선 touchStart, touchend 등의 이벤트를 사용해야 합니다.

위의 두 이벤트는 click 이벤트와 달리 300ms의 지연 없이 즉시 실행됩니다.

그렇다면 코드는 이렇게 됩니다.

```javascript
target.addEventListener('touchstart',function(){
  // ...
});
	
// or
	
target.addEventListener('touchend',function(){
  // ...
});
```

하지만 click 이벤트도 넣어야하고 touch이벤트도 넣어야할 때는?

```javascript
var clickEvent = (function() {
  if ('ontouchstart' in document.documentElement === true) {
    return 'touchstart';
  } else {
    return 'click';
  }
})();

target.addEventListener(clickEvent,function(){
  // ...
});
```
이런식으로 하면 touch이벤트가 있는 브라우저면 touch 아니면 click이 반환됩니다.


```toc

```
