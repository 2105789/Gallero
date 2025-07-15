<template>
  <div 
    ref="cardRef" 
    class="artwork-card"
    @mouseenter="prefetchImage"
  >
    <NuxtLink :to="`/artwork/${item.id}`" class="card-link">
      <div class="image-container">
        <img
          v-if="isIntersecting"
          :src="imageUrl"
          :alt="item.title"
          class="artwork-image"
          @load="onImageLoad"
        />
        <div v-if="!isImageLoaded" class="placeholder" :style="{ backgroundImage: `url(${item.image.thumbnail})` }"></div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-description">{{ item.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNetwork } from '~/composables/useNetwork'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { getImageQuality } = useNetwork()

const cardRef = ref(null)
const isIntersecting = ref(false)
const isImageLoaded = ref(false)

const imageUrl = computed(() => {
  if (!isIntersecting.value) return ''
  
  const quality = getImageQuality()
  switch (quality) {
    case 'low':
      return props.item.image.medium
    case 'medium':
      return props.item.image.medium
    case 'high':
      return props.item.image.large
    default:
      return props.item.image.medium
  }
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isIntersecting.value = true
        observer.unobserve(cardRef.value)
      }
    },
    {
      rootMargin: '0px 0px 200px 0px', // Start loading when 200px away from viewport
    }
  )

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})

onUnmounted(() => {
  if (observer && cardRef.value) {
    observer.unobserve(cardRef.value)
  }
})

const onImageLoad = () => {
  isImageLoaded.value = true
}

const prefetchImage = () => {
  useHead({
    link: [
      {
        rel: 'prefetch',
        href: props.item.image.large,
        as: 'image',
      },
    ],
  })
}
</script>

<style scoped>
.artwork-card {
  background-color: rgba(28, 28, 28, 0.7); /* Made it semi-transparent */
  backdrop-filter: blur(12px); /* Frosted glass effect */
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.artwork-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(139, 92, 246, 0.5); /* Changed to Indigo */
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 66.66%; /* 3:2 Aspect Ratio */
  background-color: #2a2a2a;
}

.artwork-image,
.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-image {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.artwork-image[src] {
  opacity: 1;
}

.placeholder {
  background-size: cover;
  filter: blur(10px);
  transform: scale(1.1);
  transition: opacity 0.5s ease;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.card-description {
  font-size: 0.9rem;
  color: #a0a0a0;
  line-height: 1.5;
}
</style> 