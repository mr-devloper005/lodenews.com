import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svgPath = join(root, 'public/brand/lode-mark.svg')
const svg = readFileSync(svgPath)

async function main() {
  await sharp(svg).resize(32, 32).png().toFile(join(root, 'public/favicon.png'))
  await sharp(svg).resize(180, 180).png().toFile(join(root, 'src/app/apple-icon.png'))
  console.log('Wrote public/favicon.png, src/app/apple-icon.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
