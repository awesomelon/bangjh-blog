---
title: 기능 분할 설계(Feature-Sliced Design, FSD)
date: '2024-09-14 16:26:00'
author: j-ho
tags: FSD FRONTEND
categories: FRONTEND
---

# 소개

기능 분할 설계 (Feature-Sliced Design, FSD)는 대규모 프론트엔드 애플리케이션을 구조화하기 위한 현대적인 아키텍처 방법론입니다.
FSD는 애플리케이션을 기능 단위로 분할하고, 각 기능을 독립적으로 개발, 테스트, 유지보수할 수 있도록 하는 것을 목표로 합니다.

<br />

# FSD의 핵심 원칙

FSD는 다음과 같은 핵심 원칙을 기반으로 합니다.

1. **기능 중심 설계**: 애플리케이션을 비즈니스 기능 단위로 구성합니다.
2. **계층화**: 코드를 여러 계층으로 구분하여 관심사를 분리합니다.
3. **단방향 의존성**: 상위 계층은 하위 계층에만 의존할 수 있습니다.
4. **명시적 공개 인터페이스**: 각 모듈은 명확한 공개 API를 통해 상호작용합니다.
5. **구성 가능성**: 작은 단위의 기능을 조합하여 더 큰 기능을 만들 수 있습니다.

<br />

# FSD의 주요 구성 요소

![image1](image1.png)

<br >

## 레이어 (Layers)

레이어는 FSD의 가장 상위 수준의 구조입니다. 각 레이어는 특정한 책임을 가지며, 애플리케이션의 복잡성을 관리하는 데 도움을 줍니다.

![image3](image3.jpg)

<br >

**표준 FSD 레이어 구조**

- **app**: 애플리케이션 초기화 및 글로벌 설정
- **processes**: 복잡한 비즈니스 프로세스 관리 (선택적)
- **pages**: 라우팅 가능한 화면 정의
- **widgets**: 재사용 가능한 UI 블록
- **features**: 사용자 시나리오와 비즈니스 로직
- **entities**: 도메인 객체와 관련 로직
- **shared**: 공유 유틸리티 및 UI 키트

### app 레이어

- 애플리케이션의 진입점
- 전역 상태 관리, 라우팅 설정, 전역 스타일 정의
- 예: `src/app/index.tsx`, `src/app/store.ts`, `src/app/routes.ts`

### processes 레이어 (선택적)

- 여러 페이지나 기능에 걸친 복잡한 비즈니스 프로세스 관리
- 예: 다단계 체크아웃 프로세스, 사용자 온보딩 흐름

### pages 레이어

- 각 라우트에 해당하는 페이지 컴포넌트 정의
- 하위 위젯과 기능을 조합하여 전체 페이지 구성
- 예: `src/pages/HomePage.tsx`, `src/pages/ProfilePage.tsx`

### widgets 레이어

- 독립적인 UI 블록으로, 여러 기능을 조합할 수 있음
- 페이지 레이아웃의 주요 부분을 구성
- 예: `src/widgets/Header`, `src/widgets/Sidebar`, `src/widgets/ProductList`

### features 레이어

- 사용자가 수행할 수 있는 작업 또는 시나리오
- UI 요소와 관련 비즈니스 로직을 포함
- 예: `src/features/auth/LoginForm`, `src/features/cart/AddToCartButton`

### shared 레이어

- 프로젝트 전반에서 사용되는 공통 유틸리티 및 UI 컴포넌트
- 비즈니스 로직과 무관한 재사용 가능한 코드
- 예: `src/shared/ui/Button`, `src/shared/lib/api`, `src/shared/config`

<br >

![image4](image4.png)

각 레이어는 하위 레이어에만 의존할 수 있어, 단방향 데이터 흐름을 보장합니다.

<br >

## 슬라이스 (Slices)

슬라이스는 각 레이어 내에서 특정 기능 영역이나 도메인을 나타내는 하위 디렉토리입니다.

### 슬라이스의 특징

- 특정 비즈니스 도메인이나 기능을 캡슐화
- 독립적으로 개발 및 테스트 가능
- 다른 슬라이스와의 의존성을 명시적으로 관리

### 예시

```markdown
src/
features/
auth/ // 인증 관련 슬라이스
product-catalog/ // 상품 목록 관련 슬라이스
shopping-cart/ // 장바구니 관련 슬라이스
entities/
user/ // 사용자 엔티티 슬라이스
product/ // 상품 엔티티 슬라이스
```

<br />

## 세그먼트 (Segments)

세그먼트는 슬라이스 내부의 코드를 목적에 따라 더 세분화한 것입니다.

