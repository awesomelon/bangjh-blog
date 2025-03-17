---
emoji: ☀️
title: MySQL에서 emoji 문자 저장 문제 해결하기
date: '2020-01-20 09:58:00'
author: j-ho
tags: MySQL emoji utf8 utf8mb4
categories: BACKEND
---

# MySQL에서 Emoji 문자 저장 문제 해결하기

## 문제 개요

기존 MySQL에서 한글 및 다른 언어가 깨지는 문제를 해결하려면 character set을 **utf8**로 설정해야 했습니다. 하지만 emoji 같은 특수 문자는 어떻게 처리해야 할까요?

character set이 utf8로 설정된 게시판에 emoji로 된 글을 남겨 보았습니다.

**결과는 글자가 깨져 보였습니다.**

## 문제 발생 이유

UTF-8은 1~4 Byte까지 다양한 길이의 문자를 표현할 수 있는 가변 바이트 인코딩 방식입니다. 1 Byte는 ASCII 문자, 2-4 Byte는 다양한 국제 문자를 포함합니다. 그러나 MySQL에서 사용되는 **utf8** character set은 최대 3 Byte까지의 문자만 지원합니다.

이 때문에 4 Byte로 인코딩된 emoji와 같은 문자를 저장하려고 하면 MySQL의 utf8 character set은 이를 표현할 수 없어서 데이터 손실이 발생하고, 결국 글자가 깨져 보이게 되는 것입니다.

## 해결 방법

이러한 문제를 해결하기 위해 MySQL은 새로운 character set을 도입했는데, 그것이 바로 **utf8mb4**입니다. **utf8mb4**는 4 Byte까지 표현할 수 있어 emoji와 같은 4 Byte 문자도 정상적으로 저장하고 표현할 수 있습니다.

**Tip:** utf8의 3 Byte 제한은 MySQL에만 있는 문제입니다. PostgreSQL 같은 다른 데이터베이스는 기본적으로 4 Byte까지 지원하기 때문에 이런 문제는 발생하지 않습니다. 그러나 데이터베이스 설정에 따라 추가적인 설정이 필요할 수도 있습니다.

## character set 변경하기

MySQL에서 emoji와 같은 4 Byte 문자를 저장하려면 character set을 **utf8mb4**로 변경해야 합니다. 이 과정에서 기존 데이터의 손실을 걱정할 필요는 없습니다. **utf8**에서 **utf8mb4**로 변경하는 것은 표현 가능한 Byte 수를 3 Byte에서 4 Byte로 확장하는 것이므로, 기존 데이터는 그대로 유지되면서 추가적인 문자를 지원할 수 있게 됩니다. 변경 작업을 진행하기 전에 데이터베이스를 백업하는 것을 권장합니다.

다음은 character set을 **utf8mb4**로 변경하는 간단한 SQL 명령어입니다:

```sql
ALTER TABLE your_table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

위 명령어는 테이블의 character set을 **utf8mb4**로 변경하고, 적절한 collation을 적용합니다. 이 작업은 테이블 잠금을 유발할 수 있으며, 대규모 테이블에서는 성능에 영향을 미칠 수 있으므로 주의해야 합니다.

## 결론

MySQL에서 emoji와 같은 4 Byte 문자를 저장하려면 character set을 **utf8mb4**로 변경해야 합니다. 기존 데이터의 손실은 발생하지 않으며, 추가적인 문자 표현이 가능해집니다. 하지만 emoji나 기타 4 Byte 문자를 사용할 필요가 없다면, 여전히 **utf8**을 사용하는 것이 디스크 공간 절약 및 성능 측면에서 더 효율적일 수 있습니다. 따라서 데이터베이스의 용도와 저장할 데이터의 특성을 고려하여 적절한 character set을 선택하는 것이 중요합니다.

```toc

```
