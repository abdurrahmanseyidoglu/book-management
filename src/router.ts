import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import BookView from './views/BookView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:id', component: BookView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
