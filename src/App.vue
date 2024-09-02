<template>
  <nav>
    <AppNavbar />
  </nav>
  <main>
    <RouterView class="router-view" />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>
<style lang="scss">
.router-view {
  padding-inline: 1rem;

}
</style>
