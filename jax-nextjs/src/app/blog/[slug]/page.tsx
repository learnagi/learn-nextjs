import { getPosts } from '@/lib/posts/posts'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const posts = await getPosts()
  const post = posts.find((p) => p.id === params.slug)

  if (!post) {
    return <div>文章未找到</div>
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.title}</h1>
      <time className="text-gray-500">{post.date}</time>
      <div className="mt-8">{post.content}</div>
    </article>
  )
}
