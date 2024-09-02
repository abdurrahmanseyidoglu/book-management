<template>
  <div class="update-book-form">
    <h2>Update a Book</h2>
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

      <button type="submit">Update Book</button>
    </form>
    <div class="updating" v-if="isFetching">
      <h1>Updating the Book ....</h1>
    </div>
    <div v-else-if="responseData" class="response">
      <h1>Book Updated</h1>
      <p><span>Title: </span> {{ responseData.title }}</p>
      <p><span>Body: </span> {{ responseData.body }}</p>
    </div>

    <div v-else-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useFetch } from '@vueuse/core'

const props = defineProps<{
  title: string
  body: string
  userId: string
}>()

interface BookData {
  userId: number | string
  title: string
  body: string
}

interface updateBookResponse {
  id: number
  title: string
  body: string
  userId: number
}

const title = ref<string>(props.title)
const body = ref<string>(props.body)
const errorMessages = ref<{ titleMessage?: string; bodyMessage?: string }>({})
const responseData = ref<updateBookResponse | null>(null)
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
      userId: props.userId,
      title: title.value,
      body: body.value
    }

    const { data, error } = await useFetch<updateBookResponse>(
      `https://jsonplaceholder.typicode.com/posts/${props.userId}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(bookData)
      }
    )
      .put()
      .json()
    if (error.value) {
      errorMessage.value = 'There was an error updating the book.'
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
