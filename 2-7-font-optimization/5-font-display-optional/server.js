const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3005

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`)

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
  } else if (req.url === '/fonts/optional-font-slow.woff2') {
    // 느린 폰트 (200ms 지연 - 100ms 초과하여 optional에서 무시됨)
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')

    console.log('느린 폰트 요청. 200ms 후에 제공 (optional은 포기함)...')

    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Cache-Control': 'public, max-age=31536000',
      })
      fs.createReadStream(fontPath).pipe(res)
      console.log('폰트 전송 완료 (하지만 optional은 이미 폴백 폰트 사용 중)')
    }, 200)
  } else if (req.url === '/fonts/optional-font-fast.woff2') {
    // 빠른 폰트 (50ms 지연 - 100ms 이내로 optional에서 사용 가능)
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')

    console.log('빠른 폰트 요청. 50ms 후에 제공 (optional 적용 가능)...')

    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Cache-Control': 'public, max-age=31536000',
      })
      fs.createReadStream(fontPath).pipe(res)
      console.log('폰트 전송 완료 (optional이 사용함)')
    }, 50)
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
  console.log('font-display: optional 예제')
  console.log('URL 파라미터로 폰트 로딩 속도를 제어할 수 있습니다:')
  console.log('  - http://localhost:3005/?mode=slow (200ms 지연)')
  console.log('  - http://localhost:3005/?mode=fast (50ms 지연)')
})
