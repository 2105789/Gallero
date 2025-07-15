<template>
  <div class="app-layout">
    <div ref="glow" class="cursor-glow"></div>
    <SideMenu />
    <main class="main-content">
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SideMenu from '~/components/SideMenu.vue'

const glow = ref(null)

const handleMouseMove = (e) => {
  if (glow.value) {
    glow.value.style.left = `${e.clientX}px`
    glow.value.style.top = `${e.clientY}px`
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style>
/* Global Scrollbar Styling */
html {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

html::-webkit-scrollbar {
  width: 6px;
}

html::-webkit-scrollbar-track {
  background: transparent;
}

html::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

html::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Global Reset and Typography */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #f8fafc;
  line-height: 1.6;
  font-size: 16px;
  overflow-x: hidden;
  min-height: 100vh;
}

/* Cursor Glow Effect */
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.25) 0%,
    rgba(139, 92, 246, 0.15) 20%,
    rgba(139, 92, 246, 0.08) 40%,
    rgba(139, 92, 246, 0.03) 60%,
    transparent 80%
  );
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1000;
  transition: all 0.08s ease-out;
  will-change: transform;
  mix-blend-mode: screen;
}

/* Layout Structure */
.app-layout {
  position: relative;
  min-height: 100vh;
}

.main-content {
  margin-left: 112px; /* 80px sidebar + 32px gap */
  transition: margin-left 0.3s ease;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  position: relative;
  z-index: 1;
}

/* Typography Scale */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 1rem 0;
  font-weight: 600;
  line-height: 1.2;
  color: #f1f5f9;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 1.5rem;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: 1.25rem;
}

h3 {
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  margin-bottom: 1rem;
}

p {
  margin: 0 0 1.5rem 0;
  color: #cbd5e1;
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 96px; /* Smaller gap on tablets */
  }
  
  .content-wrapper {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding-top: 80px; /* Account for mobile sidebar */
  }
  
  .content-wrapper {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 1rem 0.75rem;
  }
  
  .cursor-glow {
    display: none; /* Hide glow on mobile for performance */
  }
}

/* Grid and Flexbox Utilities */
.grid {
  display: grid;
  gap: 1.5rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

/* Animation and Transitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Focus States for Accessibility */
*:focus {
  outline: 2px solid rgba(139, 92, 246, 0.5);
  outline-offset: 2px;
}

/* Selection Styling */
::selection {
  background-color: rgba(139, 92, 246, 0.3);
  color: #f1f5f9;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Content Spacing */
.content-wrapper > * + * {
  margin-top: 1.5rem;
}

/* Loading States */
.loading {
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  body {
    background: #000;
    color: #fff;
  }
  
  .cursor-glow {
    display: none;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .cursor-glow {
    opacity: 0.5;
    display: block !important; /* Temporarily override for testing */
  }
}
</style> 