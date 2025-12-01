import { useState, useCallback } from 'react'
import { OptimizedImage } from './components/OptimizedImage'
import imageMetadata from './data/image-metadata.json'

export default function App() {
  const [reloadKey, setReloadKey] = useState(0)
  const [bustCache, setBustCache] = useState(false)

  const handleReload = useCallback(() => {
    setBustCache(false)
    setReloadKey((k) => k + 1)
  }, [])

  const handleReloadNoCache = useCallback(() => {
    setBustCache(true)
    setReloadKey((k) => k + 1)
  }, [])

  return (
    <div>
      <h1>Blur-up 이미지 로딩 데모 (React)</h1>
      <p className="description">
        개발자 도구 Network 탭에서 "Slow 3G"로 설정하면 효과를 명확히 볼 수
        있습니다.
      </p>

      <div className="controls">
        <button className="primary" onClick={handleReload}>
          이미지 다시 로드
        </button>
        <button className="secondary" onClick={handleReloadNoCache}>
          캐시 무시하고 로드
        </button>
      </div>

      <div className="demo-grid">
        <DemoCard title="Hero 이미지 (eager 로딩)">
          <OptimizedImage
            key={`hero-${reloadKey}`}
            src={bustCache ? `/images/hero.jpg?t=${Date.now()}` : '/images/hero.jpg'}
            alt="Hero banner"
            loading="eager"
            metadata={imageMetadata['hero.jpg']}
          />
        </DemoCard>

        <DemoCard title="Feature 이미지 (lazy 로딩)">
          <OptimizedImage
            key={`feature-${reloadKey}`}
            src={bustCache ? `/images/feature.jpg?t=${Date.now()}` : '/images/feature.jpg'}
            alt="Feature image"
            loading="lazy"
            metadata={imageMetadata['feature.jpg']}
          />
        </DemoCard>

        <DemoCard title="Gallery 이미지 (lazy 로딩)">
          <OptimizedImage
            key={`gallery-${reloadKey}`}
            src={bustCache ? `/images/gallery.jpg?t=${Date.now()}` : '/images/gallery.jpg'}
            alt="Gallery image"
            loading="lazy"
            metadata={imageMetadata['gallery.jpg']}
          />
        </DemoCard>
      </div>
    </div>
  )
}

function DemoCard({ title, children }) {
  return (
    <div className="demo-card">
      <h3>{title}</h3>
      <div className="image-wrapper">{children}</div>
    </div>
  )
}
