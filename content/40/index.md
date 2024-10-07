---
emoji: ☀️
title: Parcel 기초 세팅
date: '2019-12-26 09:58:00'
author: Bangjh
tags: javascript Parcel Bundler
categories: FRONTEND
---

오늘은 웹 어플리케이션 번들러 3대장`webpack, rollup, parcel`중 하나인 parcel의 세팅 방법에 대해 알아보겠습니다.

물론 알아볼 것도 없이 [parcel 홈페이지](https://ko.parceljs.org/)가 워낙 번역이 잘되어 있긴 합니다 ㅎㅎ;;

그래도 세팅이 어려운 분들을 위해 작성해봅니다.


시작하기
---

먼저 parcel을 실행하려면 parcel을 설치해야겠죠?

Yarn:
`yarn global add parcel-bundler`

npm:
`npm install -g parcel-bundler`

그 다음

`yarn init -y`
`npm init -y`

그런 다음 index.html
```html
	<html>
      <body>
        <script src="./index.js"></script>
      </body>
    </html>
```

```index.js
	console.log('hello world')
```

실행
`parcel index.html`

이런식으로 실행하면 parcel이 자동으로 다시 빌드하고 핫리로드도 지원합니다.
그냥 진입점 파일만 지정해주면 됩니다.


개발 환경
---
parcel은 옵션을 건드릴게 없습니다. 그게 장점이라면 장점이죠.
굳이 개발할 때 넣을 옵션이 있다면

--open
`parcel index.html --open`

이런식으로 끝부분에 명령어를 넣어주면 실행하는 순간 브라우저창이 열리게 됩니다.




프로덕션
---

parcel을 빌드하면 기본적으로 dist폴더가 생성되며 그 안에 빌드된 파일이 저장됩니다.

dist폴더명을 다른 것으로 하고 싶을 땐

--out-dir
`parcel build index.html --out-dir build`
로 하시면 폴더명이 build로 바껴 빌드됩니다.


--public-url
그리고 기본적으로 빌드를 하면 외부 파일들의 경로가 아래처럼 루트 경로로 되어 있을 겁니다.

```html
	<html>
      <body>
        <script src="/a125gegweg.js"></script>
      </body>
    </html>
```

이것을 아래와 같은 방식으로 외부 파일들의 경로를 바꾸고 싶을 때
```html
	<html>
      <body>
        <script src="a125gegweg.js"></script>
      </body>
    </html>
```
`parcel build index.html --public-url ./`
이런식으로 하시면 됩니다.

#### babelrc
es6이상의 문법을 사용하시면 IE11이하에서 지원을 안 하기 때문에 babel로 es5이하로 변환을 시켜줘야 합니다.
기존의 babel은 쓰려는 문법이 @babel/preset-env가 지원을 안하는 문법이면 필요한 plugins를 넣어줘야 했는데
이제는 간단하게 적용할 수 있습니다.

**참고** `.babelrc`파일은 프로젝트 루트 경로에 넣으셔야 합니다. 그래야 parcel이 파일을 인식해서 코드를 변환합니다.
```javascript
// .babelrc
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage", // or "entry"
				"corejs": 3
			}
		]
	],
	"plugins": [
		[
			"@babel/transform-runtime",
			{
				"corejs": 3
			}
		]
	]
}

```

#### postcssrc
css 전처리기입니다. 아직 postcss의 기능들을 다 모르기 때문에 autoprefixer만 넣고 사용중입니다.
```javascript
 // .postcssrc
  {
    "modules": false,
    "plugins": {
      "autoprefixer": true
    }
  }
```

#### imagemin.js
이건 제가 추가한 js입니다.
작업을 하실 때 이미지들을 압축해서 사용할 필요가 있는데 그걸 하나하나 압축하기엔 시간도 아깝고 제일 중요한 건 귀찮습니다. ㅎㅎ
이때 필요한게 imagemin입니다. 이 플러그인을 통해 원하는 경로에 있는 모든 이미지 파일들을 용량 최적화를 진행합니다.
```javascript
  // imagemin은 압축된 파일들을 새폴더에 출력해주는데 
  // 이것을 그냥 제자리에 압축된 채로 놔누게 하려고 쓰는 플러그인입니다.
  const imagemin = require('imagemin-keep-folder');

  // png파일을 압축하려고 쓰는 플러그인입니다. 이밖에도 많지만 이게 제일 오류가 적습니다...
  // imagemin-pngquant 이것도 있는데 너무 오류가 많습니다.
  const imageminOptipng = require('imagemin-optipng');

  // jpg압축을 할 때 쓰는 플러그인입니다.
  const imageminMozjpeg = require('imagemin-mozjpeg');

  (async () => {
      // dist/static/*.png 경로 내의 png를 다 압축합니다.
      await imagemin(['dist/static/*.png'], {
          use: [imageminOptipng()]
      });

      // dist/static/*.png 경로 내의 jpg를 다 압축합니다.
      await imagemin(['dist/static/*.jpg'], {
          use: [imageminMozjpeg()]
      });

      console.log(`image optimize complete`);
  })();
```

##### 사용법
위의 설정들을 종합하면 현재까지의 사용법
```javascript
  "scripts": {
          "start": "parcel public/index.html --open",
          "build": "parcel build public/index.html --public-url ./ --out-dir dist && node imagemin.js"
      }
```


#### 그리고 제가 추천하는 한가지
***rimraf*** 입니다

알만한 사람은 다 아실겁니다. 폴더를 강제로 삭제할 수 있는 패키지죠.

빌드를 할 때 만약 이전에 빌드 했던 dist폴더가 그대로 남아있다면 그 안에 현재 빌드한 파일들과 이전에 빌드된 파일들이 함께 저장되게 됩니다. 그래서 뭐가 뭔지 모르는 지경이 되죠.

그래서 빌드할 때 이전에 빌드되었던 dist폴더를 제거할 필요가 있습니다. 그래서 rimraf가 필요하죠

설치는 간단합니다.

Yarn:
`yarn global add rimraf`

npm:
`npm install -g rimraf`

rimraf를 추가한 사용법입니다.
```javascript
  "scripts": {
          "start": "rimraf dist && parcel public/index.html --open",
          "build": "rimraf dist && parcel build public/index.html --public-url ./ --out-dir dist && node imagemin.js"
      },
```

저 명령어 사이에 있는 &&는 rimraf dist로 dist폴더를 지운 다음 parcel build하겠다는 명령어 입니다.

정말 간단하죠? 이런게 parcel의 큰 장점입니다.

하지만 단점도 있습니다.

빌드할 때 외부 파일들을 폴더별로 정리할 수 없다는 것입니다.

빌드를 해보시면 알겠지만 한 폴더내에 css,js,image다 모여있죠?

이게 아직 parcel이 지원을 안 한답니다.

parcel2에서는 지원한다고 하는데 빨리 놔왔으면...

그래도 난 파일들을 폴더별로 나누고 싶다 하시는 분은
[이 링크](https://medium.com/hceverything/parcel-js-moving-static-resources-to-a-separate-folder-aef63a038cbd)로 들어가 보셔요. 누가 폴더별로 나누는 걸 구현해놨어요


이만 parcel의 간략한 세팅 방법에 대해 알아보았습니다.


```toc

```
