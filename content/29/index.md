---
emoji: ☀️
title: 이미지에서 색상 추출하기
date: '2024-07-22 16:26:00'
author: Bangjh
tags: Color Extraction, pureimage, canvas
categories: PLAYGROUND
---

이미지 처리의 다양한 응용 분야에서 이미지의 주요 색상을 추출하는 것은 매우 유용할 수 있습니다. 
이번 포스트에서는 ColorExtractor라는 JavaScript 클래스를 만들면서 
이미지에서 주요 색상을 추출하는 방법과 그 동작 원리에 대해 자세히 알아보겠습니다.

![video](video.gif)

## ColorExtractor란 무엇인가요?

ColorExtractor 클래스는 이미지에서 주요 색상을 쉽게 추출할 수 있도록 설계되었습니다. 
이 클래스는 여러 이미지 형식을 지원하며, 결과를 캐시하고, 유사한 색상을 필터링하여 더욱 깔끔한 색상 팔레트를 제공합니다.


### 주요 라이브러리 및 도구
1. `PureImage`: 자바스크립트로 이미지 작업을 할 수 있는 순수 라이브러리입니다.
2. `ML-KMeans`: k-means 클러스터링 알고리즘을 구현한 라이브러리입니다.
3. `NodeCache`: 간단한 인메모리 캐싱 라이브러리입니다.
4. `Chroma.js`: 색상 변환 및 색상 스케일을 위한 라이브러리입니다.
5. `Sharp`: 고성능 이미지 처리 라이브러리입니다.
6. `Tempfile`: 임시 파일 생성을 위한 유틸리티입니다.

### 싱글톤 패턴

ColorExtractor 클래스는 싱글톤 패턴을 사용하여 애플리케이션 전체에서 단 하나의 인스턴스만 존재하도록 합니다. 
이를 통해 클래스의 인스턴스를 반복해서 생성하는 것을 방지합니다.

```javascript
static instance;
static cache = new NodeCache({ stdTTL: 3600 });

static getInstance() {
  if (!ColorExtractor.instance) {
    ColorExtractor.instance = new ColorExtractor();
  }
  return ColorExtractor.instance;
}
```

### 색상 추출 메서드

extractColors 메서드는 다음과 같은 단계로 작동합니다.

1. `캐싱`: 주어진 이미지에 대한 결과가 이미 캐시되어 있는지 확인하고, 있다면 캐시된 결과를 반환합니다. 
2. `파일 존재 확인`: 제공된 이미지 파일이 존재하는지 확인합니다. 
3. `이미지 변환`: 이미지를 PNG 형식으로 변환합니다. 
4. `이미지 로딩`: 이미지를 로딩합니다. 
5. `캔버스 준비`: 이미지를 캔버스에 그려 픽셀을 조작할 수 있도록 합니다. 
6. `픽셀 샘플링`: 이미지 데이터에서 픽셀을 체계적으로 샘플링합니다. 
7. `K-Means 클러스터링`: 샘플링된 픽셀을 k개의 색상으로 클러스터링합니다. 
8. `색상 포맷팅`: 클러스터 중심을 RGB 색상으로 포맷팅합니다. 
9. `색상 필터링`: 유사한 색상을 필터링하여 중복을 줄입니다. 
10. `색상 안정화`: 여러 k-means 실행 결과에서 색상을 평균화하여 안정화합니다. 
11. `색상 정렬`: 색상을 비율과 밝기에 따라 정렬합니다. 
12. `주요 색상 식별`: 정렬된 목록에서 가장 주요한 색상을 식별합니다.


### 세부 단계

#### 이미지 변환

이미지를 PNG 형식으로 변환하는 것은 일관성을 유지하기 위해 중요합니다. 
이를 통해 원본 형식에 상관없이 이미지를 일관되게 처리할 수 있습니다.
```javascript
async _convertToPNG(imagePath) {
  const pngImagePath = tempfile({ extension: "png" });
  await sharp(imagePath).png().toFile(pngImagePath);
  return pngImagePath;
}
```

#### 이미지 로딩 및 캔버스 준비

PureImage를 사용하여 이미지를 캔버스에 로딩합니다. 이 단계는 픽셀 데이터를 조작하기 위해 필요합니다.

