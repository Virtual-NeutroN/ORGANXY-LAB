import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'


// ==============================================
// 1. 侧边栏生成与修复逻辑 (复用之前的核武器函数)
// ==============================================

// 修复路径前缀的通用函数
function fixSidebarPaths(items, prefix) {
  if (!items) return []
  return items.map(item => {
    if (item.link && !item.link.startsWith(prefix)) {
      const cleanLink = item.link.replace(/^\//, '')
      item.link = `${prefix}${cleanLink}`
    }
    if (item.items) {
      item.items = fixSidebarPaths(item.items, prefix)
    }
    return item
  })
}

// A. 生成 [笔记] 的原始数据
const rawNotesSidebar = generateSidebar({
  documentRootPath: '.',
  scanStartPath: 'notes',     // 扫描 notes 文件夹
  useTitleFromFileHeading: true,
  collapsed: true,
  excludeFiles: ['index.md']
})

// B. 生成 [工具] 的原始数据 【新增部分】
const rawToolsSidebar = generateSidebar({
  documentRootPath: '.',
  scanStartPath: 'tools',     // 扫描 tools 文件夹
  useTitleFromFileHeading: true,
  collapsed: false,           // 工具通常不多，建议默认展开
  excludeFiles: ['index.md']
})

// C. 生成 [工具] 的原始数据 【新增部分】
const rawBotsSidebar = generateSidebar({
  documentRootPath: '.',
  scanStartPath: 'bots',     // 扫描 bots 文件夹
  useTitleFromFileHeading: true,
  collapsed: false,           // 工具通常不多，建议默认展开
  excludeFiles: ['index.md']
})


// D. 分别修复路径
const fixedNotesSidebar = fixSidebarPaths(rawNotesSidebar, '/notes/')
const fixedToolsSidebar = fixSidebarPaths(rawToolsSidebar, '/tools/')
const fixedBotsSidebar = fixSidebarPaths(rawBotsSidebar, '/bots/')

export default defineConfig({
  ignoreDeadLinks: true,
  base: '/ORGANXY-LAB/',
  title: "OrganxyLab",
  description: "Navigate Thy Veritas.",

 head: [
    // 1. 【必须先放这个】配置 Tailwind
    [
      'script',
      {},
      `
        window.tailwind = {
          config: {
            corePlugins: {
              preflight: false, // 禁用全局重置
            }
          }
        }
      `
    ],
    // 2. 【然后再放这个】加载 CDN
    [
      'script',
      // 加个 defer，让它别跑那么快，等页面解析差不多了再运行
      { src: 'https://cdn.tailwindcss.com', defer: '' }
    ]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '进入笔记库', link: '/notes/index' },
      { text: '进入工具库', link: '/tools/index' } 
    ],

    sidebar: {
      '/notes/': fixedNotesSidebar,
      '/tools/': fixedToolsSidebar,
      '/bots/': fixedBotsSidebar
    },

    search: {
      provider: 'local'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Virtual-NeutroN' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 Organxy Lab'
    },

    docFooter: {
      prev: '上一页', 
      next: '下一页'  
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  }
})