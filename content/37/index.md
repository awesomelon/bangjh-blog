---
emoji: ☀️
title: image 높이 값 불러올 때 주의점
date: '2019-06-29 17:58:00'
author: Bangjh
tags: javascript image height
categories: FRONTEND
---

### 만약 프론트엔드 개발자라면 이미지를 불러와 높이 값에 따라 레이아웃을 변경할 때가 있을 것이다.

예를 들어 이런 코드가 있다고 가정해보자

```javascript
// 이미지를 검색해와서
var img = document.querySelector('img'); // 예시 img

// 이미지를 변경한 다음
img.src = 'test.png';
	
// #wrapper의 height를 변경된 img의 clientHeight값으로 변경하는 코드이다.
document.querySelector('#wrapper').style.height = img.clientHeight + 'px;
```

결론만 말하자면 위의 코드는 작동하지 않는다.

왜 그럴까?

그 이유는 test.png가 로딩되기 전 clientHeight를 구했기 때문이다.

위 코드가 작동되게 하려면 이렇게 해야한다.

```javascript
// 이미지를 검색해와서
var img = document.querySelector('img'); // 예시 img

// 이미지를 변경한 다음
img.src = 'test.png';
	
// img가 로드되고 난 후에
// #wrapper의 height를 변경된 img의 clientHeight값으로 변경하는 코드이다.
img.onload = function(){
  document.querySelector('#wrapper').style.height = img.clientHeight + 'px;
}
```

**결론**
`이미지는 로드되고 난 후에 컨트롤 해야 한다.`

```toc

```
