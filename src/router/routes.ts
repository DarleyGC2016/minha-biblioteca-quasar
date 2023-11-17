import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'new-book', name: 'newBook', component: () => import('pages/FormPost.vue') },
      { path: 'edit-book/:id', name: 'editBook', component: () => import('pages/FormEdit.vue') }
      // { path: 'new-book/:id?', name: 'newBook', component: () => import('pages/FormPost.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
