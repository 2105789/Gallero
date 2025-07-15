<template>
  <div class="checkboxes-container">
    <h1>Million Checkboxes</h1>
    <button @click="markAll">Mark All</button>
    <button @click="unmarkAll">Unmark All</button>
    <button @click="markRandom">Mark Random</button>
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <div ref="viewport" class="viewport" @scroll="updateScroll">
      <div :style="{ height: totalHeight + 'px' }">
        <div :style="{ transform: 'translateY(' + paddingTop + 'px)' }">
          <div v-for="rowIndex in visibleRows" :key="rowIndex" class="grid-row">
            <div v-for="colIndex in columns" :key="colIndex" class="checkbox-item" :style="{ backgroundColor: getColor(getIndex(rowIndex, colIndex)) }" @click="getIndex(rowIndex, colIndex) < total && toggle(getIndex(rowIndex, colIndex))">
              <input v-if="getIndex(rowIndex, colIndex) < total" type="checkbox" :checked="isChecked(getIndex(rowIndex, colIndex))" @change="toggle(getIndex(rowIndex, colIndex))" @click.stop />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>Checked count: {{ checkedCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const total = 1000000
const columns = 10 // Number of columns in the grid
const rowHeight = 50 // Increased for grid items
const itemWidth = 100 // Approximate width per item
const viewport = ref(null)
const scrollTop = ref(0)
const viewportHeight = ref(0)

const checked = ref(new Set())
const exceptions = ref(new Set())
const allChecked = ref(false)
const seed = Date.now() // Use time as seed
const isAnimating = ref(false)
let animationInterval = null

const totalRows = computed(() => Math.ceil(total / columns))
const totalHeight = computed(() => totalRows.value * rowHeight)
const visibleCount = computed(() => Math.ceil(viewportHeight.value / rowHeight) + 10) // Buffer
const startRow = computed(() => Math.max(0, Math.floor(scrollTop.value / rowHeight) - 5))
const endRow = computed(() => Math.min(totalRows.value, startRow.value + visibleCount.value))
const paddingTop = computed(() => startRow.value * rowHeight)
const visibleRows = computed(() => {
  const rows = []
  for (let i = startRow.value; i < endRow.value; i++) {
    rows.push(i)
  }
  return rows
})
const visibleItems = computed(() => {
  const items = []
  for (let i = startRow.value; i < endRow.value; i++) {
    for (let j = 0; j < columns; j++) {
      items.push(getIndex(i, j))
    }
  }
  return items
})

const updateScroll = () => {
  scrollTop.value = viewport.value.scrollTop
}

const isChecked = (index) => {
  if (allChecked.value) {
    return !exceptions.value.has(index)
  }
  return checked.value.has(index)
}

const getColor = (index) => {
  return isChecked(index) ? generateRandomColor(index) : ''
}

const generateRandomColor = (index) => {
  const hash = (index * seed) % 0xFFFFFF // Hex product with time seed
  const r = (hash >> 16) & 255
  const g = (hash >> 8) & 255
  const b = hash & 255
  return `rgb(${r}, ${g}, ${b})`
}

const toggle = (index) => {
  if (allChecked.value) {
    if (exceptions.value.has(index)) {
      exceptions.value.delete(index)
    } else {
      exceptions.value.add(index)
    }
    exceptions.value = new Set(exceptions.value)
  } else {
    if (checked.value.has(index)) {
      checked.value.delete(index)
    } else {
      checked.value.add(index)
    }
    checked.value = new Set(checked.value)
  }
}

const markAll = () => {
  allChecked.value = true
  exceptions.value = new Set()
  checked.value = new Set() // Clear previous state
}

const unmarkAll = () => {
  allChecked.value = false
  checked.value.clear()
  exceptions.value.clear()
}

const markRandom = () => {
  allChecked.value = false
  exceptions.value.clear()
  checked.value.clear()
  const numToCheck = Math.floor(total * 0.1) // 10% random
  while (checked.value.size < numToCheck) {
    const rand = Math.floor(Math.random() * total)
    checked.value.add(rand)
  }
  checked.value = new Set(checked.value) // Force reactivity
}

const animateRandom = () => {
  const visible = visibleItems.value.filter(i => i < total)
  // Unmark all visible
  for (const idx of visible) {
    if (isChecked(idx)) toggle(idx)
  }
  // Mark random 10%
  const numToCheck = Math.floor(visible.length * 0.1)
  const shuffled = [...visible].sort(() => 0.5 - Math.random())
  for (let k = 0; k < numToCheck; k++) {
    toggle(shuffled[k])
  }
}

const play = () => {
  if (!isAnimating.value) {
    isAnimating.value = true
    animationInterval = setInterval(animateRandom, 500)
  }
}

const pause = () => {
  if (isAnimating.value) {
    isAnimating.value = false
    clearInterval(animationInterval)
  }
}

const checkedCount = computed(() => {
  if (allChecked.value) {
    return total - exceptions.value.size
  }
  return checked.value.size
})

const getIndex = (row, col) => row * columns + col

onMounted(() => {
  viewportHeight.value = viewport.value.clientHeight
  const resizeObserver = new ResizeObserver(() => {
    viewportHeight.value = viewport.value.clientHeight
  })
  resizeObserver.observe(viewport.value)

  // Clean up
  onUnmounted(() => {
    resizeObserver.disconnect()
    clearInterval(animationInterval)
  })
})
</script>

<style scoped>
.checkboxes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.viewport {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #4b5563;
  border-radius: 8px;
  background: #1f2937;
  scrollbar-width: thin;
  scrollbar-color: #8b5cf6 #4b5563;
}

.viewport::-webkit-scrollbar {
  width: 8px;
}

.viewport::-webkit-scrollbar-track {
  background: #4b5563;
}

.viewport::-webkit-scrollbar-thumb {
  background-color: #8b5cf6;
  border-radius: 4px;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  height: 50px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #374151;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.checkbox-item input {
  margin: 0;
}

.checkbox-item:last-child {
  border-bottom: none;
}

p {
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #cbd5e1;
}

button {
  margin-bottom: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
</style> 