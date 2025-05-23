---
title: AI를 이용한 Git Commit 메시지 생성하기
date: '2024-08-30 14:58:00'
author: j-ho
tags: AI Git ClaudeAI
categories: PLAYGROUND
---

오늘은 제가 개발한 `commit-ai`라는 도구에 대해 소개하고자 합니다. `commit-ai`는 AI를 활용하여 Git 커밋 메시지를 자동으로 생성해주는 CLI 도구입니다. 이 도구를 통해 일관성 있고 명확한 커밋 메시지를 쉽게 작성할 수 있습니다. 이를 통해 개발자들이 불필요하게 시간을 낭비하지 않고 더 중요한 작업에 집중할 수 있게 도와줍니다.

![예제 이미지](./example.gif)

## 개발 배경

Git을 사용하는 개발자라면 누구나 경험해 봤을 것입니다. 작업을 마치고 커밋을 하려는 순간, 적절한 커밋 메시지를 작성하는 데 시간을 허비하는 경우가 많습니다. 때로는 `fixed`, `feat` 같은 모호한 메시지로 마무리 짓기도 하죠. 이런 문제를 해결하고자 AI를 이용해 자동으로 명확하고 구체적인 커밋 메시지를 생성해주는 도구를 만들게 되었습니다.

Git 커밋 메시지는 코드 변경 사항의 요약이며, 팀 간의 의사소통과 프로젝트의 유지보수성을 높이는 데 매우 중요한 역할을 합니다. 하지만 바쁜 일정이나 많은 코드 변경 후에 적절한 커밋 메시지를 작성하는 것이 쉽지 않을 때가 많습니다. `commit-ai`는 이러한 상황에서 개발자들에게 큰 도움을 줄 수 있습니다. 이 도구를 사용하면 매번 커밋 메시지를 고민하지 않아도 되고, 일관된 형식을 유지할 수 있어 코드베이스의 가독성과 협업 효율을 높일 수 있습니다.

## 주요 기능

1. **AI를 활용한 다중 커밋 메시지 제안**: Anthropic의 Claude 3.5 모델을 이용해 고품질의 커밋 메시지를 생성합니다. AI의 힘을 빌려 사용자에게 여러 가지 선택지를 제공하고, 그중 가장 적합한 메시지를 선택할 수 있도록 돕습니다.
2. **Git 커밋 템플릿 지원**: 커밋 메시지를 일관되게 유지하기 위해 커밋 템플릿을 지원합니다. 이 기능을 통해 팀 내에서 합의된 포맷으로 메시지를 작성할 수 있습니다.
3. **커스터마이즈 가능한 메시지 생성 옵션**: 최대 토큰 수, 온도 설정 등 다양한 생성 옵션을 제공합니다. 이를 통해 사용자는 AI가 생성하는 메시지의 스타일과 깊이를 조절할 수 있습니다.
4. **사용하기 쉬운 CLI**: 명령줄에서 간편하게 커밋 메시지를 생성하고 선택할 수 있습니다. 직관적인 인터페이스 덕분에 사용자는 복잡한 설정 없이 바로 도구를 활용할 수 있습니다.
5. **대화형 커밋 메시지 선택**: 화살표 키를 이용해 생성된 커밋 메시지 중 원하는 메시지를 선택할 수 있습니다. 사용자는 여러 제안 중에서 가장 적절한 메시지를 선택할 수 있으며, 필요하다면 바로 편집도 가능합니다.
6. **대용량 파일 및 특정 파일 유형 제외**: 잠금 파일이나 대용량 파일은 자동으로 제외하여 AI 모델의 효율성을 높였습니다. 이를 통해 AI가 효율적으로 커밋 메시지를 생성할 수 있도록 불필요한 정보를 제거합니다.

## 구현 과정

### 1. 프로젝트 구조 설계

프로젝트를 구조화하면서 각 기능을 모듈화하여 유지보수성과 확장성을 높이고자 했습니다. 주요 파일 구성은 다음과 같습니다:

- **`cli.ts`**: 명령줄 인터페이스 구현. 사용자가 CLI에서 명령을 내릴 때 이 파일에서 입력을 처리하고, 결과를 출력합니다.
- **`GitCommitMessageGenerator.ts`**: 커밋 메시지 생성 로직 담당. AI를 호출하고 결과를 파싱하여 사용자에게 제공하는 핵심 기능을 수행합니다.
- **`commitMessageTemplate.ts`**: 다국어 지원을 위한 커밋 메시지 템플릿 제공. 다양한 언어로 커밋 메시지를 작성할 수 있도록 지원하여 국제화된 팀에서도 유용하게 사용할 수 있습니다.

