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

const checkSearch = async () => {
  // Dynamic import to ensure env vars are loaded first
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })


  const searchResults = await payload.find({
    collection: 'search',
    limit: 100,
  })

  console.log(`Found ${searchResults.totalDocs} documents in search collection.`)
  searchResults.docs.forEach((doc) => {
    console.log(`[SEARCH] - ${doc.doc.relationTo}: ${doc.title} (Slug: ${doc.slug})`)
  })

  console.log('\nFetching all posts to compare...')
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    draft: true, // Include drafts
  })

  console.log(`Found ${posts.totalDocs} posts in Posts collection:`)
  posts.docs.forEach((post) => {
    console.log(`[POST] - ${post.title} (Status: ${post._status}, Slug: ${post.slug})`)
  })

  process.exit(0)
}

checkSearch()
