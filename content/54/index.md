---
title: React에서 가장 어려운 부분?
date: '2024-12-29 12:21:34'
author: j-ho
tags: React, architecture
categories: WIKI
---

React를 처음 배우는 분들은 React가 복잡하고 어려울 것이라고 생각하기 쉽습니다.
하지만 실제로 React 자체는 엄격한 알고리즘과 명확한 로직을 제공하기 때문에 복잡도가 크게 높지 않습니다.
**오히려 문제는 React ‘바깥’에 있습니다.** 예를 들어, “어떤 기준으로 컴포넌트를 설계할지?”, “라이브러리를 사용해야 할지, 직접 구현해야 할지?”, “어떤 상태관리 전략이 적합할지?” 등 상황과 맥락마다 답이 달라지는 질문들이 쏟아지죠.

이 글에서는 모달 다이얼로그 예시를 통해, 아이디어에서부터 프로덕션 수준까지 개발 과정을 어떻게 밟을 수 있는지 살펴보겠습니다.

---

## 1. 가장 간단한 구현: 스파이크(Spike)

### 1) 스파이크란 무엇인가?

‘스파이크(Spike)’는 특정 문제나 기능에 대해, **가장 빠르고 단순하게 구현**해보며 가능성을 탐색하는 과정입니다.
이때는 코드를 깔끔하게 유지하거나 최적화하는 것보다는 “일단 돌아가는지(동작하는지) 테스트”하는 데 집중합니다.

### 2) 간단한 모달 예시

아래처럼 React의 useState로 열림·닫힘 상태를 관리합니다.
UI는 버튼, 백드롭(overlay), 그리고 ‘닫기(close)’ 버튼 정도로만 구성해 화면 중앙에 나타나게끔 합니다.

```jsx
import React, { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click me</button>
      {isOpen && (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)} />
          <div className="dialog">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </>
      )}
    </>
  );
}
```

- 백드롭은 position: fixed로 전체 화면을 덮고, 배경색에 살짝 투명도를 주어 클릭 시 모달을 닫습니다.
- 모달(dialog) 역시 position: fixed, transform: translate(-50%, -50%) 등을 이용해 화면 중앙에 배치합니다.

이 단계에서는 “동작”에 초점을 맞추기 때문에, **정교한 디자인**이나 **접근성**은 일단 뒤로 미뤄둡니다.

## 2. 요구 사항 분석 및 코드 구조화하기

스파이크로 동작하는 모달을 만들었다면, 이제 다음과 같은 질문을 스스로에게 던져야 합니다.

1. 이 모달은 **어떤 프로젝트**의 어떤 문맥에서 쓰이는가?
   - 예: 프로토타입, 대규모 상용 서비스, 오픈소스 라이브러리, 사내 디자인 시스템 등
2. **접근성(Accessibility)** 이나 **브라우저 호환성, 디자인 준수, 성능 요구 사항** 등은 어느 정도인가?
3. **상태 관리**: 모달을 열고 닫는 로직은 어디에서 관리해야 하는가?
4. **외부 라이브러리** 사용에 대한 제약이나 정책은 있는가? (예: 조직의 내부 라이브러리만 사용, Open Source 라이선스 이슈 등)

가령, 프로토타입이라면 지금처럼 간단한 구현만으로도 충분합니다.
그러나 **대규모 상용 서비스**라면 재사용성을 위해 컴포넌트를 구조화하고, 테스트와 문서화를 꼼꼼히 챙겨야 합니다.

<br />

예시 시나리오를 들어봅시다.

> “현재 유지·보수 중인 대규모 상용 웹사이트의 디자인을 새로 만들고 있으며, 모달을 여러 화면에서 공통적으로 사용해야 한다. 사용자층이 다양해 키보드와 보조기기 접근성도 중요하며, 프로젝트에서 불필요한 의존성을 최소화하고 싶다.”

