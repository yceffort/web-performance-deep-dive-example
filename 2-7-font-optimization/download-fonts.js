const https = require('https')
const fs = require('fs')
const path = require('path')

const fontsDir = path.join(__dirname, 'fonts')

// Google Fonts API에서 Roboto 폰트 URL 가져오기
const GOOGLE_FONTS_API =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto:ital,wght@0,400;1,400&display=swap'

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, (response) => {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {})
        reject(err)
      })
  })
}

async function downloadFonts() {
  console.log('Google Fonts CSS 가져오는 중...')

  https.get(
    GOOGLE_FONTS_API,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    },
    async (response) => {
      let css = ''
      response.on('data', (chunk) => {
        css += chunk
      })

      response.on('end', async () => {
        console.log('CSS 내용:', css)

        // CSS에서 woff2 URL 추출
        const urlMatches = css.match(/url\((https:\/\/[^)]+\.woff2)\)/g)

        if (!urlMatches) {
          console.error('폰트 URL을 찾을 수 없습니다.')
          return
        }

        console.log(`\n${urlMatches.length}개의 폰트 파일 발견`)

        for (let i = 0; i < urlMatches.length; i++) {
          const match = urlMatches[i]
          const url = match.match(/https:\/\/[^)]+\.woff2/)[0]
          const filename = `roboto-${i + 1}.woff2`
          const dest = path.join(fontsDir, filename)

          console.log(`\n다운로드 중: ${filename}`)
          console.log(`URL: ${url}`)

          try {
            await downloadFile(url, dest)
            console.log(`✓ 완료: ${filename}`)
          } catch (err) {
            console.error(`✗ 실패: ${filename}`, err.message)
          }
        }

        // 파일 이름을 더 명확하게 변경
        const files = fs.readdirSync(fontsDir)
        if (files.length >= 3) {
          fs.renameSync(
            path.join(fontsDir, 'roboto-1.woff2'),
            path.join(fontsDir, 'roboto-regular.woff2'),
          )
          fs.renameSync(
            path.join(fontsDir, 'roboto-2.woff2'),
            path.join(fontsDir, 'roboto-italic.woff2'),
          )
          fs.renameSync(
            path.join(fontsDir, 'roboto-3.woff2'),
            path.join(fontsDir, 'roboto-bold.woff2'),
          )
          console.log('\n✓ 파일 이름 변경 완료')
        }

        console.log('\n모든 폰트 다운로드 완료!')
      })
    },
  )
}

// fonts 디렉토리가 없으면 생성
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true })
}

downloadFonts()
