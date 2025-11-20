import { useState } from 'react'

export default function CommentForm() {
  const [content, setContent] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert(`댓글 제출: ${content}`)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
      <h3>댓글 작성</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
      />
      <button type="submit" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>
        댓글 작성
      </button>
    </form>
  )
}
