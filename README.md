# Payload 网站模板

核心功能：

- [预配置的 Payload 配置](#工作原理)
- [认证](#用户认证)
- [访问控制](#访问控制)
- [布局构建器](#布局构建器)
- [草稿预览](#草稿预览)
- [实时预览](#实时预览)
- [按需重新验证](#按需重新验证)
- [SEO](#seo)
- [搜索](#搜索)
- [重定向](#重定向)
- [任务和定时发布](#任务和定时发布)
- [网站](#网站)

## 快速开始

要在本地启动此示例，请按照以下步骤操作：

### 开发

1. `pnpm install && pnpm dev` 安装依赖项并启动开发服务器。
2. 打开 `http://localhost:3000` 在浏览器中访问应用程序。

就是这样！在 `./src` 中所做的更改将反映在你的应用程序中。按照屏幕上的说明登录并创建你的第一个管理员用户。准备好构建和提供应用程序服务时，请查看 [生产环境](#生产环境)；准备好上线时，请查看 [部署](#部署)。

### 集合

有关如何扩展此功能的详细信息，请参阅 [集合](https://payloadcms.com/docs/configuration/collections) 文档。

- #### 用户 (认证)

  用户是启用了认证的集合，可以访问管理面板和未发布的内容。有关更多详细信息，请参阅 [访问控制](#访问控制)。

- #### 文章 (Posts)

  文章用于生成博客文章、新闻报道或任何其他随时间发布的内容。所有文章都启用了布局构建器，因此你可以使用布局构建块为每篇文章生成独特的布局，有关更多详细信息，请参阅 [布局构建器](#布局构建器)。文章还启用了草稿功能，因此你可以在发布到网站之前预览它们，有关更多详细信息，请参阅 [草稿预览](#草稿预览)。

- #### 页面 (Pages)

  所有页面都启用了布局构建器，因此你可以使用布局构建块为每个页面生成独特的布局，有关更多详细信息，请参阅 [布局构建器](#布局构建器)。页面还启用了草稿功能，因此你可以在发布到网站之前预览它们，有关更多详细信息，请参阅 [草稿预览](#草稿预览)。

- #### 媒体 (Media)

  这是页面、文章和项目用于包含图像、视频、下载和其他资产的启用上传的集合。它具有预配置的尺寸、焦点和手动调整大小功能，以帮助你管理图片。

- #### 分类 (Categories)

  用于将文章分组在一起的分类法。分类可以嵌套在彼此内部，例如“新闻 > 技术”。有关更多详细信息，请参阅官方 [Payload 嵌套文档插件](https://payloadcms.com/docs/plugins/nested-docs)。

### 全局变量

有关如何扩展此功能的详细信息，请参阅 [全局变量](https://payloadcms.com/docs/configuration/globals) 文档。

- `Header` (页眉)

  前端页眉所需的数据，如导航链接。

- `Footer` (页脚)

  同上，但用于网站的页脚。

## 访问控制

设置了基本的访问控制，以根据发布状态限制对各种内容的访问。

- `users`: 用户可以访问管理面板并创建或编辑内容。
- `posts`: 所有人都可以访问已发布的文章，但只有用户可以创建、更新或删除它们。
- `pages`: 所有人都可以访问已发布的页面，但只有用户可以创建、更新或删除它们。

有关如何扩展此功能的更多详细信息，请参阅 [Payload 访问控制](https://payloadcms.com/docs/access-control/overview#access-control) 文档。

## 布局构建器

使用强大的布局构建器为任何类型的内容创建独特的页面布局。此模板预先配置了以下布局构建块：

- Hero (主视觉)
- Content (内容)
- Media (媒体)
- Call To Action (行动号召)
- Archive (归档)

每个块都经过精心设计并内置于此模板附带的前端网站中。有关更多详细信息，请参阅 [网站](#网站)。

## Lexical 编辑器

深度的编辑体验，允许完全自由地专注于编写内容，而不会脱离流程，支持 Payload 块、媒体、链接和开箱即用的其他功能。请参阅 [Lexical](https://payloadcms.com/docs/rich-text/overview) 文档。

## 草稿预览

所有文章和页面都启用了草稿功能，因此你可以在发布到网站之前预览它们。为此，这些集合使用 [版本](https://payloadcms.com/docs/configuration/collections#versions)，并将 `drafts` 设置为 `true`。这意味着当你创建新文章、项目或页面时，它将保存为草稿，在你发布之前不会在你的网站上可见。这也意味着你可以在发布到网站之前预览草稿。为此，我们会自动格式化一个自定义 URL，该 URL 重定向到你的前端以安全地获取内容的草稿版本。

由于此模板的前端是静态生成的，这也意味着随着对已发布文档的更改，页面、文章和项目将需要重新生成。为此，我们使用 `afterChange` 钩子在文档已更改且其 `_status` 为 `published` 时重新生成前端。

有关如何扩展此功能的更多详细信息，请参阅官方 [草稿预览示例](https://github.com/payloadcms/payload/tree/examples/draft-preview)。

## 实时预览

除了草稿预览之外，你还可以启用实时预览，以便在编辑内容时查看最终结果页面，并完全支持 SSR 渲染。有关更多详细信息，请参阅 [实时预览文档](https://payloadcms.com/docs/live-preview/overview)。

## 按需重新验证

我们已向集合和全局变量添加了钩子，以便通过 Next.js 支持的按需重新验证，在前端自动更新你的所有页面、文章、页脚或页眉更改。

> 注意：如果图像已更改（例如已被裁剪），你需要重新发布使用了该图像的页面，以便能够重新验证 Next.js 图像缓存。

## SEO

此模板预先配置了官方 [Payload SEO 插件](https://payloadcms.com/docs/plugins/seo)，用于从管理面板进行完整的 SEO 控制。所有 SEO 数据都完全集成到此模板附带的前端网站中。有关更多详细信息，请参阅 [网站](#网站)。

## 搜索

此模板还预先配置了官方 [Payload 搜索插件](https://payloadcms.com/docs/plugins/search)，以展示如何轻松地将 SSR 搜索功能通过 Payload 实现到 Next.js 中。有关更多详细信息，请参阅 [网站](#网站)。

## 重定向

如果你正在迁移现有网站或将内容移动到新 URL，可以使用 `redirects` 集合创建从旧 URL 到新 URL 的适当重定向。这将确保向搜索引擎返回正确的请求状态代码，并且你的用户不会遇到断链。此模板预先配置了官方 [Payload 重定向插件](https://payloadcms.com/docs/plugins/redirects)，用于从管理面板进行完全的重定向控制。所有重定向都完全集成到此模板附带的前端网站中。有关更多详细信息，请参阅 [网站](#网站)。

## 任务和定时发布

我们配置了 [定时发布](https://payloadcms.com/docs/versions/drafts#scheduled-publish)，它使用 [任务队列](https://payloadcms.com/docs/jobs-queue/jobs) 以便在预定时间发布或取消发布你的内容。这些任务按 cron 计划运行，如果需要，也可以作为单独的实例运行。

> 注意：当部署在 Vercel 上时，根据计划层级，你可能仅限于每日 cron。

## 网站

此模板包含一个设计精美、可用于生产环境的前端，使用 [Next.js App Router](https://nextjs.org) 构建，与你的 Payload 应用程序在一个实例中同时提供服务。这使得你可以在需要的地方同时部署后端和网站。

核心功能：

- [Next.js App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS 样式](https://tailwindcss.com/)
- [shadcn/ui 组件](https://ui.shadcn.com/)
- 用户账户和认证
- 功能齐全的博客
- 发布工作流
- 深色模式
- 预制的布局构建块
- SEO
- 搜索
- 重定向
- 实时预览

### 缓存

虽然 Next.js 开箱即用地包含一套强大的缓存策略，但 Payload Cloud 通过使用 [官方 Cloud 插件](https://www.npmjs.com/package/@payloadcms/payload-cloud) 通过 Cloudflare 代理和缓存所有文件。这意味着不需要 Next.js 缓存，并且默认情况下已禁用。如果你在 Payload Cloud 之外托管你的应用程序，你可以通过从 `./src/app/_api` 中的所有获取请求中删除 `no-store` 指令，然后从页面文件中（例如 `./src/app/(pages)/[slug]/page.tsx`）删除所有 `export const dynamic = 'force-dynamic'` 实例，轻松重新启用 Next.js 缓存机制。有关更多详细信息，请参阅官方 [Next.js 缓存文档](https://nextjs.org/docs/app/building-your-application/caching)。

## 开发

要在本地启动此示例，请按照 [快速开始](#快速开始) 操作。然后 [填充 (Seed)](#填充数据) 数据库，其中包含一些页面、文章和项目。

#### 本地开发

理想情况下，我们建议运行数据库的本地副本，以便架构更新尽可能快。默认情况下，Postgres 适配器在开发环境中具有 `push: true`。这将允许你添加、修改和删除字段和集合，而无需运行任何数据迁移。

如果你的数据库指向生产环境，你将需要设置 `push: false`，否则你将面临丢失数据或迁移不同步的风险。

#### 迁移

[迁移 (Migrations)](https://payloadcms.com/docs/database/migrations) 本质上是 SQL 代码版本，用于跟踪你的架构。在使用 Postgres 部署时，你需要确保创建并运行迁移。

在本地创建迁移

```bash
pnpm payload migrate:create
```

这将创建你需要随新配置一起推送的迁移文件。

在构建之后并在运行 `pnpm start` 之前，你需要在服务器上运行迁移

```bash
pnpm payload migrate
```

此命令将检查尚未运行的任何迁移并尝试运行它们，并且它将在数据库中保留已运行迁移的记录。

### Docker

或者，你可以使用 [Docker](https://www.docker.com) 在本地启动此模板。为此，请按照以下步骤操作：

1. 按照 [上面的步骤 1 和 2](#开发)，docker-compose 文件将自动使用项目根目录中的 `.env` 文件
2. 接下来运行 `docker-compose up`
3. 按照 [上面的步骤 4 和 5](#开发) 登录并创建你的第一个管理员用户

就是这样！Docker 实例将帮助你快速启动并运行，同时也使团队之间的开发环境标准化。

### 填充数据 (Seed)

要使用一些页面、文章和项目填充数据库，你可以点击管理面板中的“seed database”链接。

种子脚本还将创建一个仅用于演示目的的演示用户：

- 演示作者
  - 邮箱: `demo-author@payloadcms.com`
  - 密码: `password`

> 注意：填充数据库具有破坏性，因为它会删除当前数据库以从种子模板填充一个新数据库。仅当你正在开始新项目或可以承受丢失当前数据时才运行此命令。

### 部署到 Vercel

此模板也可以免费部署到 Vercel。你可以通过在模板设置期间选择 Vercel DB 适配器或手动安装和配置它来开始：

```bash
vercel
vercel --prod
```
