---
title: Styled-Components와 Emotion을 활용한 스타일링
date: '2021-04-05 09:58:00'
author: j-ho
tags: React CSS-in-JS emotion styled-components
categories: FRONTEND
---

프론트엔드 개발에서 컴포넌트 기반 스타일링의 중요성이 점점 커지고 있습니다. 특히 **CSS-in-JS** 방식은 최근 트렌드로 자리 잡았는데, 여기서 대표적인 두 라이브러리가 **Styled-Components**와 **Emotion**입니다. 이번 글에서는 이 두 라이브러리를 사용해 스타일링을 어떻게 더 쉽게 하고, 컴포넌트 기반 개발에서 어떤 장점을 제공하는지 알아보겠습니다.

## CSS-in-JS란?

CSS-in-JS는 자바스크립트 코드 안에 CSS를 작성하는 방식입니다. 전통적인 CSS 파일과 달리, 각 컴포넌트에 맞춘 스타일을 자바스크립트 코드 내에서 정의할 수 있습니다. 이는 스타일을 컴포넌트와 함께 관리할 수 있게 해주며, 코드의 재사용성과 유지보수를 용이하게 만듭니다. CSS-in-JS 방식의 주요 특징은 다음과 같습니다:

- **컴포넌트 기반 스타일링**: 각 컴포넌트에 맞는 스타일을 정의하여 스타일의 독립성을 보장합니다.
- **동적 스타일**: props를 사용하여 컴포넌트의 상태에 따라 동적으로 스타일을 변경할 수 있습니다.
- **자동 벤더 프리픽스**: CSS-in-JS는 다양한 브라우저 호환성을 위해 자동으로 벤더 프리픽스를 추가해줍니다.

이러한 특징들 덕분에 CSS-in-JS는 유지보수가 쉽고, 대규모 프로젝트에서도 효율적인 스타일 관리가 가능합니다.

## Styled-Components 소개

**Styled-Components**는 CSS-in-JS 방식을 지원하는 대표적인 라이브러리로, React 컴포넌트를 스타일링하는 데 매우 유용합니다. styled-components를 사용하면 CSS 코드를 자바스크립트 파일 안에서 직접 작성하고, 스타일링이 적용된 컴포넌트를 쉽게 만들 수 있습니다.

### Styled-Components의 장점

- **컴포넌트 기반 스타일링**: 스타일이 각 컴포넌트에 종속되므로 전역 스타일 충돌을 방지할 수 있습니다.
- **동적 스타일링**: props를 사용하여 조건에 따라 스타일을 다르게 적용할 수 있습니다.

예를 들어, 다음과 같이 버튼 컴포넌트를 스타일링할 수 있습니다:

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3700b3;
  }
`;

function App() {
  return <Button>클릭하세요</Button>;
}
```

위 코드에서 볼 수 있듯이, 스타일은 컴포넌트와 함께 정의되며 `Button` 컴포넌트를 사용할 때 자동으로 해당 스타일이 적용됩니다. 이는 각 컴포넌트의 스타일을 독립적으로 관리하고, 가독성을 높여줍니다.

또한, **props를 사용한 동적 스타일링**도 가능합니다. 예를 들어, 버튼의 색상을 props에 따라 변경하려면 다음과 같이 작성할 수 있습니다:

```jsx
const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#6200ea' : '#03dac5')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.primary ? '#3700b3' : '#018786')};
  }
`;

function App() {
  return (
    <div>
      <Button primary>Primary 버튼</Button>
      <Button>Secondary 버튼</Button>
    </div>
  );
}
```

위 코드에서는 `primary`라는 props를 사용하여 버튼의 색상을 조건부로 변경하고 있습니다.

## Emotion 소개

**Emotion**도 Styled-Components와 비슷한 CSS-in-JS 라이브러리로, 성능이 뛰어나고 유연한 스타일링 옵션을 제공합니다. Emotion은 **`@emotion/styled`**와 **`@emotion/react`** 두 가지 모듈을 제공하여 다양한 스타일링 접근을 지원합니다.

### Emotion의 주요 특징

- **높은 성능**: Emotion은 런타임 성능이 우수하며, 필요한 경우 스타일을 미리 컴파일할 수 있는 기능을 제공합니다.
- **유연성**: 다양한 방식으로 스타일을 정의할 수 있어 상황에 맞는 유연한 스타일링이 가능합니다.

다음은 Emotion을 사용한 간단한 예시입니다:

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const buttonStyle = css`
  background-color: #03dac5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #018786;
  }
`;

const Button = styled.button`
  ${buttonStyle}
