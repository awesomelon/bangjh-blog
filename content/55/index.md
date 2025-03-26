---
title: React에서 발생하는 Abstraction Leak, 어떻게 해결할까?
date: '2024-12-31 18:49:34'
author: j-ho
tags: React, AbstractionLeak, 의존성
categories: WIKI
---

React 애플리케이션을 개발하다 보면, useState의 setter 함수를 자식 컴포넌트에 직접 내려주어 데이터를 업데이트하는 패턴을 흔히 볼 수 있습니다.
처음에는 간단해 보이지만, 코드가 복잡해지고 상태 구조가 변동될 때 abstraction leak(추상화 누수)이 발생할 위험이 큽니다.
이 글에서는 abstraction leak이 무엇인지, 왜 문제가 되며, 어떻게 해결할 수 있는지 알아보겠습니다.

> **Tip**: 혹시 TypeScript 프로젝트에서 React.Dispatch<React.SetStateAction가 포함된 부분을 찾으셨나요? 이 글을 읽고 나면, 그 코드를 조금 더 추상화하여 자식 컴포넌트의 의존성을 줄일 수 있을 것입니다.

---

## 1. Abstraction Leak이란?

**Abstraction Leak**이란 특정 컴포넌트(또는 모듈)의 구현 세부사항이 외부로 노출되어, 원래 몰라도 될 내부 구조까지 다른 컴포넌트가 알아야 하는 상황을 말합니다.
React에서 흔히 볼 수 있는 예시로, 부모 컴포넌트가 useState로 관리하는 상태와 그 setter 함수를 자식 컴포넌트에 직접 전달하는 코드를 들 수 있습니다.

<br />

**예시 코드**

```jsx
// Form.jsx
function Form() {
  const [formData, setFormData] = useState({ name: '' });

  return (
    <div>
      <h1>Form</h1>
      <Input name={formData.name} setFormData={setFormData} />
      <button onClick={() => console.log(formData)}>Submit</button>
    </div>
  );
}

// Input.jsx
function Input({ name, setFormData }) {
  const handleInputChange = (event) => {
    setFormData((prevData) => ({ ...prevData, name: event.target.value }));
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={handleInputChange} />
      </label>
    </div>
  );
}
```

위 코드는 작동에 문제는 없지만, Input 컴포넌트가 **부모의 상태 구조, 그리고 useState를 사용**한다는 사실을 전제하고 있습니다.
자식 입장에서 **부모의 구현 세부사항**을 알아야만 동작 가능한 상황이므로, 추상화가 누수되고 있는 셈입니다.

## 2. 왜 문제가 되는가?

**1. 유지보수의 어려움**

부모가 useState에서 useReducer로 전환하거나 다른 상태 관리 로직을 사용하면, 자식도 그에 맞춰 코드를 수정해야 합니다.

**2. 재사용성 저하**

자식 컴포넌트가 특정 부모 구조에 종속되면, 독립적으로 재사용하거나 다른 프로젝트에서 활용하기가 어렵습니다.

**3. 가독성 저하**

자식이 **“무엇을, 어떻게”** 변경하는지가 명확하지 않습니다. setFormData 자체가 노출되어 있으면, 자식이 부모의 내부 구조를 모두 이해한 상태로 코드를 작성해야 하기 때문입니다.

## 3. 더 복잡한 상황: useState에서 useReducer로 전환

상태 로직이 더욱 복잡해져서 useReducer를 도입하는 경우, 다음과 같은 형태로 코드가 바뀔 수 있습니다.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
    case 'setError':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function Form() {
  const [formData, dispatch] = useReducer(reducer, { name: '', error: null });

  return (
    <div>
      <h1>Form</h1>
      {/* 기존에는 setFormData를 넘겼는데... 이제는 dispatch? */}
      <Input name={formData.name} setFormData={setFormData} />
      <button onClick={() => console.log(formData)}>Submit</button>
    </div>
  );
}
```

이 상태에서 Input 컴포넌트가 계속 setFormData를 쓰도록 유지하면 작동이 맞지 않게 되고, dispatch를 직접 받아 액션을 호출하도록 바꿔야 할 수도 있습니다.
즉, 자식이 부모가 내부적으로 어떤 방식(useState, useReducer, Redux 등)으로 상태를 변경하는지까지 알아야만 계속 동작할 수 있어, 결합도가 점점 높아집니다.

## 4. 해결 방법: 콜백 함수로 추상화하기

**핵심 아이디어**는 자식 컴포넌트가 “부모의 내부 구현 방식”을 전혀 몰라도 되도록, **콜백 함수를 통해 의도를 추상화**하는 것입니다.
예를 들어, “이름이 변경되었다”는 사실만 자식이 알리고, 실제로 어떻게 상태를 바꾸는지는 부모가 책임지도록 합니다.

<br />

**예시 코드**

```jsx
// Form.jsx
function Form() {
  const [formData, setFormData] = useState({ name: '' });

  const handleNameChange = (newName) => {
    setFormData((prevData) => ({ ...prevData, name: newName }));
  };

  return (
    <div>
      <h1>Form</h1>
      <Input name={formData.name} onChange={handleNameChange} />
      <button onClick={() => console.log(formData)}>Submit</button>
    </div>
  );
}

// Input.jsx
function Input({ name, onChange }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={handleInputChange} />
      </label>
    </div>
  );
}
```

이런 식으로 작성하면, Input은 단지 “이름을 변경”한다는 사실만 알립니다.
실제로 상태가 어떻게 업데이트되는지, 예를 들어 useState를 쓰든, useReducer로 액션을 호출하든 그 상세 로직은 Form 컴포넌트가 전적으로 관장합니다.
이 방식으로 부모와 자식 컴포넌트 사이의 결합도가 낮아지며, 추상화가 제대로 이루어집니다.

## 5. 결론

정리하자면, useState의 **setter 함수를 그대로 자식에 전달하는 패턴**은 초기에 간단해 보이지만, 프로젝트가 복잡해질 때 **abstraction leak** 문제를 유발합니다.
자식은 부모의 상태 구조와 변경 방식에 대해 몰라도 되도록, **콜백 함수를 통해 의도를 추상화**하여 전달하는 것이 좋습니다.

<br />

이 방법은 다음과 같은 장점을 갖습니다:

- **부모 로직 변경에도 자식 코드를 최소한으로 수정**하게 됨
- **컴포넌트 간 결합도가 낮아져 재사용성, 유지보수성 향상**
- “자식은 사용 의도만, 부모는 구현 로직만” 분리할 수 있어 **가독성** 개선

## 6. 추가로 생각해볼 만한 주제

**1. 컴포넌트 추상화 수준**

- 어느 범위까지 부모가 상태를 책임져야 할까?
- 관리 라이브러리를 도입하면 abstraction leak을 얼마나 줄일 수 있을까?

**2. 관리의 책임 분배**

- 자식이 자체 상태를 가지는 방식과 부모가 모든 상태를 관리하는 방식은 각각 어떤 장단점이 있을까?
- Form 컴포넌트에서 오류 처리나 유효성 검증을 포함해 더 복잡한 로직이 생기면, 어떻게 역할을 분배해야 할까?

**3. 가능한 설계**

- 프로젝트가 대규모로 확장될 때 콜백 함수를 통한 방식만으로 충분할까?
- 상태 관리 시, abstraction leak을 줄이기 위한 디자인 패턴(예: Flux, MVC, MVVM 등)은 어떤 것들이 있을까?

---

> 참고: [React Anti-Pattern](https://matanbobi.dev/posts/stop-passing-setter-functions-to-components)

```toc

```
