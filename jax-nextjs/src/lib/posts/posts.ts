// 定义文章类型
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

// 模拟获取博客文章数据
export async function getPosts(): Promise<BlogPost[]> {
  // 这里可以替换为实际的数据获取逻辑，比如从API或数据库获取
  return [
    {
      id: '1',
      title: '第一篇博客文章',
      date: '2024-03-02',
      content: '这是第一篇博客文章的内容...'
    },
    {
      id: '2',
      title: '第二篇博客文章',
      date: '2024-03-01',
      content: '这是第二篇博客文章的内容...'
    }
  ];
}
