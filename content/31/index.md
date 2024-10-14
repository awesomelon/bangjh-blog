---
emoji: ☀️
title: 함수형 프로그래밍 (Functional Programming)
date: '2024-08-01 14:58:00'
author: Bangjh
tags: FP Functional Programming
categories: WIKI
---

## 소개

함수형 프로그래밍(Functional Programming, FP)은 순수 함수를 조합하고, 공유 상태, 변경 가능한 데이터, 부작용을 피하여 소프트웨어를 구축하는 프로그래밍 패러다임입니다. 이는 명령형 프로그래밍과는 대조적인 **선언적 프로그래밍** 스타일로, 코드가 "어떻게" 동작하는지보다 "무엇을" 하는지를 강조합니다.

## 개요

함수형 프로그래밍은 1930년대 람다 계산법(Lambda Calculus)에 근간을 두고 있으며, 1950년대에 개발된 Lisp 언어를 통해 처음으로 실용화되었습니다. 이 패러다임은 **수학적 함수**의 개념을 중심으로 프로그래밍을 구성하며, 상태 변경과 데이터 변경을 피하는 것을 강조합니다.

<br />

## 핵심 개념

### 1. 순수 함수

순수 함수는 다음 특성을 가진 함수를 말합니다:

- **같은 입력에 대해 항상 같은 출력**을 반환합니다.
- **부작용**(side effects)이 없습니다. 즉, 함수 외부의 상태를 변경하지 않습니다.

예시 (JavaScript):

```javascript
// 순수 함수
const add = (a, b) => a + b;

// 비순수 함수
let total = 0;
const addToTotal = (value) => {
  total += value; // 외부 상태 변경
  return total;
};
```

### 2. 불변성

불변성은 생성된 후에 상태를 변경할 수 없는 객체의 특성을 말합니다. 함수형 프로그래밍에서는 데이터 변경 대신 **새로운 데이터 구조**를 생성합니다.

예시 (Python):

```python
# 불변성을 지키는 방식
def add_to_list(lst, item):
    return lst + [item]  # 새로운 리스트 반환

original = [1, 2, 3]
new_list = add_to_list(original, 4)
print(original)  # [1, 2, 3]
print(new_list)  # [1, 2, 3, 4]
```

### 3. 고차 함수

고차 함수는 다음 중 하나 이상의 특징을 가진 함수입니다:

- **하나 이상의 함수를 인자로 받습니다**.
- **함수를 결과로 반환**합니다.

예시 (JavaScript):

```javascript
// 함수를 반환하는 고차 함수
const multiply = (factor) => (number) => number * factor;

const double = multiply(2);
console.log(double(5));  // 10

// 함수를 인자로 받는 고차 함수
const applyOperation = (func, a, b) => func(a, b);
const add = (a, b) => a + b;
console.log(applyOperation(add, 5, 3));  // 8
```

### 4. 재귀

**재귀**는 함수가 자기 자신을 호출하는 프로그래밍 기법입니다. 함수형 프로그래밍에서는 **루프 대신 재귀**를 사용하여 반복적인 작업을 수행합니다.

예시 (Python):

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 120
```

### 5. 게으른 평가

**게으른 평가**는 계산의 결과값이 필요할 때까지 계산을 미루는 동작 방식입니다. 이를 통해 **무한한 데이터 구조**를 다룰 수 있고, 불필요한 계산을 피할 수 있습니다.

예시 (Python - generator):

```python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

gen = infinite_sequence()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2
```

<br />

## 장점

1. **코드의 간결성과 가독성 향상**: 선언적 코드 스타일로 인해 코드가 직관적이고 이해하기 쉬워집니다.
2. **테스트와 디버깅의 용이성**: 부작용이 없고 상태 변경이 없으므로 함수 단위 테스트가 용이합니다.
3. **병렬 프로그래밍 지원**: 상태 변경이 없으므로 여러 작업을 병렬로 수행하기가 쉽습니다.
4. **부작용 최소화로 인한 예측 가능성 증가**: 상태를 변경하지 않으므로 코드의 실행 결과를 쉽게 예측할 수 있습니다.

## 단점

1. **학습 곡선이 높을 수 있음**: 함수형 프로그래밍의 개념(예: 모나드, 커링 등)은 초기 학습이 어려울 수 있습니다.
2. **성능 저하 가능성**: 불변 데이터 구조 사용으로 인해 메모리 사용량이 증가하여 성능이 저하될 수 있습니다.
3. **기존 명령형 또는 객체지향 시스템과의 통합 어려움**: 함수형 코드와 기존 코드의 통합에 어려움이 있을 수 있습니다.

<br />

## 주요 함수형 프로그래밍 언어

- **Haskell**
- **Erlang**
- **Clojure**
- **F#**
- **Scala**
- **OCaml**

또한, 다중 패러다임 언어들(JavaScript, Python, Ruby 등)도 함수형 프로그래밍 스타일을 지원합니다.

<br />

## 관련 개념

- **모나드 (Monad)**: 순차적인 연산을 구조화하는 데 사용되는 개념입니다.
- **커링 (Currying)**: 여러 개의 인자를 받는 함수를 하나의 인자를 받는 여러 함수로 나누는 기법입니다.
- **함수 합성 (Function Composition)**: 여러 함수를 조합하여 새로운 함수를 만드는 기법입니다.
- **패턴 매칭 (Pattern Matching)**: 주어진 데이터의 형태에 따라 다른 동작을 수행하는 기법입니다.
- **대수적 데이터 타입 (Algebraic Data Type)**: 데이터의 다양한 구조를 표현하기 위한 타입 시스템입니다.


```toc

```