### 2. 주요 기술 스택

- `@anthropic-ai/sdk`: Anthropic AI API와의 상호작용을 위한 SDK로, AI 모델을 사용하여 커밋 메시지를 생성합니다.
- `@inquirer/prompts`: 대화형 명령줄 사용자 인터페이스 구현을 위한 라이브러리로, 사용자에게 선택지를 제공하고 인터랙티브한 입력을 받습니다.
- `commander`: CLI 도구 구축을 위한 라이브러리로, 다양한 명령줄 옵션을 정의하고 처리하는 데 사용됩니다.
- `configstore`: 사용자 설정 데이터를 쉽게 저장하고 관리할 수 있도록 돕는 라이브러리입니다.
- `ora`: 로딩 스피너를 통해 시각적인 피드백을 제공하여, 사용자가 기다리는 동안에도 프로세스의 진행 상태를 알 수 있도록 돕습니다.

### 3. 커밋 메시지 생성 로직

커밋 메시지 생성을 담당하는 **`GitCommitMessageGenerator`** 클래스는 다음과 같은 로직을 포함하고 있습니다:

- **Git Diff 분석**: 현재 Git 저장소의 스테이징된 변경 사항을 분석합니다. 이 단계에서는 Git 명령어를 사용해 변경된 파일 목록과 그 내용을 가져옵니다.
- **AI 호출**: Claude API를 호출하여 변경 사항에 기반한 커밋 메시지를 생성합니다. AI 모델은 코드 변경 사항을 분석하고, 변경의 목적과 내용을 명확하게 요약해 줍니다.
- **응답 파싱**: AI가 생성한 커밋 메시지를 JSON 형식으로 파싱하여 사용자에게 제공합니다. 사용자는 이 메시지를 바로 사용할 수 있으며, 필요 시 수정도 가능합니다.

이 클래스는 커밋 메시지를 생성하는 데 있어 매우 유연하게 설계되어 있어, 사용자 정의 옵션을 통해 AI의 출력 스타일과 세부 사항을 조절할 수 있습니다. 예를 들어, 온도(temperature) 값을 조정하여 메시지의 창의성을 높이거나 낮출 수 있습니다.

### 4. 사용자 경험 최적화

사용자 경험을 극대화하기 위해 **ora**와 **@inquirer/prompts**를 사용해 시각적으로 매력적인 인터페이스를 구현했습니다. 사용자는 화살표 키를 이용해 생성된 커밋 메시지를 선택하고, 필요한 경우 편집할 수 있습니다. 이렇게 인터랙티브한 UI는 사용자가 커밋 메시지를 선택하거나 편집하는 과정을 간단하고 직관적으로 만들어줍니다.

또한, `commit-ai`는 사용자 설정을 기억하여 반복 사용 시 더욱 편리하게 사용할 수 있습니다. 예를 들어, 기본 언어 설정이나 API 키를 저장하여 매번 입력하지 않아도 되도록 했습니다.

## 사용 방법

`commit-ai`를 사용하는 방법은 매우 간단합니다. 먼저 전역으로 설치한 후, Anthropic API 키를 설정합니다:

```bash
$ npm install -g @j-ho/commit-ai
$ commit-ai --key YOUR_API_KEY
```

그런 다음 Git 저장소에서 변경사항을 스테이징한 후 다음 명령어를 실행하여 커밋 메시지를 생성합니다:

```bash
$ commit-ai
```

이 명령을 실행하면 AI가 현재 스테이징된 변경 사항을 분석하고, 여러 개의 커밋 메시지 제안을 제공합니다. 사용자는 생성된 메시지 중 하나를 선택하고, 원하는 경우 편집 후 커밋할 수 있습니다. 이러한 과정은 개발자가 매번 커밋 메시지를 작성하는 데 드는 시간을 줄여주고, 일관된 메시지 작성에 큰 도움을 줍니다.

또한, `commit-ai`는 다국어 지원 기능을 제공하여 영어 외에도 한국어, 일본어, 중국어 등 다양한 언어로 커밋 메시지를 작성할 수 있습니다. 이를 통해 국제적인 팀에서도 손쉽게 사용할 수 있습니다.

