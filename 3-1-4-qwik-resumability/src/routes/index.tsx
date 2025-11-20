import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  const count = useSignal(0)

  return (
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem; font-family: system-ui, sans-serif;">
      <h1 style="color: #18b6f6;">Qwik Resumability 예제</h1>

      <div style="margin-bottom: 2rem;">
        <p>
          이 페이지는 Qwik의 Resumability 개념을 시연합니다. 페이지 로드 시 자바스크립트가 거의 실행되지
          않습니다.
        </p>
        <p>
          Qwik의 smart bundling은 같은 컴포넌트 내부의 핸들러를 함께 번들링할 수 있습니다.
          하지만 초기 실행되는 자바스크립트는 최소화됩니다.
        </p>
      </div>

      <div
        style={{
          padding: '2rem',
          border: '2px solid #18b6f6',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <p style="font-size: 2rem; margin: 0;">Count: {count.value}</p>
        <button
          onClick$={() => count.value++}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#18b6f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Increment
        </button>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
        }}
      >
        <h3>검증 방법</h3>
        <ol>
          <li>Chrome DevTools의 Network 탭을 열고 페이지를 새로고침하세요</li>
          <li>초기 로드 시 자바스크립트 파일 크기를 확인하세요 (약 28KB)</li>
          <li>페이지 소스를 보면 <code>on:click</code> 속성에 QRL 형식 확인 가능</li>
          <li>Qwik은 하이드레이션 없이 서버 상태를 재개합니다</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
        }}
      >
        <h3>Qwik의 주요 특징</h3>
        <ul>
          <li>
            <strong>Resumability</strong>: 하이드레이션 없이 서버 상태를 그대로 재개
          </li>
          <li>
            <strong>Zero Hydration</strong>: 클라이언트에서 컴포넌트를 다시 실행하지 않음
          </li>
          <li>
            <strong>Minimal Initial JS</strong>: 초기 로드 시 자바스크립트 실행 최소화 (약 28KB)
          </li>
          <li>
            <strong>Smart Bundling</strong>: 함께 사용되는 symbol들을 지능적으로 번들링
          </li>
          <li>
            <strong>QRL (Qwik Resource Locator)</strong>: 이벤트 핸들러 위치를 HTML에 직렬화
          </li>
        </ul>
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Qwik Resumability Example',
  meta: [
    {
      name: 'description',
      content: '3-1-4 Qwik Resumability 예제',
    },
  ],
}
