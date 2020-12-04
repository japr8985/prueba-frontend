import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/users.vue')
  },
  {
    path: '/users/:id',
    name: 'user-show',
    component: () => import(/* webpackChunkName: "about" */ '../views/show.vue')
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: () => import(/* webpackChunkName: "about" */ '../views/create.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
