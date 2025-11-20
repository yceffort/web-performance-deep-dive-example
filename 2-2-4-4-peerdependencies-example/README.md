# peerDependencies 충돌 실습 프로젝트

이 프로젝트는 **2-2-4-4. peerDependencies 충돌 해결하기** 절의 실습을 위한 예제입니다.

## 🎯 학습 목표

- peerDependencies 충돌이 무엇인지 이해하기
- npm이 peerDependencies를 어떻게 검증하는지 확인하기
- `--legacy-peer-deps` 옵션의 동작 이해하기
- `npm ls`로 invalid 패키지 찾아내기
- peerDependencies 충돌 해결 방법 학습하기

## 📦 프로젝트 구조

이 프로젝트는 의도적으로 **React 19와 호환되지 않는 react-beautiful-dnd**를 설치하도록 설계되었습니다:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-beautiful-dnd": "^13.1.1"
  }
}
```

- **react, react-dom**: 최신 버전 19.x
- **react-beautiful-dnd**: React 16.8.5, 17.x, 18.x만 지원 (19.x 미지원)

결과적으로 **peerDependencies 충돌**이 발생합니다.

## 🚀 실습 순서

### 1. npm install 시도 (충돌 확인)

```bash
cd resources/2-2-4-4-peerdependencies-example
npm install
```

**예상 출력:**

```text
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: peerdependencies-example@1.0.0
npm error Found: react@19.2.0
npm error node_modules/react
npm error   react@"^19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^16.8.5 || ^17.0.0 || ^18.0.0" from react-beautiful-dnd@13.1.1
npm error node_modules/react-beautiful-dnd
npm error   react-beautiful-dnd@"^13.1.1" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
```

**분석:**

- ✅ npm이 peerDependencies 충돌을 **사전에 감지**
- ❌ React 19는 react-beautiful-dnd가 요구하는 범위 밖
- 💡 npm이 두 가지 해결책 제시: `--force` 또는 `--legacy-peer-deps`

### 2. --legacy-peer-deps로 강제 설치

```bash
npm install --legacy-peer-deps
```

**예상 출력:**

```text
added 24 packages, and audited 25 packages in 3s

found 0 vulnerabilities
npm warn deprecated react-beautiful-dnd@13.1.1: react-beautiful-dnd is now deprecated.
```

**분석:**

- ✅ peerDependencies 검증을 무시하고 설치 진행
- ⚠️ deprecated 경고 추가 (react-beautiful-dnd는 더 이상 유지보수 안 됨)

### 3. npm ls로 invalid 패키지 확인

```bash
npm ls react react-dom
```

**예상 출력:**

```text
npm error code ELSPROBLEMS
npm error invalid: react-dom@19.2.0
npm error invalid: react@19.2.0

peerdependencies-example@1.0.0
├─┬ react-beautiful-dnd@13.1.1
│ ├── react-dom@19.2.0 deduped invalid: "^16.8.5 || ^17.0.0 || ^18.0.0"
│ ├─┬ react-redux@7.2.9
│ │ └── react@19.2.0 deduped invalid: "^16.8.5 || ^17.0.0 || ^18.0.0"
│ ├── react@19.2.0 deduped invalid: "^16.8.5 || ^17.0.0 || ^18.0.0"
│ └─┬ use-memo-one@1.1.3
│   └── react@19.2.0 deduped invalid
├─┬ react-dom@19.2.0 invalid: "^16.8.5 || ^17.0.0 || ^18.0.0"
│ └── react@19.2.0 deduped invalid
└── react@19.2.0 invalid: "^16.8.5 || ^17.0.0 || ^18.0.0"
```

**분석:**

- ❌ `invalid` 키워드가 여러 곳에 표시됨
- ⚠️ react-beautiful-dnd뿐 아니라 의존하는 react-redux, use-memo-one도 영향받음
- 💡 peerDependencies 충돌은 연쇄적으로 발생

### 4. 애플리케이션 실행

```bash
npm start
```

**출력:**

```text
=== peerDependencies Conflict Example ===

✅ React version: 19.2.0
✅ ReactDOM loaded successfully
✅ react-beautiful-dnd loaded successfully

