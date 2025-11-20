const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3003

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`)

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
  } else if (req.url === '/fonts/font-regular.woff2') {
    // Regular 폰트는 즉시 제공
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')
    console.log('Regular 폰트 제공')
    res.writeHead(200, {
      'Content-Type': 'font/woff2',
      'Cache-Control': 'public, max-age=31536000',
    })
    fs.createReadStream(fontPath).pipe(res)
  } else if (req.url === '/fonts/font-bold.woff2') {
    // Bold 폰트는 3초 지연 후 제공
    const fontPath = path.join(__dirname, '../fonts/roboto-1.woff2')
    console.log('Bold 폰트 요청 받음. 3초 후에 제공...')

    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'font/woff2',
        'Cache-Control': 'public, max-age=31536000',
      })
      fs.createReadStream(fontPath).pipe(res)
      console.log('Bold 폰트 전송 완료')
    }, 3000)
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
  console.log('FOFT (Flash of Faux Text) 예제')
  console.log(
    'Regular 폰트는 즉시 로드되고, Bold 폰트는 3초 후에 로드됩니다.',
  )
})
