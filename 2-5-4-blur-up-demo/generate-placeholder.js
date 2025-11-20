import sharp from 'sharp'

async function generatePlaceholder() {
  console.log('작은 프리뷰 이미지 생성 중...')

  // 20x15 정도의 작은 이미지 생성
  await sharp('demo-image.jpg')
    .resize(20, null, { fit: 'inside' })
    .jpeg({ quality: 20 })
    .toFile('placeholder-small.jpg')

  const stats = await sharp('placeholder-small.jpg').metadata()

  console.log(`✓ placeholder-small.jpg 생성 완료`)
  console.log(`  크기: ${stats.width}x${stats.height}`)
  console.log(`  파일 크기: ${stats.size} bytes`)
}

generatePlaceholder().catch(console.error)
