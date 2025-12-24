import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const addPosts = async () => {
  const payload = await getPayload({ config })

  console.log('正在创建测试文章...')

  const posts = [
    {
      title: '测试文章 1：如何使用 Payload CMS',
      slug: 'how-to-use-payload-cms',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: '这是第一篇测试文章的内容。Payload 是一个非常强大的无头 CMS。',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      },
      _status: 'published',
    },
    {
      title: '测试文章 2：Next.js 与 Payload 的完美结合',
      slug: 'nextjs-and-payload',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: '使用 App Router 构建现代化的博客网站非常容易。',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      },
      _status: 'published',
    },
    {
      title: '测试文章 3：Vercel 部署指南',
      slug: 'vercel-deployment-guide',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: '将你的应用部署到全球最快的边缘网络。',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      },
      _status: 'published',
    },
  ]

  for (const post of posts) {
    try {
      await payload.create({
        collection: 'posts',
        data: post as any,
      })
      console.log(`✅ 已创建: ${post.title}`)
    } catch (error) {
      console.error(`❌ 创建失败 ${post.title}:`, error)
    }
  }

  console.log('所有测试文章创建完成！')
  process.exit(0)
}

addPosts()
