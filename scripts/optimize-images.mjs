import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const outputDir = path.join(publicDir, 'optimized')
const widths = [320, 480, 640, 960, 1280, 1920]
const sources = new Set()
const hero = JSON.parse(await readFile(path.join(root, 'data/hero.json'), 'utf8'))

// Discover CMS images on every build so new uploads receive the same treatment.
function collectImages(value, key = '') {
  if (value && typeof value === 'object' && value.published === false) return
  if (typeof value === 'string' && /^(image|videoPoster|heroImage)$/.test(key) && value) {
    if (/^https?:\/\//.test(value)) return
    if (/\.(png|jpe?g|webp|avif)$/i.test(value)) sources.add(`/${value.replace(/^\/+/, '')}`)
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectImages(item))
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([name, item]) => collectImages(item, name))
  }
}

for (const file of (await readdir(path.join(root, 'data'))).filter((name) => name.endsWith('.json')).sort()) {
  if (file === 'hero-slides.json' && hero.mode !== 'slideshow') continue
  collectImages(JSON.parse(await readFile(path.join(root, 'data', file), 'utf8')))
}

await mkdir(outputDir, { recursive: true })
const manifest = {}
let originalBytes = 0
let optimizedBytes = 0

for (const source of [...sources].sort()) {
  const filename = path.resolve(publicDir, `.${source}`)
  if (!filename.startsWith(`${publicDir}${path.sep}`)) throw new Error(`Image is outside public/: ${source}`)
  const buffer = await readFile(filename)
  const metadata = await sharp(buffer).metadata()
  const dimensions = metadata.autoOrient || metadata
  if (!dimensions.width || !dimensions.height) throw new Error(`Missing dimensions: ${source}`)
  const maxWidth = Math.min(dimensions.width, 1920)
  const variants = [...new Set([...widths.filter((width) => width < maxWidth), maxWidth])]
  const hash = createHash('sha256').update(buffer).update('webp-q82-v1').digest('hex').slice(0, 16)
  const images = []
  for (const width of variants) {
    const output = `${hash}-${width}.webp`
    const destination = path.join(outputDir, output)
    try {
      await stat(destination)
    } catch {
      await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(destination)
    }
    images.push({ width, src: `/optimized/${output}` })
  }
  const largest = images.at(-1)
  manifest[source] = {
    src: largest.src,
    width: dimensions.width,
    height: dimensions.height,
    srcSet: images.map(({ src, width }) => `${src} ${width}w`).join(', '),
  }
  originalBytes += buffer.length
  optimizedBytes += (await stat(path.join(publicDir, largest.src))).size
}

const socialSource = hero.videoPoster || hero.image || hero.slides?.[0]?.image
if (!socialSource || /^https?:\/\//.test(socialSource)) throw new Error('A local hero image is required for the social preview.')
await sharp(path.join(publicDir, socialSource.replace(/^\/+/, '')))
  .rotate().resize(1200, 630, { fit: 'cover' }).flatten({ background: '#171713' })
  .jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(publicDir, 'social-preview.jpg'))

await writeFile(path.join(root, 'lib/generated-media.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Optimized ${sources.size} CMS images: ${(originalBytes / 1e6).toFixed(2)} MB → ${(optimizedBytes / 1e6).toFixed(2)} MB at largest sizes (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% smaller).`)