이런 상황이라면, 다음 단계를 고려하게 됩니다.

## 3. 모달 컴포넌트 확장하기

### 1) 모달 코드 분리

스파이크 단계에서 작성한 모달 코드를 ModalDialog라는 컴포넌트로 분리합니다. 이제 재사용성과 가독성을 확보할 수 있습니다.

```jsx
function BaseModalDialog({ onClose, children }) {
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="dialog">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </>
  );
}
```

- onClose 콜백으로 부모 컴포넌트에 닫기 동작을 알립니다.
- children에는 모달 내부에 표시할 콘텐츠를 주입합니다.

### 2) 헤더, 푸터, 콘텐츠 분리

디자인 요구사항에 따라 모달에는 헤더(header), 푸터(footer), 메인 콘텐츠(content)가 정해진 스타일과 위치를 가져야 할 수 있습니다.
이를 염두에 두고 각각을 별도 컴포넌트로 분리해 놓으면, 변경과 확장이 유연해집니다.

```jsx
export function DialogHeader({ children }) {
  return <div className="header">{children}</div>;
}

export function DialogContent({ children }) {
  return <div className="content">{children}</div>;
}

export function DialogFooter({ children }) {
  return <div className="footer">{children}</div>;
}
```

<br />

부모 컴포넌트에서 각 영역을 조합해 사용할 수 있습니다.

```jsx
<ModalDialog>
  <DialogHeader>제목</DialogHeader>
  <DialogContent>내용</DialogContent>
  <DialogFooter>버튼 또는 기타 UI 요소</DialogFooter>
</ModalDialog>
```

이처럼 컴포넌트를 분리하면 반복되는 레이아웃이나 스타일을 한 번에 관리할 수 있어 **디자인 일관성**을 지키기 쉬워집니다.

## 4. 성능 최적화와 상태 관리 전략

### 1) 과도한 리렌더링 문제

아래와 같은 코드를 보면, Page 컴포넌트는 isOpen이라는 상태를 갖고 모달을 조건부 렌더링합니다.

```jsx
function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click me</button>
      {isOpen && <ModalDialog onClose={() => setIsOpen(false)} />}
    </>
  );
}
```

이 구조는 작은 프로젝트에서는 괜찮지만, **대규모 앱**이라면 isOpen 값이 변할 때마다 Page 전체가 리렌더링되어 성능에 영향을 줄 수 있습니다.

### 2) Uncontrolled Component 패턴

이를 개선하기 위해, 모달 내부에서 열림·닫힘 상태를 자체적으로 관리하게 할 수 있습니다(‘Uncontrolled’ 방식).

```jsx
function ModalDialog({ trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모달 열기 트리거 */}
      <span onClick={() => setIsOpen(!isOpen)}>{trigger}</span>

      {isOpen && (
        <BaseModalDialog onClose={() => setIsOpen(false)}>{/* 모달 콘텐츠 */}</BaseModalDialog>
      )}
    </>
  );
}
```

- trigger 프롭에 모달 열기 버튼(또는 기타 UI)을 넘겨받습니다.
- 모달 안에서 자체적으로 isOpen을 관리하므로, **상위 컴포넌트의 리렌더링 부담**을 낮출 수 있습니다.

## 5. 접근성과 포털(Portal) 문제 해결

### 1) Portal 사용

모달이 화면 맨 위에 뜨도록 하려면, 부모 요소의 z-index나 레이아웃에 간섭받지 않도록 **React Portal**을 사용하는 것이 일반적입니다. 예를 들어 createPortal을 이용해 최상위 DOM 노드에 모달을 마운트하면, **겹침 순서** 문제를 간단히 해결할 수 있습니다.

### 2) 접근성(Accessibility) 강화

모달을 제대로 구현하려면 다음을 모두 고려해야 합니다.

