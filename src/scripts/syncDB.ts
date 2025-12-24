import { MongoClient } from 'mongodb'
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

const LOCAL_URI = process.env.DATABASE_URL || 'mongodb://127.0.0.1/nuvie-blog'
const REMOTE_URI = 'mongodb+srv://Vercel-Admin-atlas-pink-yacht:z0uU2Mn6AVO9flDt@atlas-pink-yacht.lpkhp8m.mongodb.net/?retryWrites=true&w=majority'

const COLLECTIONS = [
    'users',
    'media',
    'posts',
    'pages',
    'categories',
    'forms',
    'form-submissions',
    'payload-preferences',
    'payload-migrations',
    'search',
    'redirects'
]

const sync = async () => {
    console.log('Connecting to local DB...')
    const localClient = await MongoClient.connect(LOCAL_URI)
    const localDb = localClient.db()

    console.log('Connecting to remote DB...')
    const remoteClient = await MongoClient.connect(REMOTE_URI)
    // The Atlas URI might not have a DB name in path, assuming 'test' or 'nuvie-blog'
    // Let's explicitly use 'nuvie-blog' or check if one is in the URI.
    // The provided URI is ...mongodb.net/?... so no DB name.
    // I'll default to 'nuvie-blog' to match local.
    const remoteDb = remoteClient.db('nuvie-blog')

    console.log('Starting sync...')

    for (const colName of COLLECTIONS) {
        console.log(`Syncing collection: ${colName}`)
        const localCol = localDb.collection(colName)
        const remoteCol = remoteDb.collection(colName)

        const docs = await localCol.find({}).toArray()
        if (docs.length === 0) {
            console.log(`  No docs in ${colName}, skipping.`)
            continue
        }

        console.log(`  Found ${docs.length} docs in local ${colName}.`)

        // Batch write
        const ops = docs.map(doc => ({
            replaceOne: {
                filter: { _id: doc._id },
                replacement: doc,
                upsert: true
            }
        }))

        if (ops.length > 0) {
            const result = await remoteCol.bulkWrite(ops)
            console.log(`  Synced ${colName}: ${result.upsertedCount} upserted, ${result.modifiedCount} modified, ${result.matchedCount} matched.`)
        }
    }

    console.log('Sync complete.')
    await localClient.close()
    await remoteClient.close()
    process.exit(0)
}

sync().catch(err => {
    console.error('Sync failed:', err)
    process.exit(1)
})
