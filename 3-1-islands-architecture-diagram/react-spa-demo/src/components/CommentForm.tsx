import { useState } from 'react';

export default function CommentForm() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ name: string; comment: string; time: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && comment.trim()) {
      const newComment = {
        name: name.trim(),
        comment: comment.trim(),
        time: new Date().toLocaleTimeString('ko-KR'),
      };

      setComments([newComment, ...comments]);
      setName('');
      setComment('');
    }
  };

  return (
    <div className="comment-form">
      <h2>💬 댓글 작성</h2>
      <div className="react-badge">
        ⚛️ React Component | ✅ 모든 컴포넌트가 React로 렌더링
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="textarea"
          />
        </div>

        <button type="submit" className="submit-btn">
          댓글 작성
        </button>
      </form>

      {comments.length > 0 && (
        <div className="comments-list">
          <h3>작성된 댓글 ({comments.length})</h3>
          {comments.map((c, index) => (
            <div key={index} className="comment-item">
              <div className="comment-header">
                <strong>{c.name}</strong>
                <span className="comment-time">{c.time}</span>
              </div>
              <p className="comment-text">{c.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
