const puppeteer = require('puppeteer');

async function measurePage(url, label) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const resources = [];

  page.on('response', async (response) => {
    try {
      const request = response.request();
      const url = request.url();
      const headers = response.headers();

      const contentLength = headers['content-length'];
      const size = contentLength ? parseInt(contentLength) : 0;

      resources.push({
        url,
        type: request.resourceType(),
        size,
        status: response.status(),
      });
    } catch (error) {}
  });

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForTimeout(2000);

  await browser.close();

  return resources;
}

async function analyze(resources, label) {
  console.log(`\n=== ${label} ===`);

  const jsResources = resources.filter((r) => r.type === 'script');
  const imageResources = resources.filter((r) => r.type === 'image');
  const youtubeResources = resources.filter((r) =>
    r.url.includes('youtube.com')
  );

  const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
  const jsSize = jsResources.reduce((sum, r) => sum + r.size, 0);
  const imageSize = imageResources.reduce((sum, r) => sum + r.size, 0);
  const youtubeSize = youtubeResources.reduce((sum, r) => sum + r.size, 0);

  console.log(`총 요청 수: ${resources.length}`);
  console.log(`총 전송 크기: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(
    `자바스크립트: ${jsResources.length}개, ${(jsSize / 1024).toFixed(2)} KB`
  );
  console.log(
    `이미지: ${imageResources.length}개, ${(imageSize / 1024).toFixed(2)} KB`
  );

  if (youtubeResources.length > 0) {
    console.log(`\nYouTube 리소스:`);
    console.log(
      `  요청 수: ${youtubeResources.length}개, ${(youtubeSize / 1024).toFixed(2)} KB`
    );

    youtubeResources.forEach((r) => {
      if (r.size > 10000) {
        console.log(
          `  - ${r.url.substring(0, 80)}... (${(r.size / 1024).toFixed(2)} KB)`
        );
      }
    });
  }

  return { totalSize, jsSize, imageSize, youtubeSize };
}

async function main() {
  console.log('YouTube iframe vs Facade 성능 측정 시작...\n');
  console.log('주의: 실제 측정 결과는 네트워크 상태와 YouTube 서버에 따라 달라질 수 있습니다.\n');

  const iframeResources = await measurePage(
    'http://localhost:8888/youtube-iframe.html',
    'YouTube iframe 로드 중...'
  );
  const iframeStats = await analyze(iframeResources, 'YouTube iframe 측정 결과');

  const facadeResources = await measurePage(
    'http://localhost:8888/youtube-facade.html',
    'YouTube Facade 로드 중...'
  );
  const facadeStats = await analyze(facadeResources, 'YouTube Facade 측정 결과 (클릭 전)');

  console.log('\n=== 비교 결과 ===');
  console.log(
    `총 크기 차이: ${((iframeStats.totalSize - facadeStats.totalSize) / 1024).toFixed(2)} KB`
  );
  console.log(
    `비율: Facade는 iframe 대비 ${((facadeStats.totalSize / iframeStats.totalSize) * 100).toFixed(1)}% 크기`
  );
  console.log(
    `절약: iframe 대비 약 ${((iframeStats.totalSize / facadeStats.totalSize).toFixed(1))}배 가벼움`
  );

  console.log('\n=== 결론 ===');
  console.log(
    `YouTube iframe: 약 ${(iframeStats.totalSize / 1024).toFixed(0)} KB`
  );
  console.log(
    `YouTube Facade: 약 ${(facadeStats.totalSize / 1024).toFixed(0)} KB`
  );
  console.log(
    `\n사용자가 재생 버튼을 클릭하지 않으면 약 ${((iframeStats.totalSize - facadeStats.totalSize) / 1024).toFixed(0)} KB를 절약할 수 있습니다.`
  );
}

main().catch(console.error);
