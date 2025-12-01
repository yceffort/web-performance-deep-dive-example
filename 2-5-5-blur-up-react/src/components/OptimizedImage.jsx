import { useState, useEffect, useRef } from 'react'
import './OptimizedImage.css'

export function OptimizedImage({
  src,
  alt,
  loading = 'lazy',
  metadata = {},
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef(null)

  const { width = 800, height = 600, preview = '' } = metadata

  useEffect(() => {
    setLoaded(false)
    setError(false)

    const img = imgRef.current
    if (!img) return

    if (img.complete && img.naturalHeight !== 0) {
      setLoaded(true)
    }
  }, [src])

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleError = () => {
    setError(true)
    console.error(`Failed to load image: ${src}`)
  }

  return (
    <div
      className="optimized-image-container"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {preview && (
        <img
          src={preview}
          alt=""
          aria-hidden="true"
          className={`optimized-image-preview ${loaded ? 'hidden' : ''}`}
        />
      )}

      {!error ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`optimized-image-full ${loaded ? 'loaded' : ''}`}
        />
      ) : (
        <div className="optimized-image-error">
          <span>이미지 로드 실패</span>
        </div>
      )}

      {!loaded && !error && (
        <div className="optimized-image-loading">
          <div className="spinner" />
        </div>
      )}
    </div>
  )
}
