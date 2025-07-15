<template>
  <div class="portfolio-page">
    <header class="hero-section">
      <h1 class="page-title">Digital Art Portfolio</h1>
      <p class="page-subtitle">A curated collection of digital artworks and interactive designs, crafted with modern web technologies.</p>
    </header>
    
    <section class="portfolio-section">
      <div class="portfolio-grid">
        <ArtworkCard v-for="item in portfolioItems" :key="item.id" :item="item" />
      </div>
      <div ref="sentinel" class="sentinel"></div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePortfolio } from '~/composables/usePortfolio';
import ArtworkCard from '~/components/ArtworkCard.vue';

const { getPortfolioItems, totalItems } = usePortfolio();
const portfolioItems = ref([]);
const page = ref(1);
const limit = 6;

const sentinel = ref(null);
let observer = null;

const loadMoreItems = () => {
  if (portfolioItems.value.length >= totalItems) {
    return;
  }
  
  const newItems = getPortfolioItems({ page: page.value, limit });
  portfolioItems.value.push(...newItems);
  page.value++;
};

onMounted(() => {
  loadMoreItems(); // Load initial items

  observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      loadMoreItems();
    }
  });

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

useHead({
  title: 'Digital Art Portfolio',
  meta: [
    { name: 'description', content: 'Explore a collection of stunning digital art and interactive designs, created with modern web technologies.' }
  ]
})
</script>

<style scoped>
.portfolio-page {
  animation: fadeIn 0.8s ease-out;
}

.hero-section {
  margin-bottom: 4rem;
  text-align: center;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg, 
    #8b5cf6 0%, 
    #a855f7 25%, 
    #c084fc 50%, 
    #818cf8 75%, 
    #6366f1 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.page-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #94a3b8;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 400;
}

.portfolio-section {
  position: relative;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.sentinel {
  height: 1px;
  width: 100%;
  margin-top: 3rem;
}

/* Enhanced Responsive Design */
@media (max-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    margin-bottom: 2.5rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    margin-bottom: 2rem;
  }
  
  .portfolio-grid {
    gap: 1rem;
  }
}

/* Loading Animation for New Items */
.portfolio-grid > * {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus and Hover States */
.portfolio-grid:focus-within {
  outline: none;
}

/* Empty State (when no items) */
.portfolio-grid:empty::before {
  content: "Loading amazing artworks...";
  display: block;
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 3rem;
  grid-column: 1 / -1;
}

/* High Contrast Mode Adjustments */
@media (prefers-contrast: high) {
  .page-title {
    background: none;
    -webkit-text-fill-color: initial;
    color: #fff;
  }
  
  .page-subtitle {
    color: #e2e8f0;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .portfolio-page,
  .portfolio-grid > * {
    animation: none;
  }
}
</style> 