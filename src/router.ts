import HomeView from './views/HomeView.vue'
import BookView from './views/BookView.vue'
import AddBook from './views/AddBook.vue'
import UpdateBook from './views/UpdateBook.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/:id', name: 'singleBook', component: BookView },
    { path: '/add-book', name: 'addBook', component: AddBook },
    { path: '/update-book/:id', name: 'updateBook', component: UpdateBook }
  ]
})

export default router
