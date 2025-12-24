import { getPayload } from 'payload'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../../.env'),
})
if (!process.env.PAYLOAD_SECRET) {
  dotenv.config({
    path: path.resolve(dirname, '../../.env.local'),
  })
}

if (!process.env.PAYLOAD_SECRET) {
    console.error('Error: PAYLOAD_SECRET not found in .env or .env.local')
    process.exit(1)
}

const reindexSearch = async () => {
  // Dynamic import to ensure env vars are loaded first
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })

  console.log('Fetching all posts...')
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  console.log(`Found ${posts.totalDocs} posts. Re-saving to trigger search sync...`)

  for (const post of posts.docs) {
    try {
      console.log(`Re-indexing post: ${post.title}`)
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          title: post.title, // Just touching a field to trigger hooks
        },
        context: {
          disableRevalidate: true,
        },
      })
    } catch (e) {
      console.error(`Failed to re-index post ${post.id}:`, e)
    }
  }

  console.log('Re-indexing complete.')
  process.exit(0)
}

reindexSearch()