## 예시 코드 및 옵션 사용 방법

`commit-ai`는 다양한 옵션을 제공하여 사용자 정의가 가능합니다. 다음은 설정 가능한 주요 옵션과 사용 예시입니다:

### API 키 및 언어 설정

Anthropic API 키와 기본 언어 설정을 CLI에서 손쉽게 설정할 수 있습니다:

```bash
$ commit-ai --key YOUR_API_KEY --language ko
```

별도로 설정할 수도 있습니다:

```bash
# API 키 설정
$ commit-ai --key YOUR_API_KEY

# 기본 언어 설정
$ commit-ai --language ja
```

현재 설정을 확인하려면 다음과 같이 입력하세요:

```bash
$ commit-ai --show-config
```

### 커밋 메시지 생성

스테이징된 변경사항을 바탕으로 커밋 메시지를 생성하려면 간단히 다음 명령어를 실행합니다:

```bash
$ commit-ai
```

특정 언어로 커밋 메시지를 생성하고 싶다면 다음과 같이 언어를 지정할 수 있습니다:

```bash
$ commit-ai -l ko  # 한 번의 커밋만 한국어로 생성
```

### 인터랙티브 메시지 선택 및 편집

`commit-ai`는 생성된 여러 커밋 메시지 중 하나를 선택하고, 원하는 경우 수정할 수 있도록 도와줍니다:

1. 커밋 메시지 선택
2. 선택한 메시지 편집(제목과 본문)
3. 최종 메시지로 커밋 실행

예시 워크플로우는 다음과 같습니다:

```plaintext
> Select a commit message to use
  1. feat: Add user authentication
  2. feat: Implement login functionality
  3. feat: Create authentication system
  ✏️  Edit commit message
  🌟 Cancel

# 메시지를 선택한 후 편집할 수 있습니다:
> Would you like to edit the commit title? (y/N)
# 제목 편집 후
> Would you like to edit the commit body? (y/N)
# 본문 편집 후

# 최종 메시지 검토 후 커밋 실행
```

## 기술적 도전과 해결 방안

1. **대용량 파일 처리**: Git diff에 대용량 파일이 포함될 경우 AI 모델의 토큰 제한을 초과할 수 있습니다. 이를 해결하기 위해 파일 크기 제한 옵션을 추가하고, 기본값으로 100KB 이상의 파일은 제외하도록 설정했습니다. 이러한 설정은 AI의 성능을 최적화하고, 불필요한 리소스 소비를 줄이는 데 도움을 줍니다.

2. **커밋 템플릿 지원**: 사용자의 Git 설정에 따라 커밋 템플릿을 사용할 수 있도록, Git 설정을 파싱하고 템플릿 파일을 읽어오는 로직을 구현했습니다. 이 기능을 통해 팀 내에서 합의된 커밋 메시지 형식을 쉽게 유지할 수 있으며, 메시지의 일관성을 높일 수 있습니다.

3. **AI 응답 파싱**: Claude AI의 응답을 정확히 파싱하기 위해 정규 표현식을 사용하여 생성된 커밋 메시지를 추출하는 로직을 구현했습니다. AI가 생성한 응답이 항상 일정한 형식을 따르는 것이 아니기 때문에, 이를 유연하게 처리할 수 있는 파싱 로직을 개발하여 다양한 상황에서도 안정적으로 동작하도록 했습니다.

## 마무리

`commit-ai`는 개발자들이 커밋 메시지 작성에 드는 시간을 줄이고, 일관성 있는 메시지를 작성하는 데 도움을 주기 위해 만들어졌습니다. AI를 통해 커밋 메시지의 품질을 높이고, 개발 프로세스에서 발생하는 반복적인 작업을 자동화하여 개발자들이 더 창의적이고 중요한 작업에 집중할 수 있게 합니다.

앞으로도 사용자 피드백을 반영하여 지속적으로 개선해 나갈 예정입니다. 새로운 기능 추가, 사용성 개선, 더 많은 언어 지원 등을 통해 이 도구가 더욱 많은 개발자들에게 도움이 되기를 바랍니다. 이 도구가 여러분의 개발 워크플로우에 실질적인 도움이 되길 바랍니다. `commit-ai`와 함께 더 효율적인 개발을 경험해 보세요!

- [소스 코드](https://github.com/awesomelon/commitAI)

```toc

```
