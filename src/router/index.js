import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FestivalView from '../views/ModifFestivals.vue'
import CreateFestivals from '../views/CreateFestivals'
import Account from '../views/Account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/festival/:name',
    name: 'festival',
    component: FestivalView
  },
  {
    path: '/createfestivals',
    name: 'createfestivals',
    component: CreateFestivals
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
