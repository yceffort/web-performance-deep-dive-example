import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'

// 스크롤해야 보이는 Footer만 지연 로딩
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [showFooter, setShowFooter] = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFooter(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // 뷰포트 200px 전에 미리 로딩
    )

    if (triggerRef.current) {
      observer.observe(triggerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header />
      <MainContent />
      {/* Footer가 곧 보일 위치에 트리거 배치 */}
      <div ref={triggerRef} />
      {showFooter && (
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
          <Footer />
        </Suspense>
      )}
    </div>
  )
}

export default App
