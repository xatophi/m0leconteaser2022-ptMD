const puppeteer = require('puppeteer')

const browser = await puppeteer.launch({
    headless: true,
    args: [
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-gpu',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--no-sandbox',
        '--safebrowsing-disable-auto-update'
    ],
    executablePath: '/usr/bin/google-chrome'
})

let page = await browser.newPage()


await page.goto('http://localhost:3000/login')
await page.waitForSelector('#username')
await page.focus('#username')
await page.keyboard.type('xato', { delay: 10 })
await page.focus('#password')
await page.keyboard.type('password123', { delay: 10 })
await page.click('#submit')

await page.waitForNavigation({ waitUntil: 'networkidle2' });



url = 'http://localhost:3000/document/c439b182-856c-4478-a879-d425f7d48b8e'
await page.goto(url)
await new Promise(resolve => setTimeout(resolve, 1000));
await page.click('#logout')
