---
emoji: ☀️
title: AI를 이용한 Git Commit 메시지 생성하기
date: '2024-08-30 14:58:00'
author: Bangjh
tags: AI Git ClaudeAI
categories: PLAYGROUND
---

오늘은 제가 개발한 `commit-ai`라는 도구에 대해 소개하고자 합니다. commit-ai는 AI를 활용하여 Git 커밋 메시지를 자동으로 생성해주는 CLI 도구입니다.
이 도구를 통해 일관성 있고 명확한 커밋 메시지를 쉽게 작성할 수 있습니다.

![example](./example.gif)

<br />

## 개발 배경

Git을 사용하는 개발자라면 누구나 경험해 봤을 것입니다. 작업을 마치고 커밋을 하려는 순간, 적절한 커밋 메시지를 작성하는 데 시간을 허비하는 경우가 많죠.
때로는 `fixed`, `feat` 와 같은 모호한 메시지로 마무리 짓기도 합니다. 이런 문제를 해결하고자 AI를 이용해 자동으로 명확하고 구체적인 커밋 메시지를 생성해주는 도구를 만들게 되었습니다.

<br />

## 주요 기능

1. AI를 활용한 다중 커밋 메시지 제안
2. Git 커밋 템플릿 지원
3. 커스터마이즈 가능한 메시지 생성 옵션
4. 사용하기 쉬운 CLI
5. 화살표 키를 이용한 대화형 커밋 메시지 선택
6. 대용량 파일 및 특정 파일 유형(예: lock 파일) 제외

<br />

## 구현 과정

### 1. 프로젝트 구조 설계

먼저 프로젝트를 설계했습니다. 주요 컴포넌트는 다음과 같습니다.

- **`cli.ts`**: 명령줄 인터페이스 구현
- **`GitCommitMessageGenerator.ts`**: 커밋 메시지 생성 로직 담당
- **`build.js`**: 프로젝트 빌드 스크립트


### 2. 의존성 선택

- `@anthropic-ai/sdk`: Anthropic AI API와의 상호작용
- `@inquirer/prompts`: 대화형 명령줄 인터페이스 구현 
- `commander`: 명령줄 인터페이스 구축 
- `configstore`: 설정 데이터 저장 
- `ora`: 터미널에서의 우아한 로딩 스피너 표시

### 3. GitCommitMessageGenerator 클래스 구현

이 클래스는 커밋 메시지 생성의 핵심 로직을 담고 있습니다. 주요 메서드는 다음과 같습니다.

```typescript
class GitCommitMessageGenerator {
  async generateCommitMessages(): Promise<string[]> {
    const diff = this.getGitDiff();
    const template = this.getCommitTemplate();
    const response = await this.callClaudeAPI(diff, template);
    return this.parseCommitMessages(response.content[0].text);
  }

  private getGitDiff(): string {
    // Git diff 추출 로직
  }

  private async callClaudeAPI(diff: string, template: string | null): Promise<any> {
    // Claude AI API 호출 로직
  }

  private parseCommitMessages(response: string): string[] {
    // AI 응답 파싱 로직
  }
}
```

- `generatorCommitMessages()`: AI를 사용하여 커밋 메시지 생성
- `getGitDiff()`: 현재 Git 저장소의 스테이징된 변경사항 분석
- `callClaudeAPI()`: Anthropic AI API를 호출하여 커밋 메시지 생성
- `parseCommitMessages()`: AI가 생성한 메시지를 파싱하고 처리

### 4. CLI 구현

commander 라이브러리를 사용하여 CLI를 구현했습니다.

```typescript
program
  .version(VERSION)
  .description("Automatically generate commit messages using AI")
  .option("-k, --key <key>", "Set Anthropic API key")
  .option("-m, --max-tokens <number>", "Set max tokens for message generation", "300")
  .option("-t, --temperature <number>", "Set temperature for message generation", "0.7")
  .option("-f, --format <format>", "Set commit message format (conventional or freeform)", "conventional")
  .option("-n, --number <number>", "Number of commit message suggestions", "3")
  .option("--max-file-size <number>", "Maximum file size in KB to include in diff", "100")
```

