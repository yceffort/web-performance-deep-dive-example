import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const imagesDir = join(__dirname, 'images')

// SVG로 로고 텍스트 생성
function createLogoSVG(width, height, scale) {
  const fontSize = Math.floor(24 * scale)
  const text = scale === 1 ? 'LOGO' : `LOGO ${scale}x`

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#3498db"/>
  <text
    x="50%"
    y="50%"
    font-family="Arial, sans-serif"
    font-size="${fontSize}"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle">
    ${text}
  </text>
</svg>
`.trim()
}

async function createLogos() {
  console.log('🎨 로고 이미지 생성 중...\n')

  const logos = [
    { name: 'logo.png', width: 200, height: 60, scale: 1 },
    { name: 'logo@2x.png', width: 400, height: 120, scale: 2 },
    { name: 'logo@3x.png', width: 600, height: 180, scale: 3 },
  ]

  for (const logo of logos) {
    const svg = createLogoSVG(logo.width, logo.height, logo.scale)
    const filepath = join(imagesDir, logo.name)

    await sharp(Buffer.from(svg))
      .png()
      .toFile(filepath)

    console.log(`✓ ${logo.name} (${logo.width}×${logo.height})`)
  }

  console.log('\n✅ 로고 생성 완료!')
}

createLogos().catch(console.error)
