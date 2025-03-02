## 如何创建布局和页面
Nextjs 使用基于文件系统的路由 来创建页面。

1. 创建页面 create page 
页面 是在特定路由上 呈现的 UI 

export default function Page() {
  return <h1>Hello Next.js!</h1>
}
2. 创建布局 create layout
布局的意思就是在多个页面之间共享的ui 在导航时，布局会保留状态，保持交互性，并且不会重新呈现。

默认情况下， 我们可以定义一个布局，从布局文件中导出一个 React 组件，该组件应该接受一个children属性。 他可以是一个页面或其他布局

上面的布局称为根布局，因为它是在 app 目录的根目录下定义的。根布局是必需的，并且必须包含 html 和 body 标签。

3. 创建嵌套路由 
嵌套路由是由多个url段组成的路由， / 根段  
blog （Segment）  blog（Segment）段
[slug] 叶段

- 在nextjs中，文件夹 folders 用于定义映射到url段的路由段
文件 page、layout 用于创建为区段显示的UI

比如，要创建嵌套路由，要为 /blog 添加路由，我们要在 app 目录中创建一个名为 blog的文件夹，要使  /blog 可公开访问，创建一个 blog.js 文件，并导出一个 React 组件。

继续嵌套文件夹，比如为一个特定的博客文章创建路由，在 blog 文件夹下创建新的 [slug]  文件夹并添加 page文件

function generateStaticParams() {}
 
export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}


4. Nesting layouts 嵌套布局
嵌套布局允许我们为嵌套的页面定义布局。
比如 要为 /blog 路由创建布局，在 blog 文件夹中添加新的 layout 文件

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

如果要组合这两种布局，根布局 app/layout.tsx 将包装博客 （app/blog/layout.tsx），而博客布局 （app/blog/layout.tsx）将包装博客文章页面（app/blog/[slug]/page.tsx）

5. Linking between pages    页面之间的链接

使用 <Link> 组件在路由之间导航。<Link> 是一个内置的 Next.js 组件，它扩展了 HTML <a> 标记以提供预取和客户端导航。

比如，要生成博客文章列表，可以使用 link ，并将 href 属性传递给组件

```
import Link from 'next/link'
 
export default async function Post({ post }) {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

<link> 是在nextjs 应用程序中的路由之间导航的主要和推荐方式，也可以使用 userouter 钩子进行更高级的导航





