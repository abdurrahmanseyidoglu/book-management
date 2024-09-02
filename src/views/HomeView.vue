<template>
  <div>
    <div v-if="isFetching" class="fetching">
      <h1>Fetching Data.........</h1>
    </div>
    <div v-else-if="error" class="error">
      <h1>Error while Fetching</h1>
    </div>
    <div v-else>
      <input
        v-model.number="userId"
        type="number"
        placeholder="Filter by User ID"
        class="user-id-input"
      />
      <div v-if="filteredBooks && filteredBooks.length > 0" class="books">
        <div v-for="book in filteredBooks" :key="book.id" class="book">
          <RouterLink :to="`/${book.id}`" class="book__link">
            <h2 class="book__title">
              {{ book.title }}
            </h2>
            <p class="book__body">
              {{ book.body }}
            </p>
          </RouterLink>
          <div class="book__update-delete">
            <RouterLink :title="book.title" :body="book.body" :author-id="book.userId" :to="`update-book/${book.id}`">
              <button class="book__update">Update</button></RouterLink
            >
            <button class="book__delete" @click="deleteBook(book.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { RouterLink } from 'vue-router'

interface Book {
  userId: number
  id: number
  title: string
  body: string
}

const userId = ref<number | null>(null)

// Fetch data initially, you might want to adapt this for better userId management.
const { isFetching, error, data } = useFetch<Book[]>(
  `https://jsonplaceholder.typicode.com/posts`
).json()

const filteredBooks = computed(() => {
  const currentUserId = userId.value
  const books = data.value
  if (currentUserId) {
    return books.filter((book) => book.userId === currentUserId)
  }

  // If no userId is provided, return all books
  return books
})

const deleteBook = (id: number) => {
  console.log('Delete book with id:', id)
}
</script>

<style lang="scss">
.user-id-input {
  margin-bottom: 10px;
  padding: 1rem;
  font-size: 1rem;
}

.books {
  display: flex;
  flex-wrap: wrap;
}

.book {
  padding: 10px;
  width: 100%;
}

.book__link {
  text-decoration: none;
  color: inherit;
}

.book__title {
  font-size: 1.2em;
}

.book__body {
  font-size: 1em;
}

.book__update-delete {
  margin-top: 10px;
  .book__update,
  .book__delete {
    margin-right: 10px;
    padding: 1rem;
    border-radius: 10px;
    outline: none;
    box-shadow: none;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }
  .book__update {
    background-color: green;
    color: white;
    &:hover {
      background-color: lighten(green, 3);
    }
  }
  .book__delete {
    background-color: lightcoral;
    color: white;
    &:hover {
      background-color: darken(lightcoral, 5);
    }
  }
}
</style>
