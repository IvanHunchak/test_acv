import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () =>  import( '../views/HomeView.vue')
  },
  {
    path: '/newProduct',
    name: 'newProduct',
    component: () => import( '../views/CreateProductView.vue')
  },
  {
    path: '/products/:productId',
    name: "productDetails",
    component: () => import( '../views/ProductDetailsView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import( '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
