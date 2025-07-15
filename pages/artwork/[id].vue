<template>
  <div v-if="item" class="artwork-detail">
    <div class="artwork-header">
      <h1 class="artwork-title">{{ item.title }}</h1>
      <NuxtLink to="/" class="back-link">&larr; Back to Portfolio</NuxtLink>
    </div>
    <p class="artwork-description">{{ item.description }}</p>
    <div 
      class="artwork-canvas-container"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <img 
        ref="imageRef"
        :src="item.image.large" 
        :alt="item.title" 
        class="artwork-image"
        @load="setupCanvas"
      />
      <canvas ref="canvasRef" class="artwork-canvas"></canvas>
    </div>
  </div>
  <div v-else class="not-found">
    <h1>Artwork not found</h1>
    <p>The artwork you are looking for does not exist.</p>
    <NuxtLink to="/">Go back to the portfolio</NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolio } from '~/composables/usePortfolio'

const route = useRoute()
const { getPortfolioItemById } = usePortfolio()

const itemId = parseInt(route.params.id, 10)
const item = getPortfolioItemById(itemId)

const imageRef = ref(null)
const canvasRef = ref(null)
let ctx = null
let originalImageData = null
let grayImageData = null

const setupCanvas = () => {
  if (!imageRef.value || !canvasRef.value) return

  const image = imageRef.value
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  
  originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  grayImageData = createGrayscale(originalImageData)

  ctx.putImageData(grayImageData, 0, 0)
}

const createGrayscale = (imageData) => {
  const data = new Uint8ClampedArray(imageData.data)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const gray = 0.299 * r + 0.587 * g + 0.114 * b
    data[i] = data[i + 1] = data[i + 2] = gray
  }
  return new ImageData(data, imageData.width, imageData.height)
}

const handleMouseMove = (event) => {
  if (!ctx || !originalImageData || !grayImageData || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()

  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY

  const radius = 100 * scaleX; // Scale radius as well

  ctx.putImageData(grayImageData, 0, 0)

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2, false)
  ctx.clip()
  
  ctx.putImageData(originalImageData, 0, 0)
  ctx.restore()
}

const handleMouseLeave = () => {
  if (ctx && grayImageData) {
    ctx.putImageData(grayImageData, 0, 0)
  }
}

if (item) {
  useHead({
    title: item.title,
    meta: [
      { name: 'description', content: item.description }
    ]
  })
} else {
    useHead({
    title: 'Artwork Not Found',
    meta: [
      { name: 'description', content: 'The artwork you are looking for does not exist.' }
    ]
  })
}
</script>

<style scoped>
.artwork-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.artwork-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.artwork-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.back-link {
  color: #818cf8;
  text-decoration: none;
  font-weight: 500;
}

.artwork-description {
  font-size: 1.1rem;
  color: #a0a0a0;
  margin-bottom: 3rem;
  max-width: 800px;
}

.artwork-canvas-container {
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  cursor: crosshair;
}

.artwork-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  visibility: hidden; /* Hide the original image */
}

.artwork-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.not-found {
  text-align: center;
  margin-top: 5rem;
}
</style> 