- API 키 설정
- 최대 토큰 수 설정
- 온도 설정
- 커밋 메시지 형식 설정
- 생성할 커밋 메시지 제안 수 설정
- 분석에 포함할 최대 파일 크기 설정

<br />

### 5. 사용 방법

commit-ai를 사용하는 방법은 아주 간단합니다. 먼저 전역으로 설치합니다.

```bash
$ npm install -g @j-ho/commit-ai

# or

$ yarn global add @j-ho/commit-ai

# or

$ pnpm global add @j-ho/commit-ai
```

그런 다음 API 키를 설정합니다.

```bash
$ command-ai --key <YOUR_API_KEY>
```

이제 커밋 메시지를 생성할 준비가 되었습니다. Git 저장소에서 변경사항을 스테이징한 후, 다음 명령어를 실행합니다

```bash
$ commit-ai
```

<br />

## 기술적 도전과 해결 방안
1. **대용량 파일 처리**: Git diff에 대용량 파일이 포함되면 AI 모델의 토큰 제한을 초과할 수 있습니다. 이를 해결하기 위해 파일 크기 제한 옵션을 추가하고, 기본값으로 100KB 이상의 파일은 제외하도록 구현했습니다.
```typescript
private getGitDiff(): string {
  const stagedFiles = execSync("git diff --cached --name-only").toString().split("\n").filter(Boolean);
  let filteredDiff = "";
  for (const file of stagedFiles) {
    if (this.shouldSkipFile(file)) continue;
    const fileDiff = execSync(`git diff --cached -- "${file}"`).toString();
    const fileSizeKB = Buffer.byteLength(fileDiff, "utf8") / 1024;
    if (fileSizeKB > this.options.maxFileSizeKB) {
      console.warn(`Skipping large file: ${file} (${fileSizeKB.toFixed(2)} KB)`);
      continue;
    }
    filteredDiff += fileDiff;
  }
  return filteredDiff;
}
```

2. **커밋 템플릿 지원**: 사용자의 Git 설정에 따라 커밋 템플릿을 사용할 수 있어야 했습니다. Git 설정을 파싱하고 템플릿 파일을 읽어오는 로직을 구현하여 이를 해결했습니다.
```typescript
private getCommitTemplate(): string | null {
  try {
    const templatePath = execSync("git config --get commit.template").toString().trim();
    if (templatePath) {
      let fullPath = templatePath;
      if (templatePath.startsWith("~")) {
        fullPath = path.join(os.homedir(), templatePath.slice(1));
      }
      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath, "utf-8");
      }
    }
  } catch (error) {
    console.warn("Failed to get commit template:", (error as Error).message);
  }
  return null;
}
```

3. **AI 응답 파싱**: Claude AI의 응답을 정확하게 파싱하는 것이 중요했습니다. 정규 표현식을 사용하여 생성된 커밋 메시지를 정확히 추출하는 로직을 구현했습니다.
```typescript
private parseCommitMessages(response: string): string[] {
  const lines = response.split("\n");
  const commitMessages: string[] = [];
  let currentMessage = "";
  for (const line of lines) {
    const match = line.match(/^\d+\.\s*"?(.+?)"?$/);
    if (match) {
      if (currentMessage) {
        commitMessages.push(currentMessage.trim());
      }
      currentMessage = match[1];
    } else if (line.trim() && currentMessage) {
      currentMessage += " " + line.trim();
    }
  }
  if (currentMessage) {
    commitMessages.push(currentMessage.trim());
  }
  return commitMessages.map((msg) => msg.replace(/^"(.+)"$/, "$1"));
}
```
4. **사용자 경험 최적화**: CLI 도구임에도 불구하고 사용자 경험이 중요했습니다. ora와 @inquirer/prompts를 활용하여 시각적으로 appealing한 인터페이스를 구현했습니다.

<br />

---

commit-ai를 개발하면서 AI를 실제 개발 워크플로우에 통합하는 방법에 대해 많이 배웠습니다. 
이 도구가 개발자들의 일상적인 작업을 조금이나마 편리하게 만들 수 있기를 희망합니다. 앞으로도 사용자 피드백을 반영하여 지속적으로 개선해 나갈 예정입니다.


- [소스 코드](https://github.com/awesomelon/commitAI)


```toc

```
