import fs from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const baseUrl = process.env.MOCKUP_BASE_URL || 'http://127.0.0.1:4173'
const rootDir = process.cwd()
const outputDir = path.join(rootDir, 'docs', 'mockups')

const desktopViewport = { width: 1440, height: 1400, deviceScaleFactor: 1 }
const mobileViewport = {
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
}

const desktopScreens = [
  { file: 'desktop-home.png', route: '/', waitFor: 'main, section' },
  { file: 'desktop-map.png', route: '/map', waitFor: 'aside, section' },
  { file: 'desktop-club.png', route: '/club', waitFor: 'main' },
  { file: 'desktop-club-events.png', route: '/club/events', waitFor: 'main' },
  { file: 'desktop-booking.png', route: '/club/book', waitFor: 'main' },
  { file: 'desktop-pricing.png', route: '/pricing', waitFor: 'main' },
  { file: 'desktop-auth-login.png', route: '/auth?tab=login', waitFor: 'main' },
  { file: 'desktop-auth-signup.png', route: '/auth?tab=signup', waitFor: 'main' },
  { file: 'desktop-forgot-password.png', route: '/forgot-password', waitFor: 'main' },
  { file: 'desktop-admin.png', route: '/admin', waitFor: 'main' },
]

const mobileScreens = [
  { file: 'mobile-home.png', route: '/', waitFor: 'main, section' },
  { file: 'mobile-map.png', route: '/map', waitFor: 'div' },
  { file: 'mobile-club.png', route: '/club', waitFor: 'main' },
  { file: 'mobile-booking.png', route: '/club/book', waitFor: 'main' },
  { file: 'mobile-pricing.png', route: '/pricing', waitFor: 'main' },
  { file: 'mobile-auth-login.png', route: '/auth?tab=login', waitFor: 'main' },
]

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function captureSet(browser, screens, viewport, subdir) {
  const dir = path.join(outputDir, subdir)
  await ensureDir(dir)

  for (const screen of screens) {
    const page = await browser.newPage()
    await page.setViewport(viewport)
    await page.goto(`${baseUrl}${screen.route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector(screen.waitFor, { timeout: 10000 })
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise(resolve => setTimeout(resolve, 900))
    await page.screenshot({
      path: path.join(dir, screen.file),
      fullPage: true,
    })
    await page.close()
  }
}

async function main() {
  await ensureDir(outputDir)

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
    args: ['--no-sandbox'],
  })

  try {
    await captureSet(browser, desktopScreens, desktopViewport, 'desktop')
    await captureSet(browser, mobileScreens, mobileViewport, 'mobile')
  } finally {
    await browser.close()
  }

  console.log(`Saved mockups under ${outputDir}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
