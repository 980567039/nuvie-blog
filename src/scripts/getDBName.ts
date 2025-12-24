import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../../.env'),
})
if (!process.env.DATABASE_URL) {
  dotenv.config({
    path: path.resolve(dirname, '../../.env.local'),
  })
}

console.log(process.env.DATABASE_URL)
