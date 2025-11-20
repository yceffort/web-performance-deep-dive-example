const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3002

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`)

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
  } else if (req.url === '/fonts/custom-font.woff2') {
    // 폰트를 2초 지연 후 제공
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')

    console.log('폰트 요청 받음. 2초 후에 제공...')

    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Cache-Control': 'public, max-age=31536000',
      })
      fs.createReadStream(fontPath).pipe(res)
      console.log('폰트 전송 완료')
    }, 2000)
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
  console.log('FOUT (Flash of Unstyled Text) 예제')
  console.log('폰트는 2초 후에 로드되어 폴백 폰트에서 웹 폰트로 전환됩니다.')
})
