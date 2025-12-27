<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { Upload, Download, RefreshCcw, Trash2, Sliders, Droplets, PieChart, ThermometerSun } from 'lucide-vue-next';

// ----------------------------------------------------------------------
// 1. Math & Color Logic (工具函数，无需修改)
// ----------------------------------------------------------------------

const rgbToHex = (r, g, b) => {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

// RGB to HSL (Standardized: H:0-360, S:0-100, L:0-100)
const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
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
  return [h * 360, s * 100, l * 100];
};

const colorDistance = (color1, color2) => {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
};

// Check if hue is warm (Red/Orange/Yellow/Magenta range)
const isWarmHue = (h) => {
  return (h >= 0 && h < 90) || (h >= 270 && h <= 360);
};

// Extract multiple dominant colors
const extractColorsFromImage = (imgElement, colorCount = 5) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = 100; // Low res for performance
  const height = 100;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imgElement, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;
  
  const pixelColors = [];
  for (let i = 0; i < imageData.length; i += 4 * 5) { // Sample every 5th
    if (imageData[i + 3] < 128) continue;
    pixelColors.push([imageData[i], imageData[i+1], imageData[i+2]]);
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
    if (!found) quantized.push({ color, count: 1 });
  });

  quantized.sort((a, b) => b.count - a.count);

  return quantized.slice(0, colorCount).map(item => {
    const [r, g, b] = item.color;
    const [h, s, l] = rgbToHsl(r, g, b);
    return {
      hex: rgbToHex(r, g, b),
      h, s, l,
      count: item.count
    };
  });
};

// ----------------------------------------------------------------------
// 2. Vue Component Logic
// ----------------------------------------------------------------------

const images = ref([]);
const isProcessing = ref(false);
const isDragging = ref(false);
const sampleCount = ref(5);
const fileInputRef = ref(null);