### 주요 세그먼트

- **ui**: UI 컴포넌트
- **model**: 비즈니스 로직 (상태 관리, 액션, 셀렉터 등)
- **api**: 외부 서비스와의 통신
- **lib**: 유틸리티 함수
- **config**: 설정 및 상수

### 예시

```markdown
features/
auth/
ui/
LoginForm.tsx
RegisterForm.tsx
model/
authSlice.ts
authSelectors.ts
api/
authApi.ts
lib/
passwordValidation.ts
config/
authConstants.ts
```

## Public API

Public API는 각 슬라이스나 세그먼트가 외부에 노출하는 인터페이스입니다.

### 역할

- 내부 구현을 캡슐화
- 외부와의 상호작용 지점을 명확히 정의
- 모듈 간 의존성을 관리

### 구현 방법

- 각 슬라이스나 세그먼트의 루트에 `index.ts` 파일을 생성
- 외부에서 사용할 항목만 명시적으로 `export`

```typescript
// features/auth/index.ts

export { LoginForm } from './ui/LoginForm';
export { RegisterForm } from './ui/RegisterForm';
export { login, logout } from './model/authSlice';
export { selectUser } from './model/authSelectors';
export { fetchUser } from './api/authApi';
```

<br >

# FSD 실제 적용

## 프로젝트 구조 예시

```markdown
src/
app/
index.tsx
store.ts
routes.ts
processes/
checkout/
pages/
HomePage/
ProductPage/
CartPage/
widgets/
Header/
Footer/
ProductList/
features/
auth/
product-search/
add-to-cart/
entities/
user/
product/
shared/
ui/
lib/
config/
```

<br />

## 컴포넌트 구성 예시

```typescript
// pages/HomePage/index.tsx
import { Header } from 'widgets/Header';
import { ProductList } from 'widgets/ProductList';
import { Footer } from 'widgets/Footer';
import { ProductSearch } from 'features/product-search';

export const HomePage = () => (
  <>
    <Header />
    <main>
      <ProductSearch />
      <ProductList />
    </main>
    <Footer />
  </>
);
```

<br />

## 상태 관리 통합

FSD는 특정 상태 관리 라이브러리에 종속되지 않지만, 일반적으로 Redux나 MobX와 같은 라이브러리와 잘 통합됩니다.

### 예시 (Redux)

```typescript
// entities/product/model/productSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    /* ... */
  },
  reducers: {
    /* ... */
  },
});

export const { actions, reducer } = productSlice;
```

```typescript
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { reducer as productReducer } from 'entities/product';

export const store = configureStore({
  reducer: {
    product: productReducer,
    // other reducers...
  },
});
```

<br />

# FSD 장점

1. **모듈성**: 기능 단위로 코드를 구성하여 재사용성과 유지보수성 향상
2. **확장성**: 새로운 기능 추가나 기존 기능 수정이 용이
3. **테스트 용이성**: 각 슬라이스와 세그먼트를 독립적으로 테스트 가능
4. **팀 협업**: 기능 단위로 작업을 분배하여 병렬 개발 가능
5. **코드 네비게이션**: 일관된 구조로 코드 탐색이 쉬움
6. **의존성 관리**: 명시적인 의존성으로 코드의 예측 가능성 향상

<br />

# FSD 적용 시 고려 사항

1. **학습 곡선**: 팀 전체가 FSD 개념을 이해하고 동의해야 함
2. **오버엔지니어링 주의**: 작은 프로젝트에서는 복잡도가 증가할 수 있음
3. **일관성 유지**: 프로젝트 전반에 걸쳐 FSD 규칙을 일관되게 적용해야 함
4. **리팩토링 비용**: 기존 프로젝트를 FSD로 전환하는 데 상당한 노력이 필요할 수 있음

<br />

# 결론

FSD는 대규모 프론트엔드 프로젝트를 효과적으로 구조화하는 강력한 방법론입니다. 기능 중심의 모듈화된 접근 방식을 통해
코드의 재사용성, 유지보수성, 확장성을 크게 향상시킬 수 있습니다. 적절히 적용된다면, FSD는 복잡한 프론트엔드 애플리케이션 개발의 많은 일반적인 문제를 해결하고, 더 나은 코드 구조와 개발 경험을 제공할 것입니다.

- [공식 문서](https://feature-sliced.design)
- [예제 코드(Todo App)](https://github.com/awesomelon/fsd-todo)

---

> [참고](https://dev.to/m_midas/feature-sliced-design-the-best-frontend-architecture-4noj)

```toc

```