```javascript
async _loadImage(imagePath) {
  const stream = fs.createReadStream(imagePath);
  return await pureimage.decodePNGFromStream(stream);
}

_prepareCanvas(img) {
  const maxSize = 1000;
  let { width, height } = img;

  if (width > maxSize || height > maxSize) {
    const ratio = Math.min(maxSize / width, maxSize / height);
    width = Math.floor(width * ratio);
    height = Math.floor(height * ratio);
  }

  const canvas = pureimage.make(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  return { canvas, ctx };
}
```

#### 픽셀 샘플링

픽셀 수를 줄이면서도 대표성을 유지하기 위해 체계적으로 샘플링을 수행합니다.

```javascript
_systematicSamplePixels(imageData, width, height, sampleRate) {
  const pixels = [];
  const step = Math.round(1 / sampleRate);
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4;
      if (i + 2 < imageData.length) {
        pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
      }
    }
  }
  return pixels;
}
```

#### K-Means 클러스터링 및 색상 포맷팅

k-means 알고리즘을 적용하여 샘플링된 픽셀을 k개의 색상으로 클러스터링합니다. 
이 클러스터의 중심이 주요 색상을 나타냅니다.

```javascript
const result = kmeans(pixels, k, { seed: 42 });
const colors = this._formatColors(result.centroids);

_formatColors(centroids) {
  return centroids.map((centroid) => ({
    rgb: `rgb(${Math.round(centroid[0])}, ${Math.round(centroid[1])}, ${Math.round(centroid[2])})`,
    value: centroid,
  }));
}
```

#### 유사한 색상 필터링

CIEDE2000 색상 차이 공식을 사용하여 유사한 색상을 제거하여 다양한 색상 팔레트를 보장합니다.

```javascript
_filterSimilarColors(colors, colorRatios) {
  const filteredColors = [];
  const colorThreshold = 20;

  colors.forEach((color, index) => {
    const similarColorIndex = filteredColors.findIndex(
      (existingColor) =>
        chroma.deltaE(color.rgb, existingColor.rgb) < colorThreshold,
    );

    if (similarColorIndex === -1) {
      filteredColors.push({ ...color, ratio: colorRatios[index] });
    } else {
      filteredColors[similarColorIndex].ratio += colorRatios[index];
    }
  });

  return filteredColors;
}
```

#### 색상 안정화 및 정렬

여러 k-means 실행 결과에서 색상을 평균화하여 안정화합니다. 그 후, 색상을 비율과 밝기에 따라 정렬합니다.

```javascript
_stabilizeColors(allColors) {
  const colorMap = new Map();
  allColors.forEach((color) => {
    const key = color.rgb;
    if (!colorMap.has(key)) {
      colorMap.set(key, { ...color, count: 1 });
    } else {
      const existing = colorMap.get(key);
      existing.ratio += color.ratio;
      existing.count += 1;
    }
  });

  return Array.from(colorMap.values()).map((color) => ({
    ...color,
    ratio: color.ratio / color.count,
  }));
}

_sortColorsByRatio(colors) {
  return colors.sort(
    (a, b) =>
      b.ratio - a.ratio ||
      chroma(b.rgb).luminance() - chroma(a.rgb).luminance(),
  );
}
```

#### 주요 색상 식별

가장 주요한 색상은 정렬된 목록의 첫 번째 색상입니다.

```javascript
_getDominantColor(sortedColors) {
  return sortedColors[0].rgb;
}
```

---

개요를 알려드렸으니 사용 방법에 대해 설명드리겠습니다.

## 설치

```bash
$ npm install nodejs-color-extraction 
```

## 사용법
ColorExtractor를 사용하는 것은 매우 간단합니다. 아래는 이미지에서 색상을 추출하는 예제입니다.

```javascript
import { ColorExtractor } from 'nodejs-color-extraction';

const extractor = ColorExtractor.getInstance();

async function extractColors() {
  try {
    const result = await extractor.extractColors('path/to/your/image.jpg');
    console.log('Dominant Color:', result.dominantColor);
    console.log('Other Colors:', result.colors);
  } catch (error) {
    console.error('Error extracting colors:', error);
  }
}

extractColors();
/*
* {
*   colors: string[],
*   dominantColor: string
* }
* */
```


## 결론

ColorExtractor는 이미지에서 주요 색상을 추출하는 데 유용한 도구입니다.
K-Means 클러스터링 알고리즘을 사용하여 정확한 색상 그룹화를 제공하며, 캐싱과 리사이징을 통해 성능을 최적화합니다. 

이를 통해 다양한 이미지 처리 응용 분야에서 유용하게 사용할 수 있습니다.

---

- [소스 코드](https://github.com/awesomelon/color-extraction)


```toc

```
