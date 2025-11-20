# 중복 패키지 탐지 실습 프로젝트

이 프로젝트는 **2-2-4. 같은 라이브러리가 두 번 설치되어 있다** 절의 실습을 위한 예제입니다.

## 🎯 학습 목표

- `npm ls`로 중복 패키지 찾아내기
- 의존성 트리 분석하기
- `npm dedupe`로 중복 제거 시도하기
- `resolutions`/`overrides`로 버전 강제하기

## 📦 프로젝트 구조

이 프로젝트는 의도적으로 **lodash를 두 가지 버전으로 중복 설치**하도록 설계되었습니다:

```text
duplicate-packages-example/
├── package.json (lodash@^4.17.21 직접 의존)
├── local-packages/
│   ├── package-a/ (lodash@^3.10.1 의존)
│   └── package-b/ (lodash@^4.17.21 의존)
└── src/
    └── index.js
```

- **package-a**: lodash 3.x를 사용하는 구버전 패키지
- **package-b**: lodash 4.x를 사용하는 최신 패키지
- **root 프로젝트**: lodash 4.x를 직접 의존

결과적으로 **lodash 3.x와 4.x가 동시에 설치**됩니다.

## 🚀 실습 순서

### 1. 패키지 설치

```bash
cd resources/2-2-4-duplicate-packages-example
npm install
```

### 2. 중복 패키지 확인

#### npm ls로 의존성 트리 보기

```bash
npm ls lodash
```

**예상 출력:**

```text
duplicate-packages-example@1.0.0
├── lodash@4.17.21
├─┬ package-a@1.0.0 -> ./local-packages/package-a
│ └── lodash@3.10.1
└─┬ package-b@2.0.0 -> ./local-packages/package-b
  └── lodash@4.17.21 deduped
```

**분석:**

- ✅ root 레벨에 `lodash@4.17.21` 설치됨
- ❌ `package-a`는 `lodash@3.10.1` 별도 설치 (중복!)
- ✅ `package-b`는 root의 `lodash@4.17.21` 공유 (deduped)

#### 더 자세한 정보 보기

```bash
npm ls lodash --all
```

#### pnpm 사용 시

```bash
pnpm list lodash
```

#### yarn 사용 시

```bash
yarn why lodash
```

### 3. 애플리케이션 실행

```bash
npm start
```

**출력 예시:**

```text
=== Duplicate Packages Example ===

Available fruits: [ 'apple', 'banana', 'cherry', 'date' ]
Random fruit from package-a: banana

Numbers: [ 1, 2, 3, 4, 5 ]
Chunked (from root lodash): [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]

Debounced function called!

✅ All packages working!

💡 Run "npm ls lodash" to see duplicate lodash installations
```

### 4. 중복 제거 시도

#### 4-1. npm dedupe 실행

```bash
npm dedupe
npm ls lodash
```

**결과:** lodash 3.x와 4.x는 major 버전이 다르므로 dedupe로 제거되지 않습니다.

#### 4-2. resolutions로 강제 통일 (실험)

`package.json`에 다음을 추가:

```json
{
  "overrides": {
    "lodash": "4.17.21"
  }
}
```

```bash
rm -rf node_modules package-lock.json
npm install
npm ls lodash
```

**결과:**

```text
duplicate-packages-example@1.0.0
├── lodash@4.17.21
├─┬ package-a@1.0.0 -> ./local-packages/package-a
│ └── lodash@4.17.21 (overridden)
└─┬ package-b@2.0.0 -> ./local-packages/package-b
  └── lodash@4.17.21 deduped
```

이제 모든 패키지가 lodash 4.x를 사용합니다!

**주의:** `package-a`는 lodash 3.x API를 기대했는데 4.x를 강제로 사용하므로 런타임 에러가 발생할 수 있습니다.

### 5. 실무 시나리오 실습

#### 시나리오 1: 레거시 패키지 업데이트

`package-a`를 lodash 4.x를 사용하도록 업데이트:

```bash
cd local-packages/package-a
# package.json에서 "lodash": "^4.17.21"로 변경
cd ../..
npm install
npm ls lodash
```

#### 시나리오 2: 중복 패키지 크기 측정

```bash
du -sh node_modules/lodash
du -sh node_modules/package-a/node_modules/lodash
```

두 버전이 각각 수백 KB를 차지하는 것을 확인할 수 있습니다.

## 📊 학습 포인트

### 1. 중복이 발생하는 3가지 패턴

✅ **이 예제에서 확인 가능:**

- **패턴 1: 레거시 의존성** - `package-a`가 구버전 lodash를 요구
- **패턴 2: Major 버전 불일치** - lodash 3.x vs 4.x

### 2. npm의 의존성 해소 알고리즘

- **deduping 동작 확인:** `package-b`는 root의 lodash를 공유 (deduped)
- **호이스팅 확인:** 가능한 경우 의존성을 root로 올림
- **중첩 설치:** 호환되지 않는 버전은 패키지 내부에 설치

### 3. 해결 방법 비교

| 방법               | 효과                      | 위험도 |
| ------------------ | ------------------------- | ------ |
| 패키지 업데이트    | ✅ 근본적 해결            | 낮음   |
| `npm dedupe`       | ⚠️ 같은 major 버전만 가능 | 낮음   |
| `overrides` 강제   | ✅ 모든 버전 강제 가능    | 높음   |
| `resolutions` 강제 | ✅ 모든 버전 강제 가능    | 높음   |

## 🔍 추가 탐색

### node_modules 구조 직접 확인

```bash
# root 레벨 lodash
ls -la node_modules/lodash

# package-a의 중첩된 lodash
ls -la node_modules/package-a/node_modules/lodash
```

### package-lock.json 분석

```bash
grep -A 5 '"lodash"' package-lock.json
```

`package-lock.json`에서 lodash가 여러 번 나타나는 것을 확인할 수 있습니다.

## 💡 실무 팁

1. **정기적인 중복 검사**: CI/CD에 `npm ls` 추가
2. **lockfile 커밋**: 팀원 간 동일한 의존성 보장
3. **업데이트 우선**: `overrides`보다 패키지 업데이트 우선
4. **번들 크기 모니터링**: webpack-bundle-analyzer로 실제 영향 확인

## 🎓 다음 단계

이 예제를 마스터했다면:

1. 실제 프로젝트에서 `npm ls` 실행해보기
2. webpack-bundle-analyzer로 중복 확인
3. 가장 큰 중복부터 해결하기
4. CI/CD에 중복 검사 자동화하기

## 📚 관련 자료

- [npm dedupe 문서](https://docs.npmjs.com/cli/v10/commands/npm-dedupe)
- [npm overrides 문서](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides)
- [yarn resolutions 문서](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/)
