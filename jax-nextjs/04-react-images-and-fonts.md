## 如何优化图像和字体 
nextjs 可以自动优化图像和字体
handing static assets 处理静态资源

可以将静态文件 存储在public 的文件夹中， 代码可以从基 URL、 / 开始引用 public 中的文件。

Optimizing images  优化图像

Next js <image> 组件扩展了HTML <img> 元素

- Size optimization 大小优化：使用webp等现代图像格式，为每个设备自动提供正确大小的图像，
- Visual stability 视觉稳定性： 防止在加载图像时自动 layout shift 移动布局
- faster page loads 更快地页面加载： 仅在图像进入视区时使用本机浏览器延迟加载，并使用可选的模糊占位符
- Asset flexibility 资源灵活性：按需调整图像大小，甚至是存储在远程服务器上的图像，
要开始使用 <Image>,需要从 next/image 中导入。 在组件中渲染他。

```tsx
import Image from 'next/image'
 
export default function Page() {
  return <Image src="" alt="" />
}
```

src 属性可以是本地或远程映像。

Local images 本地图像
要使用本地映像，从 public  文件夹导入 .JPG .PNG 或 .WEBP 映像文件。
```tsx
import Image from 'next/image'
import profilePic from './me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
     
     {/*} import Image from 'next/image'
          导入 Next.js 的内置 Image 组件
          这个组件是对 HTML 的 <img> 标签的增强版本，提供了多种优化功能 
       import profilePic from './me.png'
直接导入本地图片文件
Next.js 会在构建时自动优化这个图片
导入的 profilePic 变量会包含图片的优化后的路径和元数据
<Image> 组件的属性：
          src={profilePic}: 图片源，这里使用导入的本地图片
alt="Picture of the author": 图片的替代文本，对可访问性很重要
自动提供的功能（注释中提到的）：
width 和 height: 对于本地图片，Next.js 会自动提供这些值
blurDataURL: 一个模糊的占位图片的 base64 编码，用于图片加载时显示
placeholder="blur": 可选的模糊加载效果，在图片加载时显示模糊的预览  /*/}
      
    />
  )
}
```

remote images 远程映像
要使用远程映像 直接给src 属性提供 URL 字符串

```tsx  
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}

```

nextjs 在构建中无法访问远程文件，所以需要手动提供 width 和 height  和 blurDataURL 属性，width 和 height 属性是必须的，blurDataURL 是可选的。 
blurDataURL 属性是一个 base64 编码的模糊占位图片，用于在图片加载时显示模糊的预览。
要安全的访问来自远程服务器的图像，需要在next.config.js 中定义支持的URL 模式列表，
比如： 仅允许特定 AWS S3   存储桶的图像

```tsx
import { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}
 
export default config
```

### 优化字体
next/font 模块会自动优化字体并删除外部网络请求，以提高隐私和性能。

他包括 任何字体文件的内置自动自托管。

使用next/font 模块，需要从 next/font/local 或者 next/font/google 导入字体。将其作为具有适当函数调用，并设置要应用字体的元素的 ClassName 
```tsx
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```
### Google fonts
使用 Google Fonts 的字体，需要从 next/font/google 导入字体。 
```tsx
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

### local fonts 本地字体

使用本地字体，需要从 next/font/local 导入字体。 并在 public 文件夹中指定本地字体文件的src

```tsx
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './my-font.woff2',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```
 单个字体系列使用多个文件， src 也是一个数组。 


const roboto = localFont({
  src: [
    {
      path: './Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})


