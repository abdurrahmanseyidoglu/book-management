<template>
  <RouterLink :to="`/${props.id}`" class="book__link">
    <h2 class="book__title">{{ props.title }}</h2>
    <p class="book__body">{{ props.body }}</p>
  </RouterLink>
  <div class="book__update-delete">
    <RouterLink
      :to="{
        path: `update-book/${props.id}`,
        query: {
          title: props.title,
          body: props.body,
          userId: props.userId
        }
      }"
    >
      <button class="book__update">Update</button>
    </RouterLink>
    <button class="book__delete" @click="showDeleteConfirmation(props.id)">Delete</button>
  </div>
  <div class="confirmation-prompt" v-if="bookToDelete === props.id">
    <p>Are you sure you want to delete this book?</p>
    <button @click="emit('confirmDelete', props.id)">Yes, Delete</button>
    <button @click="cancelDelete">No</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['confirmDelete'])

const props = defineProps<{
  id: number
  title: string
  userId: number
  body: string
}>()
const bookToDelete = ref<number | null>(null)
const showDeleteConfirmation = (id: number) => {
  bookToDelete.value = id
}

const cancelDelete = () => {
  bookToDelete.value = null
}
</script>
<style lang="scss"></style>
