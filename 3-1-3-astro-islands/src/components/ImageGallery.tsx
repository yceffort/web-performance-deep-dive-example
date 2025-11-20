import { useState } from 'react'

export default function ImageGallery() {
  const [selected, setSelected] = useState(0)
  const images = ['Image 1', 'Image 2', 'Image 3']

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem 0' }}>
      <h3>client:visible 예제</h3>
      <p>뷰포트에 보일 때 하이드레이션됩니다 (스크롤 내려서 확인)</p>
      <div>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: selected === idx ? '#007bff' : '#f0f0f0',
              color: selected === idx ? 'white' : 'black',
            }}
          >
            {img}
          </button>
        ))}
      </div>
      <p style={{ marginTop: '1rem' }}>선택된 이미지: {images[selected]}</p>
    </div>
  )
}
