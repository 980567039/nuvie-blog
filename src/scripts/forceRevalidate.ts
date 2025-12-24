import 'dotenv/config'
import { revalidatePath } from 'next/cache'

const forceRevalidate = async () => {
  console.log('正在强制刷新前台缓存...')

  try {
    revalidatePath('/')
    revalidatePath('/posts')
    console.log('✅ 首页缓存已刷新')
    console.log('✅ 文章列表页缓存已刷新')
  } catch (error) {
    console.error('❌ 刷新失败:', error)
  }

  process.exit(0)
}

forceRevalidate()
