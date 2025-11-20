import sharp from 'sharp'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const imagesDir = join(__dirname, 'images')

// 원본 이미지 파일명 (사용자가 준비해야 함)
const SOURCE_IMAGE = join(imagesDir, 'source.jpg') // 가로 이미지
const SOURCE_LOGO = join(imagesDir, 'source-logo.png') // 로고

async function generateResponsiveImages() {
  console.log('🖼️  반응형 이미지 생성 시작...\n')

  // images 폴더 확인
  if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir, { recursive: true })
  }

  // 원본 이미지 확인
  if (!existsSync(SOURCE_IMAGE)) {
    console.error('❌ source.jpg가 images/ 폴더에 없습니다.')
    console.log(
      '   images/source.jpg 파일을 추가하세요 (권장: 2000px 이상 가로 이미지)'
    )
    return
  }

  try {
    // 1. 히어로 이미지 - 여러 크기 생성
    console.log('1️⃣  히어로 이미지 생성 중...')
    await sharp(SOURCE_IMAGE)
      .resize(400, null)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'hero-400.jpg'))
    console.log('   ✓ hero-400.jpg')

    await sharp(SOURCE_IMAGE)
      .resize(800, null)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'hero-800.jpg'))
    console.log('   ✓ hero-800.jpg')

    await sharp(SOURCE_IMAGE)
      .resize(1200, null)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'hero-1200.jpg'))
    console.log('   ✓ hero-1200.jpg')

    // 2. 모바일 세로 크롭 이미지
    console.log('\n2️⃣  모바일 세로 크롭 이미지 생성 중...')
    const metadata = await sharp(SOURCE_IMAGE).metadata()

    // 중앙을 4:3 비율로 크롭
    const cropWidth = Math.min(metadata.width, metadata.height * (4 / 3))
    const cropHeight = cropWidth * (3 / 4)
    const left = Math.floor((metadata.width - cropWidth) / 2)
    const top = Math.floor((metadata.height - cropHeight) / 2)

    await sharp(SOURCE_IMAGE)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(600, 800)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'mobile-portrait.jpg'))
    console.log('   ✓ mobile-portrait.jpg')

    await sharp(SOURCE_IMAGE)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(1200, 1600)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'mobile-portrait@2x.jpg'))
    console.log('   ✓ mobile-portrait@2x.jpg')

    // 3. 데스크톱 가로 이미지
    console.log('\n3️⃣  데스크톱 가로 이미지 생성 중...')
    await sharp(SOURCE_IMAGE)
      .resize(1200, null)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'desktop-landscape.jpg'))
    console.log('   ✓ desktop-landscape.jpg')

    await sharp(SOURCE_IMAGE)
      .resize(2400, null)
      .jpeg({ quality: 80, progressive: true })
      .toFile(join(imagesDir, 'desktop-landscape@2x.jpg'))
    console.log('   ✓ desktop-landscape@2x.jpg')

    // 4. 로고 이미지 (source-logo.png가 있는 경우)
    if (existsSync(SOURCE_LOGO)) {
      console.log('\n4️⃣  로고 이미지 생성 중...')
      await sharp(SOURCE_LOGO)
        .resize(200, null)
        .png({ compressionLevel: 9 })
        .toFile(join(imagesDir, 'logo.png'))
      console.log('   ✓ logo.png')

      await sharp(SOURCE_LOGO)
        .resize(400, null)
        .png({ compressionLevel: 9 })
        .toFile(join(imagesDir, 'logo@2x.png'))
      console.log('   ✓ logo@2x.png')

      await sharp(SOURCE_LOGO)
        .resize(600, null)
        .png({ compressionLevel: 9 })
        .toFile(join(imagesDir, 'logo@3x.png'))
      console.log('   ✓ logo@3x.png')
    } else {
      console.log(
        '\n4️⃣  로고 이미지 건너뜀 (images/source-logo.png가 없습니다)'
      )
    }

    console.log('\n✅ 모든 이미지 생성 완료!')
    console.log('\n다음 단계:')
    console.log('1. index.html을 브라우저에서 열기')
    console.log('2. 개발자 도구 (F12) 열기')
    console.log('3. Network 탭에서 다운로드된 이미지 확인')
    console.log('4. Device Toolbar로 화면 크기 변경하며 테스트')
  } catch (error) {
    console.error('❌ 에러 발생:', error.message)
  }
}

generateResponsiveImages()
