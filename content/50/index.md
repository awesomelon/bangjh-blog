---
emoji: ☀️
title: Zustand v5 주요 변경 사항
date: '2024-11-21 06:30:00'
author: Bangjh
tags: 상태관리, zustand
categories: WIKI
---

Zustand는 React 환경에서 경량 상태 관리를 지원하는 인기 있는 라이브러리입니다. 최근 업데이트된 **Zustand v5**는 성능 개선과 최신 React 환경과의 호환성을 강화하는 다양한 변경 사항을 도입했습니다. 이번 글에서는 Zustand v5의 주요 변경 사항과 함께 이전 버전에서 마이그레이션하는 방법을 다룹니다.

---

## 1. 주요 변경 사항

### 1.1 기본 내보내기 제거
이전 버전에서 지원되던 기본 내보내기(`default export`)가 제거되었습니다. 이제 Zustand는 **명시적 내보내기(`named export`)**만을 지원합니다.

```javascript
// 변경 전 (v4)
import create from "zustand";

// 변경 후 (v5)
import { create } from "zustand";
```

---

### 1.2 React 18 이상 필수
Zustand v5는 React 18 이상 버전에서만 동작합니다. 따라서 React 17 이하를 사용하는 프로젝트는 React를 업그레이드해야 합니다.

---

### 1.3 `use-sync-external-store` 의존성 추가
React 18의 기본 상태 관리 기능인 `use-sync-external-store`를 적극 활용하며, 일부 함수(`createWithEqualityFn`, `useStoreWithEqualityFn`)는 이 패키지를 필요로 합니다. 해당 기능을 사용할 경우, `use-sync-external-store`를 설치해야 합니다.

```bash
$ npm install use-sync-external-store
```

---

### 1.4 TypeScript 4.5 이상 필수
TypeScript 기반 프로젝트는 4.5 버전 이상의 TypeScript를 사용해야 합니다. 낮은 버전을 사용하는 경우 빌드 오류가 발생할 수 있습니다.

---

### 1.5 UMD/SystemJS 지원 중단
Zustand는 더 이상 UMD 및 SystemJS 형식을 지원하지 않습니다. 모듈 형식을 CommonJS 또는 ESM으로 전환해야 합니다.

---

### 1.6 `setState`의 타입 검사 강화
`setState` 함수의 `replace` 플래그에 대한 타입 검사가 강화되었습니다. `replace: true`로 설정한 경우 **전체 상태 객체**를 명시적으로 제공해야 합니다.

```javascript
// 변경 전 (v4)
useStore.setState({ key: "value" }, true);

// 변경 후 (v5)
useStore.setState({ key: "value", anotherKey: "newValue" }, true);
```

---

### 1.7 `persist` 미들웨어 동작 변경
`persist` 미들웨어는 이제 초기 상태를 자동으로 저장하지 않습니다. 따라서 스토어 생성 시 **초기 상태를 명시적으로 설정**해야 합니다.

```javascript
// 초기 상태를 명시적으로 설정
const useStore = create(
  persist(
    (set) => ({ count: 0 }),
    { name: "storage-key" }
  )
);
```

---

## 2. 마이그레이션 가이드

Zustand v4에서 v5로 마이그레이션하려면 다음 단계를 따르세요:

1. **React 및 TypeScript 업그레이드**
    - React 18 이상 및 TypeScript 4.5 이상으로 업그레이드합니다.

2. **명시적 내보내기로 변경**
    - `default export`를 모두 `named export`로 수정합니다.

3. **`use-sync-external-store` 패키지 설치**
    - `createWithEqualityFn` 등의 함수 사용 시, 의존성을 추가합니다.

4. **UMD 지원 제거 확인**
    - 모듈 형식을 ESM 또는 CommonJS로 전환합니다.

5. **타입 검사 강화에 따른 코드 수정**
    - `setState` 함수의 `replace` 플래그 사용 시 전체 상태를 명시적으로 제공합니다.

6. **`persist` 미들웨어 초기 상태 설정**
    - `persist`를 사용할 경우, 스토어 생성 시 초기 상태를 명확히 설정합니다.

---

## 3. Zustand v5의 개선점

Zustand v5는 현대적인 React 환경과의 통합성을 높이기 위해 여러 개선을 도입했습니다. 성능 최적화와 코드의 명확성을 제공하며, 타입 안정성을 강화해 개발자 경험을 향상시켰습니다.

---

## 4. 결론

Zustand v5는 React와 TypeScript 생태계의 최신 요구 사항에 부응하며, 더욱 강력한 기능과 개선된 안정성을 제공합니다. 이전 버전에서 마이그레이션하는 데 시간이 소요될 수 있지만, 장기적인 유지 보수를 고려할 때 업그레이드는 필수적입니다.

마이그레이션에 대한 더 자세한 정보는 [Zustand 공식 문서](https://zustand.docs.pmnd.rs/migrations/migrating-to-v5)를 참고하세요.

```toc

```
