import { BlogPost } from '@/lib/posts/posts'
import Link from 'next/link'

interface PostProps {
  post: BlogPost;
}

export function Post({ post }: PostProps) {
  return (
    <li className="mb-4">
      <article>
        <Link href={`/blog/${post.id}`}>
          <h2 className="text-xl font-bold hover:text-blue-600">{post.title}</h2>
        </Link>
        <time className="text-sm text-gray-500">{post.date}</time>
        <p className="mt-2">{post.content}</p>
      </article>
    </li>
  );
}
