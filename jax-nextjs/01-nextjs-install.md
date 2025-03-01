# 如何设置新的 Next.js 项目
首先系统要求  Node.js 18.18 版本，支持macOS，windows，linux。

1. 安装 Node.js（自动安装）
命令行：npx create-next-app@latest
这个命令会自动安装最新版本的 Next.js应用程序 和相关依赖。

安装的时候，会提示是否安装依赖，选择y
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*

输入完之后，creat-next-app 会自动创建一个项目并安装所需的依赖项

package.json中

  //dev,执行next dev --turbopack  以开发模式启动Next.js应用
    //build,执行next build  以生产模式启动Next.js应用
    //start,执行next start  以启动Next.js生产服务器
    //lint,执行next lint  来设置Next.js的内置ESlint配置


2. 手动安装
命令行：npm install next@latest react@latest react-dom@latest
在package.json中添加下面代码：
{
  "scripts": {
    "dev": "next dev",//执行next dev  以开发模式启动Next.js应用
    "build": "next build",//执行next build  以生产模式启动Next.js应用
    "start": "next start",//执行next start  以启动Next.js生产服务器
    "lint": "next lint"//执行next lint  来设置Next.js的内置ESlint配置
  }
}
创建 app 目录
然后添加 layout.tsx 和 page.tsx 文件，在用户访问app的根目录 （ / ）时，layout.tsx文件会渲染，page.tsx文件会渲染。
 
再 在app/layout.tsx中创建一个带有 <html> 和 <body>标签的根布局，

最后，再创建一个包含一些初始内容的主页 app/page.tsx

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}

// 如果忘记创建 layout.tsx 文件，Next.js ,在使用 next dev 运行开发服务器的时候会自动创建此文件
 也可以在根目录中使用 src 目录来分隔应用程序的代码和配置文件。

 创建 public 文件夹，
 public 文件夹 用于存储资源，如 图像，字体等
 引用public 文件夹中的资源，使用相对路径，例如： /public/logo.png

 运行开发服务器
 1. npm run dev 运行这条命令启动开发服务器，然后打开 http://localhost:3000 就可以查看应用程序了


 设置 TypeScript   
 因为 Next.js 带有内置的TypeScript支持， 要将typescript添加到项目中 需要将文件命名为 .ts/.tsx
 运行 next dev Next.js 将自动安装必要的依赖项并添加带有推荐配置的选项的 tsconfig.json 文件。

 IDE  Plugin 
 Next.js 包含一个自定义TypeScript插件和类型检查器，Vscode和其他编辑器 可以用于高级类型检查和自动完成。


 ## 设置 ESLint

 Next.js 带有内置的 ESLint，使用 create-next-app 创建新项目时，它会自动安装必要的包并配置适当的设置。

要将 ESLint 添加到现有项目中，将 next lint 作为脚本添加到 package.json：
{
  "scripts": {
    "lint": "next lint"
  }
}

设置 Absolute Imports 和 Module Path Aliases

Next.js 内置了对 tsconfig.json 和 jsconfig.json 文件的 “paths” 和 “baseUrl” 选项的支持。这些选项允许您将项目目录别名为绝对路径，从而更轻松地导入模块。

// Before
import { Button } from '../../../components/button'
 
// After
import { Button } from '@/components/button'

要配置绝对导入，将 baseUrl  配置选项添加到您的tsconfig.json或jsconfig.json文件中：
{
  "compilerOptions": {
    "baseUrl":" / " 
  }
}

除了配置 baseUrl ，还可以使用  paths 选项 alias 模块路径，以便将别名映射到实际的文件路径。
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}

每个paths都相对于 baseUrl位置

import Button from '@/components/button'
import '@/styles/styles.css'
 
export default function HomePage() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button />
    </div>
  )
}
