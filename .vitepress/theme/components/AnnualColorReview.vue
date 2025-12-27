<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { Upload, X, Download, Palette, RefreshCcw, Image as ImageIcon, Trash2, Plus, Edit2, Sliders } from 'lucide-vue-next';

// ----------------------------------------------------------------------
// 1. 核心算法工具函数
// ----------------------------------------------------------------------

const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
};

const colorDistance = (color1, color2) => {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
};

const extractColorsFromImage = (imgElement, colorCount = 5) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const width = 100;
  const height = 100;
  canvas.width = width;
  canvas.height = height;
  
  ctx.drawImage(imgElement, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;
  
  const pixelColors = [];
  for (let i = 0; i < imageData.length; i += 4 * 5) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];
    if (a < 128) continue; 
    pixelColors.push([r, g, b]);
  }

  const quantized = [];
  const threshold = 30;

  pixelColors.forEach(color => {
    let found = false;
    for (let i = 0; i < quantized.length; i++) {
      if (colorDistance(color, quantized[i].color) < threshold) {
        quantized[i].count++;
        found = true;
        break;
      }
    }
    if (!found) {
      quantized.push({ color, count: 1 });
    }
  });

  quantized.sort((a, b) => b.count - a.count);

  return quantized.slice(0, colorCount).map(item => {
    const [r, g, b] = item.color;
    return {
      rgb: item.color,
      hex: rgbToHex(r, g, b),
      hsl: rgbToHsl(r, g, b)
    };
  });
};

// ----------------------------------------------------------------------
// 2. Vue 组件逻辑
// ----------------------------------------------------------------------

const images = ref([]);
const isProcessing = ref(false);
const sampleCount = ref(5);
const isDragging = ref(false);
const fileInputRef = ref(null);

const processFiles = async (files) => {
  if (files.length === 0) return;

  isProcessing.value = true;
  const newImages = [];
  
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;
    try {
      const result = await processSingleFile(file, sampleCount.value);
      newImages.push(result);
    } catch (e) {
      console.error("Error processing file", file.name, e);
    }
  }

  images.value = [...images.value, ...newImages];
  isProcessing.value = false;
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const handleFileUpload = (event) => {
  processFiles(Array.from(event.target.files));
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  processFiles(files);
};

const processSingleFile = (fileOrUrl, count) => {
  return new Promise((resolve, reject) => {
    if (fileOrUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
         loadImageAndExtract(e.target.result, fileOrUrl.name, count, resolve, reject);
      };
      reader.readAsDataURL(fileOrUrl);
    } else {
      loadImageAndExtract(fileOrUrl.src, fileOrUrl.name, count, resolve, reject, fileOrUrl.id);
    }
  });
};

const loadImageAndExtract = (src, name, count, resolve, reject, existingId = null) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const colors = extractColorsFromImage(img, count);
    resolve({
      id: existingId || Math.random().toString(36).substr(2, 9),
      name: name,
      src: src,
      colors: colors
    });
  };
  img.onerror = reject;
};

const handleSampleCountChange = async (e) => {
  const newCount = parseInt(e.target.value, 10);
  sampleCount.value = newCount;
  if (images.value.length === 0) return;

  isProcessing.value = true;
  const processedPromises = images.value.map(img => processSingleFile({ src: img.src, name: img.name, id: img.id }, newCount));
  
  try {
      const updatedImages = await Promise.all(processedPromises);
      images.value = updatedImages;
  } catch (err) {
      console.error("Error reprocessing images", err);
  } finally {
      isProcessing.value = false;
  }
};

const handleColorChange = (imgId, colorIndex, newHex) => {
  const img = images.value.find(i => i.id === imgId);
  if (img) {
    const rgb = hexToRgb(newHex);
    const hsl = rgbToHsl(...rgb);
    img.colors[colorIndex] = { rgb, hex: newHex, hsl };
  }
};

const handleAddColor = (imgId, newHex) => {
  const img = images.value.find(i => i.id === imgId);
  if (img) {
    const rgb = hexToRgb(newHex);
    const hsl = rgbToHsl(...rgb);
    img.colors.push({ rgb, hex: newHex, hsl });
  }
};

const handleRemoveColor = (imgId, colorIndex) => {
  const img = images.value.find(i => i.id === imgId);
  if (img) {
    img.colors.splice(colorIndex, 1);
  }
};

