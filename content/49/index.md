---
emoji: ☀️
title: navigator.onLine을 활용한 네트워크 상태 관리
date: '2024-11-18 14:17:00'
author: Bangjh
tags: navigator.onLine, 네트워크 상태, 오프라인 모드, 온라인 모드
categories: WIKI
---

웹 애플리케이션을 개발하다 보면 사용자의 네트워크 상태에 따라 기능을 다르게 동작시켜야 하는 경우가 자주 있습니다. 
예를 들어 사용자가 오프라인 상태일 때는 데이터를 로컬에 저장하고, 다시 온라인 상태로 전환되면 서버와 동기화해야 할 수 있습니다. 
이러한 기능은 특히 모바일 앱이나 네트워크가 불안정한 환경에서 웹 애플리케이션을 사용하는 사용자에게 매우 유용합니다. 
React에서는 JavaScript의 `navigator.onLine` 속성을 활용하여 이러한 네트워크 상태를 쉽게 감지하고 처리할 수 있습니다.

## `navigator.onLine`이란?

`navigator.onLine`은 브라우저의 `Navigator` 객체에 속한 속성으로, 현재 브라우저가 온라인 상태인지 오프라인 상태인지를 나타냅니다. 이 속성은 간단하게 네트워크 연결 여부를 확인할 수 있게 해줍니다. 이를 통해 네트워크 상태에 따른 로직을 작성할 수 있으며, 오프라인에서 온라인으로 전환될 때 자동으로 데이터를 서버와 동기화하거나 사용자에게 적절한 메시지를 표시할 수 있습니다.

- `true`: 네트워크에 연결된 상태
- `false`: 네트워크에 연결되지 않은 상태

```javascript
if (navigator.onLine) {
  console.log('온라인 상태입니다.');
} else {
  console.log('오프라인 상태입니다.');
}
```

이처럼 단순히 네트워크 연결 여부를 확인할 때 유용하게 사용할 수 있습니다. 그러나 이 속성만으로 모든 경우의 네트워크 상태를 확인하기에는 한계가 있습니다. 특히 네트워크 연결은 되어 있으나 인터넷에 접속할 수 없는 경우도 있을 수 있기 때문에, 추가적인 검증이 필요할 때도 있습니다.

## 네트워크 상태 변화 감지하기

React에서는 `useEffect` 훅을 사용하여 네트워크 상태 변화를 감지할 수 있습니다. 브라우저는 네트워크 상태가 변경될 때마다 `online`과 `offline` 이벤트를 발생시키므로, 이를 통해 온라인과 오프라인 상태 변화를 실시간으로 감지할 수 있습니다. 이를 통해 사용자의 네트워크 상태가 변할 때마다 즉각적으로 UI를 업데이트하거나, 특정 로직을 실행할 수 있습니다.

### React에서 네트워크 상태 관리하기

React에서는 네트워크 상태를 컴포넌트의 상태로 관리하기 위해 `useState`와 `useEffect` 훅을 사용합니다. 다음은 `navigator.onLine`과 이벤트 리스너를 이용하여 네트워크 상태를 관리하는 예시입니다.

```tsx
import React, { useState, useEffect } from 'react';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      console.log('네트워크 연결됨');
      // 온라인 상태가 되었을 때 수행할 추가 작업을 여기에 작성합니다.
    }

    function handleOffline() {
      setIsOnline(false);
      console.log('네트워크 연결 끊김');
      // 오프라인 상태가 되었을 때 수행할 추가 작업을 여기에 작성합니다.
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? '온라인 상태입니다.' : '오프라인 상태입니다.'}
    </div>
  );
}

export default App;
```

위 코드에서는 컴포넌트가 마운트될 때 `online`과 `offline` 이벤트 리스너를 등록하고, 언마운트될 때 정리(cleanup)합니다. 이렇게 함으로써 사용자의 네트워크 상태가 변경될 때마다 자동으로 상태가 업데이트됩니다. 네트워크 상태에 따라 컴포넌트의 UI를 동적으로 변경함으로써 사용자 경험을 개선할 수 있습니다.

### React 18과 Strict Mode

React 18에서는 Strict Mode에서 `useEffect`가 개발 모드에서 두 번 실행될 수 있습니다. 이는 네트워크 상태 이벤트 리스너를 등록할 때 의도치 않은 부작용을 초래할 수 있습니다. 따라서 Strict Mode 환경에서는 이중으로 이벤트 리스너가 등록되지 않도록 주의해야 합니다. 예를 들어, `useEffect` 훅에서 클린업 함수를 정확히 구현하여 두 번 등록되는 일을 방지해야 합니다.

## 실제 사용 예시: 네트워크 상태 표시하기

네트워크 상태를 사용자에게 알려주는 별도의 컴포넌트를 만들 수 있습니다. 예를 들어 사용자가 오프라인 상태일 때 화면에 알림을 표시하여 네트워크 상태를 인지시킬 수 있습니다. 이러한 기능은 사용자가 오프라인 상태일 때의 불편함을 최소화하는 데 매우 유용합니다.

```tsx
import React, { useState, useEffect } from 'react';

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  if (isOnline) {
    return null; // 온라인 상태이면 아무 것도 표시하지 않음
  }

  return (
    <div style={{ color: 'red' }}>
      현재 오프라인 상태입니다.
    </div>
  );
}

export default NetworkStatus;
```

위 컴포넌트는 네트워크 상태가 오프라인일 때만 사용자에게 빨간색 알림을 표시합니다. 이렇게 하면 사용자가 네트워크 상태를 쉽게 인지하고 문제를 해결할 수 있도록 도울 수 있습니다. 또한 네트워크 상태가 복구되었을 때 별도의 동작을 트리거할 수 있어 사용자는 자신의 데이터가 안전하게 관리되고 있다는 신뢰감을 가질 수 있습니다.

