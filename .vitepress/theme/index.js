import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import LayoutSwitch from './components/LayoutSwitch.vue' // 引入刚才写的组件
import './style.css' // 引入样式

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 把按钮塞到导航栏右侧
      'nav-bar-content-after': () => h(LayoutSwitch)
    })
  }
}
