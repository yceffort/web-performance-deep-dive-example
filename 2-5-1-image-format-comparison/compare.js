import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputDir = join(__dirname, 'images')
const outputDir = join(__dirname, 'output')

// 파일 크기를 읽기 쉬운 형식으로 변환
function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i]
}

// 압축률 계산
function calculateSavings(original, compressed) {
  const savings = ((original - compressed) / original) * 100
  return savings.toFixed(1) + '%'
}

// 이미지를 각 포맷으로 변환
async function convertImage(inputPath, filename) {
  const name = basename(filename, extname(filename))
  const results = {}

  // 원본 파일 크기
  const originalStats = await stat(inputPath)
  results.original = {
    size: originalStats.size,
    formatted: formatBytes(originalStats.size),
  }

  // JPEG 변환 (품질 80)
  const jpegPath = join(outputDir, `${name}.jpg`)
  await sharp(inputPath).jpeg({ quality: 80, progressive: true }).toFile(jpegPath)
  const jpegStats = await stat(jpegPath)
  results.jpeg = {
    size: jpegStats.size,
    formatted: formatBytes(jpegStats.size),
    savings: calculateSavings(results.original.size, jpegStats.size),
  }

  // PNG 변환 (압축 레벨 9)
  const pngPath = join(outputDir, `${name}.png`)
  await sharp(inputPath).png({ compressionLevel: 9 }).toFile(pngPath)
  const pngStats = await stat(pngPath)
  results.png = {
    size: pngStats.size,
    formatted: formatBytes(pngStats.size),
    savings: calculateSavings(results.original.size, pngStats.size),
  }

  // WebP 변환 (품질 80)
  const webpPath = join(outputDir, `${name}.webp`)
  await sharp(inputPath).webp({ quality: 80 }).toFile(webpPath)
  const webpStats = await stat(webpPath)
  results.webp = {
    size: webpStats.size,
    formatted: formatBytes(webpStats.size),
    savings: calculateSavings(results.original.size, webpStats.size),
    vsJpeg: calculateSavings(jpegStats.size, webpStats.size),
  }

  // AVIF 변환 (품질 70)
  const avifPath = join(outputDir, `${name}.avif`)
  await sharp(inputPath).avif({ quality: 70, effort: 6 }).toFile(avifPath)
  const avifStats = await stat(avifPath)
  results.avif = {
    size: avifStats.size,
    formatted: formatBytes(avifStats.size),
    savings: calculateSavings(results.original.size, avifStats.size),
    vsJpeg: calculateSavings(jpegStats.size, avifStats.size),
  }

  return results
}

// 결과를 표로 출력
function printResults(filename, results) {
  console.log(`\n📸 ${filename}`)
  console.log('─'.repeat(80))
  console.log(
    `원본: ${results.original.formatted}`.padEnd(30) +
      `(기준)`
  )
  console.log(
    `JPEG (품질 80):`.padEnd(20) +
      `${results.jpeg.formatted}`.padEnd(15) +
      `절감: ${results.jpeg.savings}`
  )
  console.log(
    `PNG (압축 9):`.padEnd(20) +
      `${results.png.formatted}`.padEnd(15) +
      `절감: ${results.png.savings}`
  )
  console.log(
    `WebP (품질 80):`.padEnd(20) +
      `${results.webp.formatted}`.padEnd(15) +
      `절감: ${results.webp.savings}`.padEnd(20) +
      `vs JPEG: ${results.webp.vsJpeg}`
  )
  console.log(
    `AVIF (품질 70):`.padEnd(20) +
      `${results.avif.formatted}`.padEnd(15) +
      `절감: ${results.avif.savings}`.padEnd(20) +
      `vs JPEG: ${results.avif.vsJpeg}`
  )
}

// 요약 통계 출력
function printSummary(allResults) {
  console.log('\n' + '='.repeat(80))
  console.log('📊 전체 요약')
  console.log('='.repeat(80))

  const totals = {
    original: 0,
    jpeg: 0,
    png: 0,
    webp: 0,
    avif: 0,
  }

  allResults.forEach((result) => {
    totals.original += result.results.original.size
    totals.jpeg += result.results.jpeg.size
    totals.png += result.results.png.size
    totals.webp += result.results.webp.size
    totals.avif += result.results.avif.size
  })

  console.log(`\n총 원본 크기: ${formatBytes(totals.original)}`)
  console.log(`\n포맷별 총 크기:`)
  console.log(
    `  JPEG: ${formatBytes(totals.jpeg)}`.padEnd(30) +
      `(원본 대비 ${calculateSavings(totals.original, totals.jpeg)} 절감)`
  )
  console.log(
    `  PNG:  ${formatBytes(totals.png)}`.padEnd(30) +
      `(원본 대비 ${calculateSavings(totals.original, totals.png)} 절감)`
  )
  console.log(
    `  WebP: ${formatBytes(totals.webp)}`.padEnd(30) +
      `(원본 대비 ${calculateSavings(totals.original, totals.webp)} 절감, JPEG 대비 ${calculateSavings(totals.jpeg, totals.webp)})`
  )
  console.log(
    `  AVIF: ${formatBytes(totals.avif)}`.padEnd(30) +
      `(원본 대비 ${calculateSavings(totals.original, totals.avif)} 절감, JPEG 대비 ${calculateSavings(totals.jpeg, totals.avif)})`
  )
}

async function main() {
  try {
    // output 디렉토리 생성
    await mkdir(outputDir, { recursive: true })

    console.log('🔍 이미지 포맷 비교 테스트')
    console.log('='.repeat(80))

    // images 폴더의 모든 파일 읽기
    const files = await readdir(inputDir)
    const imageFiles = files.filter((file) => {
      const ext = extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    if (imageFiles.length === 0) {
      console.log('\n⚠️  images/ 폴더에 이미지가 없습니다.')
      console.log('   .jpg, .jpeg, .png, .webp 파일을 추가해주세요.\n')
      return
    }

    console.log(`\n총 ${imageFiles.length}개의 이미지 발견\n`)

    const allResults = []

    for (const file of imageFiles) {
      const inputPath = join(inputDir, file)
      console.log(`처리 중: ${file}...`)

      const results = await convertImage(inputPath, file)
      allResults.push({ filename: file, results })

      printResults(file, results)
    }

    // 전체 요약 출력
    if (allResults.length > 1) {
      printSummary(allResults)
    }

    console.log('\n✅ 완료! output/ 폴더를 확인하세요.\n')
  } catch (error) {
    console.error('❌ 에러 발생:', error.message)
    process.exit(1)
  }
}

main()
