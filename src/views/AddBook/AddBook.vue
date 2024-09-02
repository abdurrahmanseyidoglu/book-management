<template>
  <div class="add-book-form">
    <h2>Add a New Book</h2>
    <form @submit.prevent="handleFormSubmission">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
        <span v-if="errorMessages.titleMessage" class="error">{{
          errorMessages.titleMessage
        }}</span>
      </div>

      <div>
        <label for="body">Body:</label>
        <input type="text" id="body" v-model="body" />
        <span v-if="errorMessages.bodyMessage" class="error">{{ errorMessages.bodyMessage }}</span>
      </div>

      <button type="submit">Add Book</button>
    </form>
    <div class="adding" v-if="isFetching">
      <h1>Adding the Book ....</h1>
    </div>
    <div v-else-if="responseData" class="response">
      <h1>Book Added</h1>
      <p><span>Title: </span> {{ responseData.title }}</p>
      <p><span>Body: </span> {{ responseData.body }}</p>
    </div>

    <div v-else-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

interface BookData {
  userId: number
  title: string
  body: string
}

interface addBookResponse {
  id: number
  title: string
  body: string
  userId: number
}

const title = ref<string>('')
const body = ref<string>('')
const errorMessages = ref<{ titleMessage?: string; bodyMessage?: string }>({})
const responseData = ref<addBookResponse | null>(null)
const errorMessage = ref<string | null>(null)
const isFetching = ref<boolean>(false)

const isFormValid = (): boolean => {
  errorMessages.value = {
    titleMessage: title.value ? '' : 'Title is required.',
    bodyMessage: body.value ? '' : 'Body is required.'
  }

  if (!errorMessages.value.titleMessage && !errorMessages.value.bodyMessage) {
    return true
  }
  return false
}

const handleFormSubmission = async () => {
  if (isFormValid()) {
    isFetching.value = true
    const bookData: BookData = {
      userId: 1,
      title: title.value,
      body: body.value
    }

    const { data, error } = await useFetch<addBookResponse>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(bookData)
      }
    )
      .post()
      .json()
    if (error.value) {
      errorMessage.value = 'There was an error adding the book.'
      console.log(error.value)
    } else {
      responseData.value = data.value || null
      //reset fields
      title.value = ''
      body.value = ''
    }
  } else {
    return
  }
  isFetching.value = false
}
</script>

<style lang="scss">
h2 {
  margin-bottom: 1rem;
}
</style>
