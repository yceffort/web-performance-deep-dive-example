const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3001

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`)

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
  } else if (req.url === '/fonts/slow-font.woff2') {
    // 폰트를 의도적으로 느리게 제공 (3초 지연)
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')

    console.log('폰트 요청 받음. 3초 후에 제공 시작...')

    setTimeout(() => {
      const stat = fs.statSync(fontPath)
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Content-Length': stat.size,
        'Cache-Control': 'public, max-age=31536000',
      })

      const fontStream = fs.createReadStream(fontPath)

      // 폰트를 천천히 전송 (100ms마다 작은 청크)
      let totalSent = 0
      fontStream.on('data', (chunk) => {
        setTimeout(() => {
          res.write(chunk)
          totalSent += chunk.length
          console.log(`전송 중: ${totalSent}/${stat.size} bytes`)
        }, 100)
      })

      fontStream.on('end', () => {
        setTimeout(() => {
          res.end()
          console.log('폰트 전송 완료')
        }, 100)
      })
    }, 3000)
  } else if (req.url === '/fonts/fast-font.woff2') {
    // 빠르게 제공하는 폰트
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')
    res.writeHead(200, {
      'Content-Type': 'font/woff2',
      'Cache-Control': 'public, max-age=31536000',
    })
    fs.createReadStream(fontPath).pipe(res)
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
  console.log('FOIT (Flash of Invisible Text) 예제')
  console.log('폰트는 3초 후에 천천히 로드됩니다.')
})
