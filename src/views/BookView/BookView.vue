<template>
  <div v-if="isFetching" class="fetching">
    <h1>Fetching Data.........</h1>
  </div>
  <div v-else-if="error" class="error">
    <h1>Error while Fetching</h1>
  </div>
  <div v-else-if="data">
    <h1 class="book-info">Book Info :</h1>
    <div class="single-book">
      <h2 class="single-book__title">TITLE : {{ data.title }}</h2>
      <h2 class="single-book__title">ID : {{ data.id }}</h2>
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
@import './BookView.scss';
</style>