`;

function App() {
  return <Button>Emotion 버튼</Button>;
}
```

Emotion은 **유연성**을 강조하며, 필요한 경우 CSS 클래스를 인라인으로 적용하거나 styled-components와 유사한 방식으로 사용 가능합니다. 예를 들어, `css` 함수를 사용하여 스타일을 직접 정의하고 컴포넌트에 적용할 수 있습니다. 이런 유연함 덕분에 Emotion은 가볍게 사용할 수 있으며, 스타일링 작업의 자유도를 높여줍니다.

또한, Emotion은 **테마**를 사용한 스타일링도 쉽게 지원합니다. 예를 들어, 전역적으로 정의된 테마를 사용하여 컴포넌트의 스타일을 통일할 수 있습니다:

```jsx
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#6200ea',
    secondary: '#03dac5',
  },
};

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>테마 버튼</Button>
    </ThemeProvider>
  );
}
```

위 코드에서는 `ThemeProvider`를 사용하여 `theme`을 정의하고, 이를 `Button` 컴포넌트에서 활용하고 있습니다. 이를 통해 스타일을 일관되게 적용할 수 있으며, 테마 변경도 쉽게 관리할 수 있습니다.

## Styled-Components vs Emotion

두 라이브러리는 많은 공통점을 갖고 있지만, 몇 가지 차이점도 있습니다:

- **성능**: Emotion은 성능 최적화 측면에서 더 우수하며, SSR(Server-Side Rendering)에서 더 나은 성능을 발휘합니다. 이는 특히 초기 로딩 시간을 줄이는 데 유리합니다.
- **API의 유연성**: Emotion은 다양한 스타일링 방식(인라인 스타일, css 함수 사용, styled 사용 모두 지원)을 제공해 상황에 따라 선택할 수 있습니다. 반면 Styled-Components는 코드의 일관성을 유지하는 데 더 적합할 수 있습니다.
- **커뮤니티와 지원**: Styled-Components는 React 개발자들 사이에서 인기가 많아, 더 많은 튜토리얼과 문서가 존재합니다. 그러나 Emotion도 빠르게 인기를 얻고 있으며, 다양한 사용 사례와 예시가 늘어나고 있습니다.

## 실제 사용 사례

이 두 라이브러리는 **디자인 시스템**을 구현하거나 **유지보수성을 높이기 위한 컴포넌트 기반 개발**에서 자주 사용됩니다. 특히 **React**와 같은 라이브러리와 잘 어울리며, 컴포넌트의 재사용성을 극대화하고, 스타일의 오염(다른 컴포넌트에 의도치 않게 스타일이 적용되는 문제)을 방지할 수 있습니다.

### 팀 프로젝트에서의 활용

예를 들어, 팀 프로젝트에서 각각의 컴포넌트가 독립적으로 개발되고 스타일링이 필요할 때, CSS-in-JS를 사용하면 컴포넌트의 스타일을 더 쉽게 모듈화하고 관리할 수 있습니다. 이는 유지보수성뿐만 아니라 협업의 효율성도 높이는 데 큰 도움이 됩니다.

**디자인 시스템**을 구축할 때도 Styled-Components나 Emotion은 큰 도움이 됩니다. 디자인 시스템은 일관된 UI와 스타일을 유지하기 위한 컴포넌트 모음이며, 이를 통해 빠르게 UI를 개발하고 유지보수할 수 있습니다. 예를 들어, 버튼, 카드, 입력 폼 같은 UI 요소를 컴포넌트로 정의하고, 이를 재사용하여 일관된 스타일을 유지할 수 있습니다.

## 결론

**CSS-in-JS**는 컴포넌트 기반 개발에서 스타일을 효율적으로 관리하기 위한 중요한 기술입니다. **Styled-Components**와 **Emotion**은 이러한 CSS-in-JS 방식을 대표하는 두 라이브러리로, 각기 다른 장점과 특성을 가지고 있습니다. 주니어 개발자로서 이 두 도구를 익혀두면, 더 깔끔하고 유지보수하기 쉬운 코드를 작성하는 데 큰 도움이 될 것입니다.

실제로 간단한 프로젝트에서 두 라이브러리를 사용해보면서, 스타일을 관리하는 다양한 방식을 경험해보세요. 이를 통해 어떤 방식이 여러분의 개발 스타일에 맞는지 알아갈 수 있을 것입니다. 더 나아가, 팀 프로젝트나 개인 프로젝트에서 디자인 시스템을 구축하는 경험을 쌓아, 스타일링을 더욱 효율적으로 관리하고 유지보수성을 높일 수 있을 것입니다.

```toc

```