const removeImage = (id) => {
  images.value = images.value.filter(img => img.id !== id);
};

const clearAll = () => {
  images.value = [];
};

const globalPalette = computed(() => {
  const allColors = images.value.flatMap(img => img.colors);
  return allColors.sort((a, b) => a.hsl[0] - b.hsl[0]);
});

const downloadSpectrum = () => {
  if (globalPalette.value.length === 0) return;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const width = 4000;
  const height = 600;
  const barHeight = 450;
  const fontSizeTitle = 80;
  const fontSizeSub = 40;
  const padding = 60;
  
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  const barWidth = width / globalPalette.value.length;
  globalPalette.value.forEach((color, i) => {
    ctx.fillStyle = color.hex;
    ctx.fillRect(i * barWidth, 0, Math.ceil(barWidth), barHeight);
  });

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${fontSizeTitle}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('2025 ANNUAL COLOR PALETTE', padding, height - padding - 20);
  
  ctx.font = `${fontSizeSub}px sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillText(`${images.value.length} ARTWORKS • ${globalPalette.value.length} COLORS`, width - padding, height - padding - 30);
  
  ctx.font = `${fontSizeSub * 0.6}px monospace`;
  ctx.fillStyle = '#666666';
  ctx.fillText(new Date().toLocaleDateString(), width - padding, height - 30);

  const link = document.createElement('a');
  link.download = `annual-spectrum-4k-${new Date().getTime()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const triggerFileInput = () => {
  if (!isProcessing.value && fileInputRef.value) {
      fileInputRef.value.click();
  }
};

onMounted(() => {
  const savedMode = localStorage.getItem('layout-mode')
  setTimeout(() => {
    document.body.classList.add('tw-scan-trigger');
    requestAnimationFrame(() => {
      document.body.classList.remove('tw-scan-trigger');
    });
  }, 50);
});
</script>

<template>
  <div 
    class="color-review-container min-h-[80vh] bg-neutral-900 text-white p-6 font-sans transition-colors duration-200 rounded-xl"
    :class="{ 'bg-neutral-800 ring-4 ring-indigo-500/50': isDragging }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="max-w-6xl mx-auto space-y-8 pointer-events-none"> 
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-neutral-800/50 p-6 rounded-2xl border border-neutral-800 pointer-events-auto">
        
        <div class="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
          
          <!-- Control Panel -->
          <div class="flex items-center gap-4 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-700 w-full md:w-auto">
              <div class="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <Sliders :size="16" />
                  <span>提取样本:</span>
                  <span class="text-indigo-400 font-bold min-w-[20px] text-center">{{ sampleCount }}</span>
              </div>
              <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  v-model="sampleCount" 
                  @change="handleSampleCountChange"
                  class="w-32 md:w-40 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition"
              />
          </div>

          <div class="flex gap-3 w-full md:w-auto">
              <button 
                  @click="clearAll"
                  :disabled="images.length === 0"
                  class="!px-4 !py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 disabled:opacity-50 transition flex items-center justify-center gap-2 text-sm border border-neutral-700 whitespace-nowrap flex-1 md:flex-none"
              >
                  <Trash2 :size="16" /> 清空
              </button>
              <label class="cursor-pointer px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 whitespace-nowrap flex-1 md:flex-none">
                  <Upload :size="18" />
                  {{ isProcessing ? '处理中...' : '导入作品' }}
                  <input 
                      ref="fileInputRef"
                      type="file" 
                      multiple 
                      accept="image/*" 
                      class="hidden" 
                      @change="handleFileUpload"
                      :disabled="isProcessing"
                  />
              </label>
          </div>
        </div>
      </header>

      <!-- Global Spectrum Display -->
      <section v-if="images.length > 0" class="bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-700 pointer-events-auto">
        <div class="flex justify-between items-end mb-4">
          <div>
            <h2 class="!text-xl !m-0 font-semibold flex items-center gap-2 !border-none">
              <Palette class="text-pink-500" :size="20" />
              年度光谱
            </h2>
            <p class="text-sm text-neutral-400 !m-0">
              共 {{ images.length }} 张作品，{{ globalPalette.length }} 个色彩切片 (4K导出)
            </p>
          </div>
          <button 
            @click="downloadSpectrum"
            class="!text-sm !px-4 !py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md transition flex items-center gap-2 font-medium"
          >
            <Download :size="16" /> 保存高清大图
          </button>
        </div>

        <div class="h-32 w-full rounded-lg overflow-hidden flex relative group cursor-crosshair ring-1 ring-white/10">
          <div 
            v-for="(color, idx) in globalPalette"
            :key="idx"
            :style="{ backgroundColor: color.hex, width: `${100 / globalPalette.length}%` }"
            class="h-full hover:scale-y-110 transition-transform origin-bottom"
            :title="color.hex"
          ></div>
        </div>
        
          <div class="mt-4 flex gap-4 justify-center text-xs text-neutral-500 font-mono">
            <span>提示：拖动上方滑块可重新提取颜色（会覆盖手动修改）</span>
        </div>
      </section>

      <!-- Empty State -->
      <div 
        v-if="images.length === 0 && !isProcessing"
        @click="triggerFileInput"
        class="border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center gap-4 bg-neutral-800/50 transition-all cursor-pointer pointer-events-auto group"
        :class="isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-neutral-700 hover:border-indigo-500 hover:bg-neutral-800'"
      >
        <div class="p-4 bg-neutral-800 rounded-full group-hover:scale-110 transition-transform">
          <ImageIcon :size="48" :class="isDragging ? 'text-indigo-400' : 'text-neutral-600 group-hover:text-neutral-400'" />
        </div>
        <div class="text-center">
          <p class="text-lg transition-colors !m-0" :class="isDragging ? 'text-indigo-300' : 'text-neutral-300 group-hover:text-white'">
            {{ isDragging ? '松开鼠标导入文件' : '点击或拖入你的作品集' }}
          </p>
          <p class="text-sm mt-1 text-neutral-500 !m-0">支持批量选择 (JPG, PNG)</p>
        </div>
      </div>

      <!-- Image Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pointer-events-auto">
        <div v-for="img in images" :key="img.id" class="group bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 hover:border-neutral-500 transition shadow-lg flex flex-col">
          <!-- Image Preview -->
          <div class="relative aspect-square overflow-hidden bg-neutral-900">
            <img 
              :src="img.src" 
              :alt="img.name" 
              class="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
            />
            <button 
              @click="removeImage(img.id)"
              class="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 transition backdrop-blur-sm"
              title="移除图片"
            >
              <X :size="14" />
            </button>
          </div>
          
          <!-- Local Palette & Actions -->
          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
                <div class="flex flex-wrap gap-1 mb-2">
                <label 
                    v-for="(c, i) in img.colors"
                    :key="i" 
                    class="relative w-8 h-8 rounded-full cursor-pointer ring-1 ring-white/10 hover:ring-2 hover:ring-white transition group/color overflow-hidden"
                    :style="{ backgroundColor: c.hex }"
                    title="左键修改 / 右键删除"
                    @contextmenu.prevent="handleRemoveColor(img.id, i)"
                >
                    <input 
                        type="color" 
                        class="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0"
                        :value="c.hex"
                        @input="(e) => handleColorChange(img.id, i, e.target.value)"
                    />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 bg-black/20 pointer-events-none">
                        <Edit2 :size="10" class="text-white drop-shadow-md" />
                    </div>
                </label>
                
                <label class="w-8 h-8 rounded-full border border-dashed border-neutral-600 flex items-center justify-center cursor-pointer hover:bg-neutral-700 hover:border-neutral-500 transition text-neutral-500 hover:text-white" title="添加自定义颜色">
                    <Plus :size="14" />
                    <input 
                        type="color" 
                        class="absolute opacity-0 w-0 h-0"
                        @change="(e) => handleAddColor(img.id, e.target.value)"
                        value="#ffffff"
                    />
                </label>
                </div>
            </div>
            
            <div class="flex justify-between items-center mt-2 border-t border-neutral-700 pt-2">
                <p class="text-xs text-neutral-400 truncate max-w-[70%] !m-0">{{ img.name }}</p>
                <p class="text-[10px] text-neutral-600 font-mono !m-0">ID:{{ img.id.slice(0,4) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isProcessing" class="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-pulse z-50 pointer-events-auto">
        <RefreshCcw class="animate-spin" :size="20" />
        正在重绘色彩 DNA...
      </div>
    </div>
  </div>
</template>

