<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar__link">Home</RouterLink>
    <RouterLink to="/add-book" class="navbar__link">Add a book</RouterLink>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import './AppNavbar.scss';
</style>
