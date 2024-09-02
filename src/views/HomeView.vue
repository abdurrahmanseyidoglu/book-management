<template>
  <h1>This is the home</h1>
  <div v-if="isFetching" class="fetching">
    <h1>Fetching Data.........</h1>
  </div>
  <div v-else-if="error" class="error">
    <h1>Error while Fetching</h1>
  </div>
  <div v-else-if="data" class="books">
    <div v-for="book in data" :key="book.id" class="book">
      <RouterLink :to="`/${book.id}`">
        <h2 class="book__title">
          {{ book.title }}
        </h2>
        <p class="book__title">
          {{ book.body }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { RouterLink } from 'vue-router'
// const url = 'https://jsonplaceholder.typicode.com/todos'
const { isFetching, error, data } = useFetch<Book>(
  'https://jsonplaceholder.typicode.com/posts'
).json()
interface Book {
  userId: number
  id: number
  title: string
  body: string
}
</script>

<style lang="scss">
.books {
  .book {
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