⚠️  Check the npm install warnings above to see peerDependencies conflicts
💡 Run "npm ls react react-dom" to see the dependency tree
```

**분석:**

- ✅ 모듈 로딩 자체는 성공
- ⚠️ 하지만 실제 사용 시 런타임 에러 발생 가능
- 💡 peerDependencies 불일치는 **타입 체크로 잡히지 않음**

## 🔧 해결 방법

### 방법 1: React 버전 다운그레이드 (권장)

react-beautiful-dnd를 계속 사용해야 한다면:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-beautiful-dnd": "^13.1.1"
  }
}
```

```bash
rm -rf node_modules package-lock.json
npm install
```

### 방법 2: 대안 라이브러리로 마이그레이션 (권장)

react-beautiful-dnd는 deprecated 상태이므로 대안 사용:

- **@dnd-kit/core**: 현대적이고 React 19 지원
- **react-dnd**: 오랜 기간 유지보수되는 안정적인 라이브러리

```bash
npm uninstall react-beautiful-dnd
npm install @dnd-kit/core @dnd-kit/sortable
```

### 방법 3: overrides로 강제 (위험)

`package.json`에 추가:

```json
{
  "overrides": {
    "react-beautiful-dnd": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    }
  }
}
```

⚠️ **주의:** 런타임 에러 발생 가능. 철저한 테스트 필요.

## 📊 학습 포인트

### 1. peerDependencies의 역할

- **일반 dependencies**: 패키지 내부에 설치됨
- **peerDependencies**: "프로젝트에 이미 설치되어 있어야 함"을 선언
- **React 컴포넌트 라이브러리가 peerDependencies를 사용하는 이유:**
  - React 중복 설치 방지
  - Hooks 규칙 위반 방지 (React가 두 개 설치되면 "Invalid Hook Call" 에러)

### 2. npm 버전별 peerDependencies 처리

| npm 버전 | 동작                                   |
| -------- | -------------------------------------- |
| npm 6    | peerDependencies 자동 설치 + 경고만    |
| npm 7+   | peerDependencies 충돌 시 설치 거부     |
| npm 8+   | `--legacy-peer-deps`로 npm 6 동작 재현 |

### 3. invalid vs deduped

- **deduped**: 이미 상위에 설치된 패키지 공유 (정상)
- **invalid**: peerDependencies 범위 밖 버전 (경고)

### 4. 실무에서의 해결 우선순위

1. **라이브러리 업데이트 대기**: GitHub 이슈 확인
2. **대안 라이브러리로 마이그레이션**: deprecated 패키지는 즉시 교체
3. **프로젝트 의존성 다운그레이드**: 레거시 지원 필요 시
4. **overrides 사용**: 최후의 수단, 반드시 테스트 필요

## 🔍 추가 탐색

### peerDependencies 확인

```bash
npm view react-beautiful-dnd peerDependencies
```

**출력:**

```json
{
  "react": "^16.8.5 || ^17.0.0 || ^18.0.0",
  "react-dom": "^16.8.5 || ^17.0.0 || ^18.0.0"
}
```

### 전체 의존성 트리 확인

```bash
npm ls --all
```

### deprecated 패키지 찾기

```bash
npm outdated
```

## 💡 실무 팁

1. **의존성 업데이트 전 peerDependencies 확인**: `npm view <package> peerDependencies`로 호환성 체크
2. **CI/CD에 `npm ls` 추가**: invalid 패키지를 자동 감지
3. **deprecated 패키지 정기 점검**: `npm outdated` 정기 실행
4. **주요 프레임워크 업그레이드는 신중하게**: React, Vue 등 메이저 버전 업그레이드 시 생태계 대응 기다리기
5. **lockfile 분석**: `npm ls` 결과를 팀과 공유해 문제 인지

## 🎓 다음 단계

이 예제를 마스터했다면:

1. 실제 프로젝트에서 `npm ls` 실행해서 invalid 패키지 찾기
2. deprecated 패키지 목록 작성
3. 대안 라이브러리 조사 및 마이그레이션 계획 수립
4. peerDependencies 충돌을 자동으로 감지하는 CI 스크립트 작성

## 📚 관련 자료

- [npm peerDependencies 문서](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)
- [react-beautiful-dnd deprecation 공지](https://github.com/atlassian/react-beautiful-dnd/issues/2672)
- [@dnd-kit 문서](https://docs.dndkit.com/)