// --- Processing Logic ---
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
      console.error("Error", file.name, e);
    }
  }
  images.value = [...images.value, ...newImages];
  isProcessing.value = false;
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const processSingleFile = (fileOrUrl, count) => {
  return new Promise((resolve, reject) => {
    if (fileOrUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => loadImageAndExtract(e.target.result, fileOrUrl.name, count, resolve, reject);
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
  } finally {
      isProcessing.value = false;
  }
};

// --- Handlers ---
const handleFileUpload = (e) => processFiles(Array.from(e.target.files));
const handleDragOver = (e) => { e.preventDefault(); isDragging.value = true; };
const handleDragLeave = (e) => { e.preventDefault(); isDragging.value = false; };
const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  processFiles(Array.from(e.dataTransfer.files));
};
const clearAll = () => images.value = [];

// --- Statistics Calculation (Converted useMemo to computed) ---
const stats = computed(() => {
  const allColors = images.value.flatMap(img => img.colors);
  const total = allColors.length;
  if (total === 0) return null;

  // Quadrants for Pie Chart UI
  const q1 = allColors.filter(c => c.s >= 50 && c.l >= 50).length;
  const q2 = allColors.filter(c => c.s < 50 && c.l >= 50).length;
  const q3 = allColors.filter(c => c.s < 50 && c.l < 50).length;
  const q4 = allColors.filter(c => c.s >= 50 && c.l < 50).length;

  // Warm/Cool
  const warm = allColors.filter(c => isWarmHue(c.h)).length;
  
  // Find dominant style
  const quadrants = [
      { id: 'q1', count: q1, label: '明快·二次元', desc: '高亮·高饱和' },
      { id: 'q2', count: q2, label: '淡雅·日系感', desc: '高亮·低饱和' },
      { id: 'q3', count: q3, label: '深沉·写实风', desc: '低亮·低饱和' },
      { id: 'q4', count: q4, label: '浓郁·复古调', desc: '低亮·高饱和' }
  ];
  const dominant = quadrants.sort((a, b) => b.count - a.count)[0];

  return {
      total,
      quadrants: { q1, q2, q3, q4 },
      warmPct: (warm / total) * 100,
      dominant
  };
});

// --- Pie Chart Helper (Computed) ---
const pieChartSlices = computed(() => {
  if (!stats.value) return [];
  const { q1, q2, q3, q4 } = stats.value.quadrants;
  const total = stats.value.total;

  const createSlicePath = (startPct, endPct) => {
      const startX = Math.cos(2 * Math.PI * startPct - Math.PI/2);
      const startY = Math.sin(2 * Math.PI * startPct - Math.PI/2);
      const endX = Math.cos(2 * Math.PI * endPct - Math.PI/2);
      const endY = Math.sin(2 * Math.PI * endPct - Math.PI/2);
      const largeArc = endPct - startPct > 0.5 ? 1 : 0;
      return `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArc} 1 ${endX} ${endY} Z`;
  };

  let accumulated = 0;
  const rawSlices = [
      { count: q1, color: '#f472b6', label: 'Q1' }, 
      { count: q4, color: '#a855f7', label: 'Q4' }, 
      { count: q3, color: '#3b82f6', label: 'Q3' }, 
      { count: q2, color: '#2dd4bf', label: 'Q2' }, 
  ];

  return rawSlices.map(slice => {
    const pct = slice.count / total;
    if (pct === 0) return null;
    const path = createSlicePath(accumulated, accumulated + pct);
    accumulated += pct;
    return { ...slice, path };
  }).filter(Boolean);
});

// --- Scatter Plot Helper (Computed) ---
const scatterPlotData = computed(() => {
  const width = 800;
  const height = 500;
  const padding = 60;
  
  const xScale = (s) => padding + (s / 100) * (width - padding * 2);
  const yScale = (l) => height - padding - (l / 100) * (height - padding * 2);

  return images.value.flatMap((img, imgIdx) => 
    img.colors.map((c, cIdx) => ({
      ...c,
      id: `${img.id}-${cIdx}`,
      imgName: img.name,
      cx: xScale(c.s),
      cy: yScale(c.l)
    }))
  );
});

// --- 4K Export Logic ---
const downloadHighResChart = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const allPoints = images.value.flatMap(img => img.colors.map(c => ({...c, imgName: img.name})));
  
  const width = 3840;
  const height = 2160;
  const padding = 200;
  const axisWidth = width - padding * 2;
  const axisHeight = height - padding * 2;

  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = '#171717';
  ctx.fillRect(0, 0, width, height);

  // Grid & Axes
  ctx.strokeStyle = '#404040';
  ctx.lineWidth = 4;
  ctx.fillStyle = '#737373';
  ctx.font = 'bold 40px Inter, sans-serif';
  ctx.textAlign = 'center';

  ctx.beginPath();
  for (let i = 0; i <= 5; i++) {
      const x = padding + (axisWidth / 5) * i;
      const y = height - padding - (axisHeight / 5) * i;
      ctx.moveTo(x, padding); ctx.lineTo(x, height - padding);
      ctx.moveTo(padding, y); ctx.lineTo(width - padding, y);
      ctx.fillText(`${i * 20}`, x, height - padding + 60); 
      if(i > 0) ctx.fillText(`${i * 20}`, padding - 60, y + 15);
  }
  ctx.stroke();

  // Main Axes
  ctx.strokeStyle = '#a3a3a3';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding); ctx.lineTo(width - padding, height - padding);
  ctx.moveTo(padding, height - padding); ctx.lineTo(padding, padding);
  ctx.stroke();

  // Titles
  ctx.fillStyle = '#e5e5e5';
  ctx.font = 'bold 60px Inter, sans-serif';
  ctx.fillText("Saturation (S)", width / 2, height - padding + 140);
  ctx.save();
  ctx.translate(padding - 120, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText("Lightness (L)", 0, 0);
  ctx.restore();

  // Points
  ctx.globalCompositeOperation = 'screen'; 
  allPoints.forEach(p => {
      const x = padding + (p.s / 100) * axisWidth;
      const y = height - padding - (p.l / 100) * axisHeight;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = p.hex;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.stroke();
  });
  ctx.globalCompositeOperation = 'source-over';

  // Text Info
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 100px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText("Color Preference Analysis", padding, padding - 80);
  
  ctx.font = '50px monospace';
  ctx.fillStyle = '#a3a3a3';
  ctx.textAlign = 'right';
  ctx.fillText(`N=${allPoints.length} Samples | ${images.value.length} Artworks`, width - padding, padding - 80);

  const link = document.createElement('a');
  link.download = `color-scatter-clean-4k-${new Date().getTime()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const triggerFileInput = () => {
  if (!isProcessing.value && fileInputRef.value) {
      fileInputRef.value.click();
  }
};

// 唤醒 Tailwind CDN (解决样式未加载问题)
onMounted(() => {
  setTimeout(() => {
    document.body.classList.add('tw-scan-trigger');
    requestAnimationFrame(() => {
      document.body.classList.remove('tw-scan-trigger');
    });
  }, 100);
});
</script>

<template>
  <div 
    class="analyzer-container min-h-[80vh] bg-neutral-900 text-white p-6 font-sans transition-colors duration-200 rounded-xl"
    :class="{ 'bg-neutral-800 ring-4 ring-indigo-500/50': isDragging }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="max-w-6xl mx-auto space-y-8 pointer-events-none">
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto bg-neutral-800/50 p-6 rounded-2xl border border-neutral-800">
        
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <div class="flex items-center gap-3 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-700 w-full md:w-auto">
              <Sliders :size="16" class="text-neutral-400"/>
              <span>提取样本:</span>
              <span class="text-indigo-400 font-bold min-w-[20px] text-center">{{ sampleCount }}</span>
              <input 
                  type="range" min="1" max="30" 
                  v-model="sampleCount" 
                  @change="handleSampleCountChange"
                  class="w-32 md:w-40 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition"
              />
           </div>
           <div class="flex gap-3 w-full md:w-auto">
              <button 
                @click="clearAll" 
                :disabled="images.length === 0" 
                class="!px-4 !py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition border border-neutral-700 flex items-center justify-center gap-2"
              >
                  <Trash2 :size="16" /> 清空
              </button>
              <label class="cursor-pointer px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 flex-1 md:flex-none">
                  <Upload :size="18" /> 导入作品
                  <input ref="fileInputRef" type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload" :disabled="isProcessing" />
              </label>
           </div>
        </div>
      </header>

      <!-- Charts Section -->
      <div v-if="images.length > 0 && stats" class="grid grid-cols-1 lg:grid-cols-3 gap-6 pointer-events-auto">
              
          <!-- Left Column: Scatter Plot (Takes up 2/3) -->
          <div class="lg:col-span-2 space-y-6">
              <div class="bg-neutral-800 rounded-2xl border border-neutral-700 p-6">
                   <div class="flex justify-between items-center mb-4">
                      <h2 class="!text-lg font-semibold flex items-center gap-2 text-neutral-200 !border-none !m-0">
                          S-L 分布散点图
                      </h2>
                      <button 
                          @click="downloadHighResChart"
                          class="!text-sm px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md transition flex items-center gap-2"
                      >
                          <Download :size="16" /> 导出 4K 分析图 (无背景)
                      </button>
                   </div>
                   
                   <!-- SVG Plot Chart -->
                   <div class="relative w-full overflow-x-auto bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl p-4">
                      <div class="absolute top-4 right-6 text-neutral-500 text-xs font-mono text-right pointer-events-none z-10">
                         Y: L (Lightness)<br/>
                         X: S (Saturation)
                      </div>
                      
                      <!-- Quadrant Labels inside chart -->
                      <div class="absolute inset-0 pointer-events-none flex flex-col p-[60px]">
                         <div class="flex-1 flex">
                             <div class="flex-1 flex items-start justify-start p-4 text-neutral-700 font-bold text-sm">淡雅 (Q2)</div>
                             <div class="flex-1 flex items-start justify-end p-4 text-neutral-700 font-bold text-sm">明快 (Q1)</div>
                         </div>
                         <div class="flex-1 flex">
                             <div class="flex-1 flex items-end justify-start p-4 text-neutral-700 font-bold text-sm">深沉 (Q3)</div>
                             <div class="flex-1 flex items-end justify-end p-4 text-neutral-700 font-bold text-sm">浓郁 (Q4)</div>
                         </div>
                      </div>
                     
                     <svg viewBox="0 0 800 500" class="w-full h-auto min-w-[600px] relative z-0">
                         <!-- Grid & Axis -->
                         <line x1="60" y1="250" x2="740" y2="250" stroke="#404040" stroke-dasharray="4" />
                         <line x1="400" y1="60" x2="400" y2="440" stroke="#404040" stroke-dasharray="4" />
                         <line x1="60" y1="440" x2="740" y2="440" stroke="#737373" stroke-width="2" />
                         <line x1="60" y1="60" x2="60" y2="440" stroke="#737373" stroke-width="2" />

                         <!-- Labels -->
                         <text x="400" y="480" text-anchor="middle" fill="#737373" font-size="14" font-weight="bold">S (Saturation)</text>
                         <text x="20" y="250" text-anchor="middle" fill="#737373" font-size="14" font-weight="bold" transform="rotate(-90, 20, 250)">L (Lightness)</text>

                         <!-- Data Points -->
                         <g v-for="p in scatterPlotData" :key="p.id" class="group cursor-pointer">
                             <circle 
                                 :cx="p.cx" 
                                 :cy="p.cy" 
                                 :r="images.length > 20 ? 4 : 6" 
                                 :fill="p.hex"
                                 stroke="rgba(0,0,0,0.3)"
                                 stroke-width="0.5"
                                 class="hover:scale-150 hover:stroke-white hover:stroke-2 transition-transform opacity-90 mix-blend-screen"
                             >
                                <title>{{ p.imgName }}&#10;HEX: {{ p.hex }}&#10;S:{{ Math.round(p.s) }}% L:{{ Math.round(p.l) }}%</title>
                             </circle>
                         </g>
                     </svg>
                   </div>
              </div>
          </div>

          <!-- Right Column: Statistics Dashboard -->
          <div class="space-y-6">
              
              <!-- 1. Quadrant Pie Chart -->
              <div class="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 flex flex-col items-center">
                  <h3 class="text-neutral-300 font-semibold mb-6 flex items-center gap-2 w-full !text-base !m-0">
                      <PieChart :size="18" /> 风格象限分布
                  </h3>
                  
                  <div class="flex flex-col items-center">
                    <div class="relative w-48 h-48">
                        <svg viewBox="-1.2 -1.2 2.4 2.4" class="w-full h-full transform rotate-0">
                            <path 
                              v-for="(slice, i) in pieChartSlices" 
                              :key="i"
                              :d="slice.path" 
                              :fill="slice.color" 
                              stroke="#262626" 
                              stroke-width="0.05" 
                              class="hover:opacity-90 transition-opacity" 
                            />
                        </svg>
                        <!-- Center Hole for Donut -->
                        <div class="absolute inset-0 m-auto w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center border-4 border-neutral-700">
                            <div class="text-center">
                                <div class="text-[10px] text-neutral-400">主要风格</div>
                                <div class="text-sm font-bold text-white">{{ stats.dominant.label.split('·')[0] }}</div>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div class="w-full mt-6 space-y-3">
                      <div class="flex justify-between items-center text-sm">
                          <span class="flex items-center gap-2 text-neutral-400"><span class="w-3 h-3 rounded-full bg-pink-400"></span>Q1 明快·二次元</span>
                          <span class="font-mono text-white">{{ ((stats.quadrants.q1 / stats.total) * 100).toFixed(1) }}%</span>
                      </div>
                      <div class="flex justify-between items-center text-sm">
                          <span class="flex items-center gap-2 text-neutral-400"><span class="w-3 h-3 rounded-full bg-teal-400"></span>Q2 淡雅·日系</span>
                          <span class="font-mono text-white">{{ ((stats.quadrants.q2 / stats.total) * 100).toFixed(1) }}%</span>
                      </div>
                      <div class="flex justify-between items-center text-sm">
                          <span class="flex items-center gap-2 text-neutral-400"><span class="w-3 h-3 rounded-full bg-blue-500"></span>Q3 深沉·写实</span>
                          <span class="font-mono text-white">{{ ((stats.quadrants.q3 / stats.total) * 100).toFixed(1) }}%</span>
                      </div>
                      <div class="flex justify-between items-center text-sm">
                          <span class="flex items-center gap-2 text-neutral-400"><span class="w-3 h-3 rounded-full bg-purple-500"></span>Q4 浓郁·复古</span>
                          <span class="font-mono text-white">{{ ((stats.quadrants.q4 / stats.total) * 100).toFixed(1) }}%</span>
                      </div>
                  </div>
                  <div class="mt-6 p-3 bg-neutral-900/50 rounded-lg text-xs text-neutral-400 text-center w-full">
                      推测你的习惯：<span class="text-indigo-400 font-bold">{{ stats.dominant.desc }}</span>
                  </div>
              </div>

              <!-- 2. Warm/Cool Bar -->
              <div class="bg-neutral-800 rounded-2xl border border-neutral-700 p-6">
                  <h3 class="text-neutral-300 font-semibold mb-4 flex items-center gap-2 !text-base !m-0">
                      <ThermometerSun :size="18" /> 冷暖偏向
                  </h3>
                  
                  <div class="relative h-4 bg-neutral-700 rounded-full overflow-hidden mb-2">
                      <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-50"></div>
                      <!-- Marker -->
                      <div 
                          class="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500"
                          :style="{ left: `${stats.warmPct}%` }"
                      ></div>
                  </div>
                  <div class="flex justify-between text-xs font-mono text-neutral-500">
                      <span>COOL</span>
                      <span class="text-white">{{ stats.warmPct.toFixed(1) }}% 暖色</span>
                      <span>WARM</span>
                  </div>
              </div>
          </div>
      </div>

      <!-- Empty State -->
      <div 
          v-else
          @click="triggerFileInput"
          class="border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center gap-4 bg-neutral-800/50 transition-all cursor-pointer pointer-events-auto group"
          :class="isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-neutral-700 hover:border-indigo-500 hover:bg-neutral-800'"
      >
          <div class="p-4 bg-neutral-800 rounded-full group-hover:scale-110 transition-transform">
            <Droplets :size="48" :class="isDragging ? 'text-indigo-400' : 'text-neutral-600 group-hover:text-neutral-400'" />
          </div>
          <div class="text-center">
            <p class="text-lg text-neutral-300 !m-0">拖入作品集，生成「S-L 象限分析」</p>
            <p class="text-sm mt-1 text-neutral-500 !m-0">包含象限分布饼图、冷暖占比及 4K 散点图导出</p>
          </div>
      </div>
      
      <div v-if="isProcessing" class="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-pulse pointer-events-auto z-50">
          <RefreshCcw class="animate-spin" :size="20" />
          正在解析色彩基因...
      </div>

    </div>
  </div>
</template>