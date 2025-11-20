import { useState } from 'react';

// CommentForm.tsx - 인터랙티브 아일랜드 (React 컴포넌트)
// JavaScript: React 런타임 + 이 컴포넌트 코드

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
      <h2>💬 댓글 작성 (인터랙티브 아일랜드)</h2>
      <div className="island-badge">
        ⚛️ React Component | ✅ 하이드레이션 | 📦 JavaScript 포함
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

      <style>{`
        .comment-form {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          padding: 2rem;
          border-radius: 12px;
          border: 3px solid #2196f3;
          box-shadow: 0 4px 20px rgba(33, 150, 243, 0.3);
        }

        .comment-form h2 {
          margin-bottom: 1rem;
          color: #1565c0;
        }

        .island-badge {
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          border: 2px solid #2196f3;
          font-weight: 600;
          color: #1565c0;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #90caf9;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
          background: white;
        }

        .input:focus,
        .textarea:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        .textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .comments-list {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(33, 150, 243, 0.3);
        }

        .comments-list h3 {
          margin-bottom: 1rem;
          color: #1565c0;
        }

        .comment-item {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid #90caf9;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .comment-header strong {
          color: #1976d2;
        }

        .comment-time {
          font-size: 0.85rem;
          color: #666;
        }

        .comment-text {
          color: #333;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
