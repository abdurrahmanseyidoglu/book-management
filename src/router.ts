import HomeView from './views/HomeView/HomeView.vue'
import BookView from './views/BookView/BookView.vue'
import AddBook from './views/AddBook/AddBook.vue'
import UpdateBook from './views/UpdateBook/UpdateBook.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/:id', name: 'singleBook', component: BookView },
    { path: '/add-book', name: 'addBook', component: AddBook },
    {
      path: '/update-book/:id',
      component: UpdateBook,
      props: (route) => ({
        id: route.params.id,
        title: route.query.title,
        body: route.query.body,
        userId: route.query.userId
      })
    }
  ]
})

export default router
