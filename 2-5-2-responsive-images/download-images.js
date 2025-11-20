import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const imagesDir = join(__dirname, 'images')

// 파일 다운로드 함수
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // 리다이렉트 처리
          downloadFile(response.headers.location, filepath).then(resolve).catch(reject)
          return
        }

        const chunks = []
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('end', () => {
          writeFile(filepath, Buffer.concat(chunks))
            .then(() => resolve())
            .catch(reject)
        })
        response.on('error', reject)
      })
      .on('error', reject)
  })
}

async function downloadImages() {
  console.log('🌐 무료 이미지 다운로드 시작...\n')

  // images 폴더 생성
  if (!existsSync(imagesDir)) {
    await mkdir(imagesDir, { recursive: true })
  }

  // Picsum Photos 사용 (무료, 크기 지정 가능)
  const images = [
    // 히어로 이미지들 (같은 이미지의 다른 크기)
    {
      name: 'hero-400.jpg',
      url: 'https://picsum.photos/id/1015/400/250',
      desc: '히어로 이미지 400px',
    },
    {
      name: 'hero-800.jpg',
      url: 'https://picsum.photos/id/1015/800/500',
      desc: '히어로 이미지 800px',
    },
    {
      name: 'hero-1200.jpg',
      url: 'https://picsum.photos/id/1015/1200/750',
      desc: '히어로 이미지 1200px',
    },

    // 모바일 세로 이미지
    {
      name: 'mobile-portrait.jpg',
      url: 'https://picsum.photos/id/1018/600/800',
      desc: '모바일 세로 이미지 (1x)',
    },
    {
      name: 'mobile-portrait@2x.jpg',
      url: 'https://picsum.photos/id/1018/1200/1600',
      desc: '모바일 세로 이미지 (2x)',
    },

    // 데스크톱 가로 이미지
    {
      name: 'desktop-landscape.jpg',
      url: 'https://picsum.photos/id/1019/1200/600',
      desc: '데스크톱 가로 이미지 (1x)',
    },
    {
      name: 'desktop-landscape@2x.jpg',
      url: 'https://picsum.photos/id/1019/2400/1200',
      desc: '데스크톱 가로 이미지 (2x)',
    },

    // 로고 (단색 플레이스홀더)
    {
      name: 'logo.png',
      url: 'https://via.placeholder.com/200x60/3498db/ffffff?text=Logo',
      desc: '로고 (1x)',
    },
    {
      name: 'logo@2x.png',
      url: 'https://via.placeholder.com/400x120/3498db/ffffff?text=Logo@2x',
      desc: '로고 (2x)',
    },
    {
      name: 'logo@3x.png',
      url: 'https://via.placeholder.com/600x180/3498db/ffffff?text=Logo@3x',
      desc: '로고 (3x)',
    },
  ]

  let success = 0
  let failed = 0

  for (const image of images) {
    try {
      const filepath = join(imagesDir, image.name)

      if (existsSync(filepath)) {
        console.log(`⏭️  ${image.name} - 이미 존재함`)
        success++
        continue
      }

      console.log(`⬇️  ${image.desc} 다운로드 중...`)
      await downloadFile(image.url, filepath)
      console.log(`   ✓ ${image.name} 저장 완료`)
      success++

      // API rate limit 방지를 위한 짧은 딜레이
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`   ✗ ${image.name} 실패:`, error.message)
      failed++
    }
  }

  console.log(`\n✅ 완료! 성공: ${success}개, 실패: ${failed}개`)

  if (success > 0) {
    console.log('\n다음 단계:')
    console.log('1. index.html을 브라우저에서 열기')
    console.log('   open index.html')
    console.log('2. 개발자 도구 (F12) 열기')
    console.log('3. Network 탭에서 이미지 로딩 확인')
    console.log('4. Device Toolbar (Cmd+Shift+M)로 화면 크기 변경')
  }
}

downloadImages().catch(console.error)
