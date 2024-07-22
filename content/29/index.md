---
emoji: ☀️
title: 이미지에서 색상 추출하기
date: '2024-07-22 16:26:00'
author: Bangjh
tags: Color Extraction, pureimage, canvas
categories: PLAYGROUND
---

이미지 처리의 다양한 응용 분야에서 이미지의 주요 색상을 추출하는 것은 매우 유용할 수 있습니다. 
이번 포스트에서는 ColorExtractor라는 JavaScript 클래스를 사용하여 이미지에서 주요 색상을 추출하는 방법과 그 동작 원리에 대해 자세히 알아보겠습니다.

![video](video.gif)

## ColorExtractor란 무엇인가요?

ColorExtractor는 이미지를 분석하여 주요 색상과 지배적인 색상을 추출하는 JavaScript 클래스입니다. 
이 클래스는 K-Means 클러스터링 알고리즘을 사용하여 이미지에서 색상을 그룹화하고, 캐싱을 통해 성능을 최적화합니다. 
또한 대형 이미지를 처리하기 위해 리사이징 기능을 제공하며, 유사한 색상을 필터링하여 더 정확한 색상 팔레트를 제공합니다.


## 주요 기능
- 주요 색상 추출: 이미지에서 주요 색상을 식별합니다.
- 지배적인 색상 식별: 이미지에서 가장 지배적인 색상을 결정합니다.
- 성능 최적화: 결과를 캐싱하여 빠른 처리 속도를 제공합니다.
- 리사이징: 대형 이미지를 효율적으로 처리하기 위해 크기를 조정합니다.
- 유사 색상 필터링: 유사한 색상을 필터링하여 더 정확한 색상 팔레트를 제공합니다.
- 다중 실행 및 안정화: 일관된 결과를 위해 여러 번 실행하고 안정화합니다.
- K-Means 클러스터링: K-Means 클러스터링 알고리즘을 사용하여 색상을 정확하게 그룹화합니다.

## 설치

```bash
$ npm install pureimage ml-kmeans node-cache chroma-js sharp tempfile 
```

## 사용법
ColorExtractor를 사용하는 것은 매우 간단합니다. 아래는 이미지에서 색상을 추출하는 예제입니다.

```javascript
import { ColorExtractor } from './core.js';

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
```

## 동작 원리

ColorExtractor는 여러 단계에 걸쳐 동작합니다. 각 단계에서 수행되는 작업은 다음과 같습니다

### 싱글톤
ColorExtractor는 싱글톤 패턴을 사용하여 클래스의 인스턴스가 하나만 존재하도록 합니다. 이를 통해 자원을 효율적으로 관리할 수 있습니다.

```javascript
static getInstance() {
  if (!ColorExtractor.instance) {
    ColorExtractor.instance = new ColorExtractor();
  }
  return ColorExtractor.instance;
}
```

### 이미지 변환
이미지 파일을 PNG 형식으로 변환합니다. 이는 sharp 라이브러리를 사용하여 수행되며, 변환된 파일은 임시 파일로 저장됩니다. 이렇게 하면 일관된 이미지 처리가 가능합니다.

```javascript
async _convertToPNG(imagePath) {
  const pngImagePath = tempfile({ extension: "png" });
  await sharp(imagePath).png().toFile(pngImagePath);
  return pngImagePath;
}
```

### 이미지 로드
변환된 PNG 이미지를 pureimage 라이브러리를 사용하여 로드하고, 캔버스에 그립니다. 이를 통해 픽셀 데이터를 쉽게 추출하고 조작할 수 있습니다.

```javascript
async _loadImage(imagePath) {
  const stream = fs.createReadStream(imagePath);

  try {
    return await pureimage.decodePNGFromStream(stream);
  } catch (error) {
    console.error(`Error loading image from path: ${imagePath}`, error);
    throw new Error("Failed to load image. Please ensure the file is not corrupted and is in PNG or JPG format.");
  }
}
```

### 픽셀 샘플링
이미지 데이터에서 체계적으로 픽셀을 샘플링합니다. 샘플링된 픽셀 데이터는 K-Means 클러스터링 알고리즘의 입력으로 사용됩니다.

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

### 색상 클러스터링
K-Means 클러스터링 알고리즘을 사용하여 샘플링된 픽셀 데이터를 클러스터링합니다. 이 과정에서 색상의 중심점(centroid)을 계산하여 주요 색상을 도출합니다.

```javascript
for (let i = 0; i < runs; i++) {
  const result = kmeans(pixels, k, { seed: 42 });
  const colors = this._formatColors(result.centroids);
  // NOTE: Filter Similar Colors
  if (onFilterSimilarColors) {
    const colorRatios = this._calculateColorRatios(result.clusters, k);
    const filteredColors = this._filterSimilarColors(colors, colorRatios);
    allColors.push(...filteredColors);
  } else {
    allColors.push(...colors);
  }
}
```

### 결과 안정화
여러 번의 실행을 통해 도출된 색상 결과를 안정화합니다. 이는 결과의 일관성을 보장하기 위함입니다.

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
```

## 결론

ColorExtractor는 이미지에서 주요 색상을 추출하는 데 유용한 도구입니다.
K-Means 클러스터링 알고리즘을 사용하여 정확한 색상 그룹화를 제공하며, 캐싱과 리사이징을 통해 성능을 최적화합니다. 이를 통해 다양한 이미지 처리 응용 분야에서 유용하게 사용할 수 있습니다.

이 블로그 글 초안을 기반으로 추가적인 내용을 수정하거나 확장하시면 됩니다. 더 궁금한 사항이나 추가할 내용이 있다면 말씀해 주세요.

---

- [소스 코드](https://github.com/awesomelon/color-extraction)


```toc

```
