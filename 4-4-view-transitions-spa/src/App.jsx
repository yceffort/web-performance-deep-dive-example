import { useState } from 'react'
import { flushSync } from 'react-dom'
import './App.css'

const products = [
  { id: 1, name: '프리미엄 헤드폰', price: '₩299,000', color: '#6366f1' },
  { id: 2, name: '무선 키보드', price: '₩159,000', color: '#ec4899' },
  { id: 3, name: '스마트 워치', price: '₩450,000', color: '#14b8a6' },
  { id: 4, name: '블루투스 스피커', price: '₩89,000', color: '#f97316' },
]

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDark, setIsDark] = useState(false)

  const handleSelect = (product) => {
    if (!document.startViewTransition) {
      setSelectedProduct(product)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedProduct(product)
      })
    })
  }

  const handleBack = () => {
    if (!document.startViewTransition) {
      setSelectedProduct(null)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedProduct(null)
      })
    })
  }

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setIsDark(!isDark)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(!isDark)
      })
    })
  }

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <header className="header">
        <h1 style={{ viewTransitionName: 'page-title' }}>
          {selectedProduct ? '상품 상세' : '상품 목록'}
        </h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? '🌙' : '☀️'}
        </button>
      </header>

      <main className="main">
        {selectedProduct ? (
          <DetailView product={selectedProduct} onBack={handleBack} />
        ) : (
          <ListView products={products} onSelect={handleSelect} />
        )}
      </main>

      <footer className="footer">
        <p>View Transitions API Demo - SPA (Same-Document) 예제</p>
        <p className="support-status">
          {document.startViewTransition
            ? '✅ View Transitions API 지원됨'
            : '❌ View Transitions API 미지원'}
        </p>
      </footer>
    </div>
  )
}

function ListView({ products, onSelect }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <button
          key={product.id}
          className="product-card"
          onClick={() => onSelect(product)}
        >
          <div
            className="product-image"
            style={{
              viewTransitionName: `product-image-${product.id}`,
              backgroundColor: product.color,
            }}
          >
            <span className="product-icon">📦</span>
          </div>
          <div className="product-info">
            <h2 style={{ viewTransitionName: `product-title-${product.id}` }}>
              {product.name}
            </h2>
            <p className="price">{product.price}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

function DetailView({ product, onBack }) {
  return (
    <div className="product-detail">
      <button className="back-button" onClick={onBack}>
        ← 목록으로
      </button>

      <div
        className="detail-image"
        style={{
          viewTransitionName: `product-image-${product.id}`,
          backgroundColor: product.color,
        }}
      >
        <span className="detail-icon">📦</span>
      </div>

      <div className="detail-info">
        <h2
          className="detail-title"
          style={{ viewTransitionName: `product-title-${product.id}` }}
        >
          {product.name}
        </h2>
        <p className="detail-price">{product.price}</p>
        <p className="detail-description">
          고품질 소재와 정교한 디자인으로 제작된 프리미엄 제품입니다. 뛰어난
          성능과 세련된 디자인을 동시에 경험해보세요.
        </p>
        <button className="buy-button">구매하기</button>
      </div>
    </div>
  )
}

export default App
