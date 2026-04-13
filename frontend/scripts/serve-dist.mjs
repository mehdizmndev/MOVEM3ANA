import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const port = Number(process.env.PORT || 4173)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}

function resolveRequestPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0])
  const candidate =
    cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\/+/, '')

  if (path.extname(candidate)) {
    return path.join(distDir, candidate)
  }

  return path.join(distDir, 'index.html')
}

async function sendFile(response, filePath) {
  const contents = await fs.readFile(filePath)
  const ext = path.extname(filePath)
  response.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
  })
  response.end(contents)
}

const server = http.createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url || '/')
    await sendFile(response, filePath)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Static dist server running at http://127.0.0.1:${port}`)
})
