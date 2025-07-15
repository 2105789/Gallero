<template>
  <aside class="side-menu">
    <div class="logo">
      <NuxtLink to="/">
        <Icon name="ph:aperture-bold" />
      </NuxtLink>
    </div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/" v-tooltip="'Portfolio'">
            <Icon name="ph:grid-four-fill" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" v-tooltip="'About'">
            <Icon name="ph:info-fill" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" v-tooltip="'Contact'">
            <Icon name="ph:envelope-simple-fill" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/million-checkboxes" v-tooltip="'Art Page'">
            <Icon name="ph:paint-brush-fill" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="footer">
      <p>&copy;</p>
    </div>
  </aside>
</template>

<script setup>
// Simple directive for tooltips
const vTooltip = {
  mounted(el, binding) {
    el.setAttribute('data-tooltip', binding.value);
  },
  // you can add more lifecycle hooks here
};
</script>

<style scoped>
.side-menu {
  width: 80px; /* Thinner sidebar */
  height: calc(100vh - 4rem); /* Added vertical padding */
  box-sizing: border-box; /* This will fix the overflow issue */
  background-color: rgba(26, 26, 26, 0.7); /* Made it semi-transparent */
  backdrop-filter: blur(12px); /* Frosted glass effect */
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  padding: 2rem 0;
  border-right: 1px solid #2c2c2c;
  position: fixed; /* Changed to fixed */
  top: 2rem; /* Padded from the top */
  left: 2rem; /* Padded from the left */
  z-index: 100;
  border-radius: 24px; /* Rounded corners */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); /* Elevation shadow */
}

.logo {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.logo a {
  color: #fff;
}

nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

nav a {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 1.8rem; /* Larger icons */
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  position: relative;
  display: inline-block;
}

nav a:hover,
.router-link-exact-active {
  color: #fff;
  background-color: #2c2c2c;
}

.footer {
  margin-top: auto;
  font-size: 1rem;
  color: #666;
}

[data-tooltip] {
    position: relative;
}

[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 90px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #1a1a1a;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #2c2c2c;
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 10;
}
</style> 