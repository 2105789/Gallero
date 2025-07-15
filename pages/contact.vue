<template>
  <div>
    <h1 class="page-title">Contact Us</h1>
    <p class="page-subtitle">Get in touch or follow my work.</p>
    <div class="content">
      <p>This is a fictional portfolio. If you'd like to see more of my work, you can follow me on these platforms:</p>
      <ul>
        <li><a href="https://github.com/2105789" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/87nehal" target="_blank">LinkedIn</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Contact information for the interactive art portfolio project.' }
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
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}
</style> 