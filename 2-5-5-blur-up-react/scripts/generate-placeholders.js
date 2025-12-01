import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'

const IMAGES_DIR = './public/images'
const OUTPUT_FILE = './src/data/image-metadata.json'
const PREVIEW_WIDTH = 20

async function generatePlaceholders() {
  const files = await readdir(IMAGES_DIR)
  const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))

  const metadata = {}

  for (const file of imageFiles) {
    const inputPath = join(IMAGES_DIR, file)

    try {
      const image = sharp(inputPath)
      const { width, height } = await image.metadata()

      const previewHeight = Math.round((PREVIEW_WIDTH * height) / width)
      const previewBuffer = await image
        .resize(PREVIEW_WIDTH, previewHeight)
        .jpeg({ quality: 50 })
        .toBuffer()

      const base64 = `data:image/jpeg;base64,${previewBuffer.toString('base64')}`

      metadata[file] = {
        width,
        height,
        preview: base64,
      }

      console.log(`✓ ${file} (${width}×${height})`)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
    }
  }

  await writeFile(OUTPUT_FILE, JSON.stringify(metadata, null, 2))
  console.log(`\nMetadata saved to ${OUTPUT_FILE}`)
}

generatePlaceholders()