1. **포커스 이동**: 열렸을 때 포커스가 모달 내부로 이동해야 함.
2. **포커스 트랩**: 모달이 열려 있는 동안 페이지의 다른 요소에 포커스가 가지 않도록 해야 함.
3. **ESC 키로 닫기**: 접근성 표준에 따르면 ESC 키로 모달을 닫을 수 있어야 함.
4. **스크린 리더 지원**: aria-modal, aria-labelledby, role="dialog" 같은 속성이 필요할 수 있음.

이러한 기능을 **직접 구현**하려면 꽤 많은 로직과 처리가 필요합니다.
그래서 보통 **Radix UI나 React Aria**처럼 접근성 로직을 이미 포함하고 있는 “Headless UI” 라이브러리를 사용하는 것이 실무에서 더 효율적입니다.

## 6. 추가 개선 사항

### 1) 애니메이션

모달이 열리고 닫힐 때 시각적인 트랜지션이 있으면 사용자 경험이 좋아집니다. React Transition Group, Framer Motion, 혹은 CSS 애니메이션 등을 적용해볼 수 있습니다.

### 2) 반응형 디자인

모바일 환경에서 모달은 전체 화면을 덮을지, 슬라이드 형태로 나타날지 등 다양한 UX 요구사항이 있을 수 있습니다. max-width, max-height를 적절히 설정하고, 모바일 레이아웃을 따로 고려해야 합니다.

### 3) 테스트 코드 작성

- **단위 테스트**: 모달이 열리고 닫히는 로직, 트리거 동작, 접근성 속성 등이 잘 동작하는지 확인합니다.
- **E2E 테스트**: 실제 UI 흐름에서 모달을 열고 폼을 작성하거나 버튼을 누르는 과정을 자동화해 시나리오 테스트를 진행합니다.

### 4) 디자인 시스템과 연동

규모가 큰 조직이라면 ‘디자인 시스템’이 있으며, 모달 레이아웃과 색상, 공간 배분, 버튼 스타일 등이 가이드라인에 맞춰져야 합니다. 별도의 DialogHeader, DialogContent, DialogFooter를 활용해 재사용 가능하고 일관된 스타일을 유지해야 합니다.

## 7. 개발 과정을 정리하며

새 기능을 개발할 때, 저는 보통 다음 단계를 반복합니다.

1. **스파이크**(간단 구현)
2. **요구 사항 분석**
3. **구현**
4. **성능 최적화**
5. **기능 완성**
6. **(필요하다면) 추가 개선**

<br />

- **스파이크 단계**에서는 “일단 빠르게 해보면서 문제를 파악”합니다.
- **요구 사항 분석**으로 프로젝트 특성(프로토타입인지, 대규모 상용 서비스인지 등)을 파악해 설계 방향을 결정합니다.
- **구현 및 최적화** 단계를 거쳐 프로덕션 수준의 컴포넌트를 완성한 후, 추가 개선을 통해 더 나은 사용자 경험과 유지보수성을 확보합니다.

---

## 결론

React 컴포넌트 자체보다, **상태 관리·접근성·퍼포먼스·디자인 일관성** 같은 종합적인 고려 사항이 훨씬 어렵고 중요합니다.
특히 모달같이 간단해 보이는 컴포넌트도, 실제로는 다양한 요구사항을 처리해야 하는 **복합적인 기능**입니다.

React에서 ‘가장 어려운 것’은 사실 React 자체가 아니라, **설계와 의사결정**에 있습니다.
다이얼로그 예시 하나만 보아도, 컴포넌트 구조, 상태 관리, 접근성, 라이브러리 선택, 디자인 요구사항 등 종합적인 고민이 뒤따릅니다.
이 글이 여러분이 비슷한 상황에 닥쳤을 때, 체계적이고 구체적인 의사결정을 하는 데 조금이나마 도움이 되길 바랍니다.

---

> 참고: [Existential React questions and a perfect Modal Dialog](https://www.developerway.com/posts/hard-react-questions-and-modal-dialog)

```toc

```
