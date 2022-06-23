import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import FestivalView from '../views/ModifFestivals.vue'
import CreateFestivals from '../views/CreateFestivals'
import Login from '../views/ConnexionView'
import Register from '../views/RegisterView'
import Account from '../views/Account'
import Vuex from "vuex";
global.v = Vuex;
Vue.use(VueRouter)

const routes = [

  
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    beforeEnter: (to, from, next) => {
        if(window.localStorage.getItem('rang') !== 'admin'){
          router.push('/login')
        }else{
          next()
          
        }
    }
  },
  {
    path: '/festival/:name',
    name: 'festival',
    component: FestivalView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') !== 'admin'){
        router.push('/login')
      }else{
        next()
        
      }
  }
  },
  {
    path: '/createfestivals',
    name: 'createfestivals',
    component: CreateFestivals,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') !== 'admin'){
        router.push('/login')
      }else{
        next()
        
      }
  }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') !== 'admin'){
        router.push('/login')
      }else{
        next()
        
      }
  }
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
