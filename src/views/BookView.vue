<template>
  <h1>This is the home</h1>
  <div v-if="isFetching" class="fetching">
    <h1>Fetching Data.........</h1>
  </div>
  <div v-else-if="error" class="error">
    <h1>Error while Fetching</h1>
  </div>
  <div v-else-if="data" class="books">
    <div class="book">
      <h2 class="book__title">
        {{ data.title }}
      </h2>
      <p class="book__title">
        {{ data.body }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const url = ref(`https://jsonplaceholder.typicode.com/todos/${route.params.id}`)
const { isFetching, error, data } = useFetch<Book>(url).json()
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
