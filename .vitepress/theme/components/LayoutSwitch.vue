<script setup>
import { ref, onMounted } from 'vue'

const isWide = ref(false)

// 切换宽屏模式的函数
const toggleWideMode = () => {
  isWide.value = !isWide.value
  if (isWide.value) {
    document.body.classList.add('wide-mode')
    localStorage.setItem('layout-mode', 'wide') // 记住用户的选择
  } else {
    document.body.classList.remove('wide-mode')
    localStorage.setItem('layout-mode', 'normal')
  }
}

// 页面加载时，读取之前的选择
onMounted(() => {
  const savedMode = localStorage.getItem('layout-mode')
  if (savedMode === 'wide') {
    isWide.value = true
    document.body.classList.add('wide-mode')
  }
})
</script>

<template>
  <button 
    class="layout-switch-btn" 
    @click="toggleWideMode" 
    title="切换宽屏模式"
  >
    <span v-if="isWide">窄屏</span>
    <span v-else>宽屏</span>
  </button>
</template>

<style scoped>
.layout-switch-btn {
  font-size: 14px;
  margin-left: 10px;
  padding: 0 8px;
  height: 32px;
  line-height: 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: all 0.2s;
}

.layout-switch-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
</style>
