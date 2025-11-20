import sharp from 'sharp'
import { stat, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputImage = join(__dirname, 'test-image.jpg')
const outputDir = join(__dirname, 'output')

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const kb = bytes / 1024
  if (kb >= 1024) {
    const mb = kb / 1024
    return mb.toFixed(1) + ' MB (' + Math.round(kb) + ' KB)'
  }
  return Math.round(kb) + ' KB'
}

function calculateReduction(original, compressed) {
  const reduction = ((original - compressed) / original) * 100
  return reduction.toFixed(1) + '%'
}

async function testQuality() {
  if (!existsSync(inputImage)) {
    console.error('❌ test-image.jpg가 없습니다.')
    console.log('   1920x1080 정도의 사진을 test-image.jpg로 추가하세요.')
    return
  }

  // output 디렉토리 생성
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
  }

  console.log('🧪 JPEG 품질별 파일 크기 테스트\n')

  const qualities = [100, 85, 75, 60]
  const results = []

  for (const quality of qualities) {
    const outputPath = join(outputDir, `quality-${quality}.jpg`)

    await sharp(inputImage)
      .jpeg({ quality, progressive: true })
      .toFile(outputPath)

    const stats = await stat(outputPath)
    results.push({
      quality,
      size: stats.size,
      formatted: formatBytes(stats.size),
    })
  }

  // 원본도 측정
  const originalStats = await stat(inputImage)
  const originalSize = originalStats.size

  console.log('원본 이미지:', formatBytes(originalSize))
  console.log('─'.repeat(60))
  console.log()

  results.forEach((result, index) => {
    const reduction = calculateReduction(results[0].size, result.size)
    const label = `품질 ${result.quality}%: ${result.formatted}`.padEnd(30)

    if (index === 0) {
      console.log(`${label}(기준)`)
    } else {
      console.log(`${label}(${reduction} 감소)`)
    }
  })

  console.log()
  console.log('─'.repeat(60))
  console.log('💡 결론:')
  console.log()

  // 85% 대비 100%
  const saving100to85 = calculateReduction(results[0].size, results[1].size)
  console.log(`품질 100% → 85%: ${saving100to85} 절감`)

  // 100% 대비 75%
  const saving100to75 = calculateReduction(results[0].size, results[2].size)
  console.log(`품질 100% → 75%: ${saving100to75} 절감`)

  // 100% 대비 60%
  const saving100to60 = calculateReduction(results[0].size, results[3].size)
  console.log(`품질 100% → 60%: ${saving100to60} 절감`)

  console.log()
  console.log('✅ output/ 폴더에서 각 품질의 이미지를 비교해보세요.')
  console.log('   시각적 차이와 파일 크기를 함께 확인할 수 있습니다.')
}

testQuality().catch(console.error)
