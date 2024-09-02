<template>
  <div>
    <div v-if="isFetching" class="fetching">
      <h1>Fetching Data.........</h1>
    </div>
    <div v-else-if="error" class="error">
      <h1>Error while Fetching</h1>
    </div>
    <div v-else>
      <div class="search-container">
        <input
          v-model.number="userId"
          type="number"
          placeholder="Enter User ID"
          class="user-id-input"
        />
        <button @click="onSearch" class="search-button">Search</button>
      </div>
      <div v-if="books && books.length > 0" class="books-wrapper">
        <div class="books">
          <div v-for="book in paginatedBooks" :key="book.id" class="book">
            <RouterLink :to="`/${book.id}`" class="book__link">
              <h2 class="book__title">{{ book.title }}</h2>
              <p class="book__body">{{ book.body }}</p>
            </RouterLink>
            <div class="book__update-delete">
              <RouterLink
                :to="{
                  path: `update-book/${book.id}`,
                  query: {
                    title: book.title,
                    body: book.body,
                    userId: book.userId
                  }
                }"
              >
                <button @click.stop class="book__update">Update</button>
              </RouterLink>
              <button class="book__delete" @click.stop="showDeleteConfirmation(book.id)">
                Delete
              </button>
            </div>
            <div v-if="bookToDelete === book.id" class="confirmation-prompt">
              <p>Are you sure you want to delete this book?</p>
              <button @click="confirmDelete(book.id)">Yes, Delete</button>
              <button @click="cancelDelete">No</button>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1">◀</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">▶</button>
        </div>
      </div>
      <div v-else class="no-books">
        <p>No books found.</p>
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
const books = ref<Book[] | null>(null)
const isFetching = ref<boolean>(false)
const error = ref<Error | null>(null)
const bookToDelete = ref<number | null>(null)

const fetchBooks = async () => {
  isFetching.value = true
  error.value = null

  const url = userId.value
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId.value}`
    : 'https://jsonplaceholder.typicode.com/posts'

  const { data, error: fetchError } = await useFetch<Book[]>(url).json()

  if (fetchError.value) {
    error.value = fetchError.value
  } else {
    books.value = data.value || []
  }
  isFetching.value = false
}
// Initial fetch to get all books
fetchBooks()

const onSearch = () => {
  fetchBooks()
}

const showDeleteConfirmation = (id: number) => {
  bookToDelete.value = id
}

const confirmDelete = async (id: number) => {
  const { error } = await useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`).delete()

  if (error.value) {
    console.error('Error deleting book:', error.value)
  } else {
    books.value = books.value?.filter((book) => book.id !== id) || []
    bookToDelete.value = null
  }
}

const cancelDelete = () => {
  bookToDelete.value = null
}
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = computed(() => {
  if (!books.value) return 1
  return Math.ceil(books.value.length / pageSize.value)
})

//The indexes of the books that should be shown
const paginatedBooks = computed(() => {
  if (!books.value) return []
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return books.value.slice(start, end)
})
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  .user-id-input {
    padding: 8px;
    font-size: 16px;
  }

  .search-button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
  }
}

.book__link {
  text-decoration: none;
}

.book__update-delete {
  margin-top: 1rem;
}

.book__update,
.book__delete {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}

.confirmation-prompt {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-top: 1rem;

  gap: 1rem;
  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
.no-books {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  p {
    font-size: 1.5rem;
  }
}

.confirmation-prompt button {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 2rem;

  button {
    margin: 0 5px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }

  span {
    font-size: 16px;
  }
}
</style>