## 추가 고려 사항

### 신뢰성 이슈

`navigator.onLine`은 단순히 디바이스가 로컬 네트워크에 연결되어 있는지를 확인할 뿐, 실제로 인터넷에 접속 가능한지를 보장하지 않습니다. 예를 들어, 라우터의 문제로 인해 로컬 네트워크는 연결되어 있지만 외부 인터넷에 접속할 수 없는 경우가 발생할 수 있습니다. 또는 인터넷 서비스 제공자(ISP)의 문제로 인해 인터넷 연결 자체가 중단될 수도 있습니다. 이런 상황에서는 `navigator.onLine`이 `true`를 반환하더라도 실제로는 인터넷 사용이 불가능할 수 있습니다. 따라서 중요한 비즈니스 로직을 처리할 때는 단순히 `navigator.onLine`에 의존하지 않고, 인터넷 연결의 신뢰성을 보장하기 위한 추가적인 검증 절차를 구현하는 것이 좋습니다. 예를 들어, 특정 서버에 요청을 보내 응답을 확인하는 방식으로 실제 인터넷 연결 상태를 검사할 수 있습니다.

### 실제 인터넷 연결 확인하기

네트워크 상태가 중요한 경우, 실제 인터넷에 연결되었는지를 확인하는 추가적인 검증이 필요합니다. 예를 들어, 서버에 요청을 보내 실제 응답을 받을 수 있는지 테스트하는 방식이 있습니다. 이런 방식을 통해 네트워크 상태를 보다 정확하게 판단하고, 사용자에게 더 신뢰성 있는 정보를 제공할 수 있습니다.

```tsx
async function isInternetAvailable() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('요청이 타임아웃되었습니다');
    }
    return false;
  }
}

useEffect(() => {
  async function checkInternet() {
    const online = await isInternetAvailable();
    setIsOnline(online);
  }
  checkInternet();
}, []);
```

이 코드는 실제로 네트워크 연결이 가능한지 확인하기 위해 구글의 작은 리소스에 요청을 보내는 방법을 사용합니다. 요청에 타임아웃을 설정하여 네트워크 상태 확인 과정에서 무한 대기하지 않도록 처리하였습니다. 이를 통해 `navigator.onLine`보다 더 신뢰성 있는 네트워크 상태를 확인할 수 있습니다. 이 방법은 특히 사용자 데이터 동기화와 같이 중요한 작업을 수행할 때 유용합니다.

## 커스텀 훅으로 네트워크 상태 관리하기

React에서 네트워크 상태를 여러 컴포넌트에서 쉽게 재사용하기 위해서는 커스텀 훅을 만들어 관리하는 것이 좋습니다. 이를 통해 중복된 코드를 줄이고 네트워크 상태 관리 로직을 중앙에서 제어할 수 있습니다.

```tsx
import { useState, useEffect, useCallback } from 'react';

function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const updateNetworkStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  useEffect(() => {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, [updateNetworkStatus]);

  return isOnline;
}

export default useOnlineStatus;
```

위 커스텀 훅은 TypeScript로 작성되어 있으며, 네트워크 상태를 관리하는 로직을 간결하게 제공합니다. `useCallback`을 사용해 이벤트 핸들러를 메모이제이션하여 성능을 최적화하였습니다.

이 커스텀 훅을 사용하면 네트워크 상태 관리 로직을 여러 컴포넌트에서 간편하게 재사용할 수 있습니다.

```jsx
import React from 'react';
import useOnlineStatus from './useOnlineStatus';

function App() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {isOnline ? '온라인 상태입니다.' : '오프라인 상태입니다.'}
    </div>
  );
}

export default App;
```

이제 `useOnlineStatus` 훅을 통해 네트워크 상태를 쉽게 확인하고 UI에 반영할 수 있습니다. 이를 통해 전체 애플리케이션에서 네트워크 상태 관리를 일관되게 유지할 수 있습니다.

## 모바일 환경 및 추가 API 활용

모바일 환경에서는 네트워크 상태가 더 자주 변경될 수 있습니다. 특히 느린 3G나 2G 네트워크 환경에서 연결 품질이 문제가 될 수 있습니다. 이러한 경우 네트워크 품질에 대한 정보를 제공하는 Network Information API를 사용할 수 있습니다.

```tsx
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  console.log('네트워크 타입:', connection.effectiveType);
  console.log('다운링크 속도:', connection.downlink);
}
```

이 API는 사용자의 네트워크 연결 속도와 유형에 대한 정보를 제공하여 사용자 경험을 최적화하는 데 도움을 줄 수 있습니다. 예를 들어, 네트워크 상태에 따라 이미지나 비디오 품질을 조정하는 등 다양한 최적화 전략을 사용할 수 있습니다.

## 결론

React에서 `navigator.onLine`과 `online`/`offline` 이벤트를 활용하면 사용자의 네트워크 상태를 손쉽게 관리할 수 있습니다. 
특히, 네트워크 상태에 따라 사용자에게 적절한 정보를 제공하거나 데이터 동기화 작업을 수행함으로써 보다 나은 사용자 경험을 제공할 수 있습니다. 

다만, `navigator.onLine`이 실제 인터넷 접속 가능성을 보장하지 않는다는 점을 기억하고, 중요한 작업에서는 추가적인 네트워크 상태 확인을 병행하는 것이 좋습니다. 
이를 위해 커스텀 훅을 만들어 여러 컴포넌트에서 재사용할 수 있으며, 네트워크 상태에 따라 동작하는 다양한 로직을 통해 사용자 경험을 최적화할 수 있습니다.


```toc

```
