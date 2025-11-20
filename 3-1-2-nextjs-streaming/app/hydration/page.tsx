import Counter from './Counter'

export default function Page() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SSR과 하이드레이션 예제</h1>

      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-semibold mb-2">동작 과정</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>서버</strong>: Counter 컴포넌트를 실행하여 HTML 생성 (count 초기값 0)
          </li>
          <li>
            <strong>브라우저</strong>: HTML을 받아서 즉시 렌더링 (FCP 발생)
          </li>
          <li>
            <strong>이 시점</strong>: 화면은 보이지만 버튼 클릭 불가 (이벤트 핸들러 없음)
          </li>
          <li>
            <strong>클라이언트</strong>: 자바스크립트 다운로드 및 실행
          </li>
          <li>
            <strong>하이드레이션</strong>: React가 컴포넌트를 재실행하고 이벤트 리스너 연결
          </li>
          <li>
            <strong>TTI 달성</strong>: 이제 버튼 클릭 가능
          </li>
        </ol>
      </div>

      <div className="mb-4 p-4 bg-yellow-50 rounded">
        <h2 className="text-xl font-semibold mb-2">검증 방법</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Network 탭</strong>: 페이지 새로고침 시 HTML이 즉시 전송됨
          </li>
          <li>
            <strong>Performance 탭</strong>: FCP 이후 하이드레이션 작업 확인
          </li>
          <li>
            <strong>Elements 탭</strong>: 서버 렌더링된 HTML 구조 확인
          </li>
        </ul>
      </div>

      <Counter />

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">문서 검증 내용</h3>
        <p className="text-sm text-gray-700">
          이 예제는 문서 <strong>라인 22-76</strong>의 Counter 컴포넌트와 하이드레이션 과정을
          검증합니다.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Next.js는 자동으로 SSR을 수행하므로, 서버에서 생성된 HTML과 클라이언트 렌더링 결과가
          정확히 일치합니다.
        </p>
      </div>
    </div>
  )
}
