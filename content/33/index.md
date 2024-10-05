---
emoji: ☀️
title: Swiper.js 슬라이더 안에 youtube 영상 넣기
date: '2019-12-06 14:58:00'
author: Bangjh
tags: Javascript Swiper.js youtube
categories: FRONTEND
---

오늘은 swiper.js로 만든 슬라이더들안에 youtube영상을 넣어보는 것을 알아보고자 한다.

기본적인 swiper를 생성하는 방법은 [이 링크](https://swiperjs.com)로 들어가면 자세히 알 수 있다.


#### index.html
```html
<!-- 
    youtube 링크는 자신이 원하는 링크로 바꾸시면 됩니다. 
    샘플이라 동영상 링크 한개로 씀 :)
-->
<body>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="youtube" data-youtubeLink="jtJsXd4sarc"></div>
      </div>
      <div class="swiper-slide">
        <div class="youtube" data-youtubeLink="jtJsXd4sarc"></div>
      </div>
      <div class="swiper-slide">
        <div class="youtube" data-youtubeLink="jtJsXd4sarc"></div>
      </div>
    </div>
  </div>
</body>
```

#### youtube.js
기본적인 yotube 동영상을 생성하는 방법은 [이 링크](https://developers.google.com/youtube/iframe_api_reference#Getting_Started)로 들어가면 자세히 알 수 있다.

```javascript
window.addEventListener('load', onLoadEvent);

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 생성된 id를 추가 시켜 영상을 조작하기 위한 객체
var player = {};

/*
    위의 첨부해둔 링크로 들어가보시면
    아래 함수 이름이 onYouTubeIframeAPIReady로 되어 있을텐데 이건 youtube api가 로드되면 바로 실행되기 때문에 swiper와 맞지 않다.
*/

function makeYoutube(id, link) {
  player[id] = new YT.Player(id, {
    height: '300',
    width: '480',
    playerVars: { autoplay: 1, controls: 0 },
    videoId: link,
    events: {
      onReady: onPlayerReady
    }
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }
}

/*
    조금이라도 첫 로딩을 빠르게 하기 위해
    .youtube를 클릭할 때 영상을 로드 시킴.
                                                     ↓        
    makeRandomId() 함수를 추가한 이유는 new YT.Player(id,{})
    이 부분에는 id만 들어가기 떄문이다.

    swiper.js option에 loop:true를 추가하게 되면 처음과 마지막 슬라이드의 복제가 생기는데 
    그렇게되면 id도 복제가 되서 같은 id가 2개가 된다.
    그럼 처음 검색된 id에만 동영상이 로딩되고 다음 id엔 로드가 되지 않는다.
    그래서 생각한 것이 html에는 id를 넣지 않고 클릭될 때 id를 추가해서 넣고 그 아이디로 영상을 로드시키는 방법이다.
*/

function yotubeOnClick() {
  [].forEach.call(document.querySelectorAll('.youtube'), function(el, index) {
    el.addEventListener('click', function() {
      var thisYoutubeLink = this.getAttribute('data-youtubeLink');
      this.id = makeRandomId();
      makeYoutube(this.id, thisYoutubeLink);
    });
  });
}

// load될 때 클릭 이벤트와 swiper가 슬라이드 될 때 동영상을 stop 시키는 이벤트 추가.
function onLoadEvent() {
  yotubeOnClick();
  mySwiper.on('slideChangeTransitionEnd', youtubeAllStop);
}

// 위에 생성해둔 player 객체 안에 있는 프로퍼티들을 검색해서 비디오 멈춤
function youtubeAllStop() {
  for (var youtube in player) {
    player[youtube].pauseVideo();
  }
}

function makeRandomId() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';

  for (var i = 0; i < 11; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
```

이것으로 swiper안에 youtube넣기를 마치겠습니다 :)



```toc

```
