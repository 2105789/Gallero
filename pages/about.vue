<template>
  <div>
    <h1 class="page-title">About This Project</h1>
    <p class="page-subtitle">This portfolio is a demonstration of modern web technologies.</p>
    <div class="content">
      <p>This project was built to showcase how modern Web APIs can be leveraged to create beautiful, high-performance web applications.</p>
      <p>The following APIs were used:</p>
      <ul>
        <li><strong>Canvas API:</strong> Used for the interactive "spotlight" effect on the artwork detail pages.</li>
        <li><strong>Intersection Observer API:</strong> Used to lazy-load images in the portfolio grid, improving initial page load performance.</li>
        <li><strong>Network Information API:</strong> Used to adapt the quality of images based on the user's network connection speed.</li>
      </ul>
      <p>The project is built with <a href="https://nuxt.com/" target="_blank">Nuxt.js</a>, a powerful Vue.js framework.</p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About',
  meta: [
    { name: 'description', content: 'About this interactive art portfolio project.' }
  ]
})
</script>

<style scoped>
.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-bottom: 3rem;
}

.content {
  max-width: 800px;
  line-height: 1.8;
  font-size: 1.1rem;
}

.content a {
  color: #818cf8;
  text-decoration: none;
}

ul {
  list-style: disc;
  padding-left: 2rem;
}

li {
  margin-bottom: 1rem;
}
</style> 