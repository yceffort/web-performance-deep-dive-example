// DOM 요소
const demoContainer = document.getElementById('demo-image-container')
const demoFullImage = document.getElementById('demo-full-image')
const loadingStatus = document.getElementById('loading-status')
const progressFill = document.getElementById('progress-fill')
const reloadBtn = document.getElementById('reload-btn')
const clearCacheBtn = document.getElementById('clear-cache-btn')

// 로딩 상태 업데이트
function updateStatus(message, progress = 0) {
  loadingStatus.textContent = message
  progressFill.style.width = `${progress}%`
}

// 이미지 로드 함수
function loadImage(forceReload = false) {
  // 이미지 초기화
  demoFullImage.classList.remove('loaded')
  demoFullImage.src = '' // 기존 이미지 제거

  // 프리뷰는 항상 보이도록
  const placeholder = demoContainer.querySelector('.image-placeholder')
  if (placeholder) {
    placeholder.style.opacity = '1'
  }

  updateStatus('이미지 로딩 시작...', 10)

  // 약간의 지연 후 이미지 로드 시작 (효과를 명확히 보기 위해)
  setTimeout(() => {
    const imageSrc = demoFullImage.dataset.src
    const timestamp = forceReload ? `?t=${Date.now()}` : ''

    demoFullImage.src = imageSrc + timestamp

    updateStatus('이미지 다운로드 중...', 30)

    // 로드 완료 이벤트
    demoFullImage.onload = () => {
      updateStatus('이미지 로드 완료! 페이드 인 시작...', 70)

      // 페이드 인 효과 시작 (1초 대기 후)
      setTimeout(() => {
        demoFullImage.classList.add('loaded')
        updateStatus('페이드 인 진행 중... (3초) 📸', 85)

        // 프리뷰 페이드 아웃
        if (placeholder) {
          placeholder.style.opacity = '0'
        }

        // 전환 완료 메시지 (3초 후)
        setTimeout(() => {
          updateStatus('전환 완료! ✨', 100)
        }, 3000)
      }, 1000)
    }

    // 로드 실패 이벤트
    demoFullImage.onerror = () => {
      updateStatus('이미지 로드 실패 ❌', 0)
      console.error('이미지를 불러올 수 없습니다.')
    }

    // 이미 캐시된 경우 즉시 처리
    if (demoFullImage.complete && demoFullImage.naturalHeight !== 0) {
      demoFullImage.onload()
    }
  }, 500)
}

// 버튼 이벤트
reloadBtn.addEventListener('click', () => {
  loadImage(false)
})

clearCacheBtn.addEventListener('click', () => {
  updateStatus('캐시 무시하고 새로 로드...', 0)
  loadImage(true)
})

// 페이지 로드 시 자동 시작
window.addEventListener('load', () => {
  // 초기 상태
  updateStatus('버튼을 클릭해서 데모를 시작하세요', 0)
})

// 키보드 단축키
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    loadImage(false)
  } else if (e.key === 'c' || e.key === 'C') {
    loadImage(true)
  }
})

// 디버깅 정보
console.log('Blur-up 데모가 준비되었습니다.')
console.log('단축키: R = 재로드, C = 캐시 무시 재로드')
