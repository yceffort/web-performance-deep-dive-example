import { Suspense } from 'react'

async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const mockData = {
    comments: [
      { id: '1', text: '첫 번째 댓글입니다' },
      { id: '2', text: '두 번째 댓글입니다' },
      { id: '3', text: '세 번째 댓글입니다' },
    ],
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">댓글</h2>
      <ul className="space-y-2">
        {mockData.comments?.map((comment: { id: string; text: string }) => (
          <li key={comment.id} className="p-2 bg-gray-100 rounded">
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Page() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">빠른 콘텐츠</h1>
      <p className="mb-4 text-gray-600">이 콘텐츠는 즉시 렌더링됩니다</p>

      <Suspense fallback={<div className="p-4 border rounded animate-pulse">로딩 중...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
