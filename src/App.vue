<template>
  <nav>
    <Navbar />
  </nav>
  <main>
    <RouterView class="px-1" />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>
<style lang="scss">
.px-1 {
  padding-inline: 1rem;
}
</style>
