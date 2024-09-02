<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar__link">Home</RouterLink>
    <RouterLink to="/add-book" class="navbar__link">Add a book</RouterLink>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 10px 20px;
  background-color: lightblue;
  color: white;
  width: 100%;
  margin-bottom: 1rem;
}

.navbar__link {
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  &:hover{
    color: red;
  }
}
</style>
