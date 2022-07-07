import Vue from 'vue'
import VueRouter from 'vue-router'
import festivals from '../views/Festivals.vue'
import FestivalView from '../views/ModifFestivals.vue'
import CreateFestivals from '../views/CreateFestivals'
import Login from '../views/ConnexionView'
import Register from '../views/RegisterView'
import OrganisationTeam from '../views/organisationTeam'
import CreateOrganisation from '../views/CreateOrganisation'
import SingersPage from '../views/singers'
import User from '../views/user'
import UserEdit from '../views/userEdit'
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
    path: '/organisationTeam',
    name: 'OrganisationTeam',
    component: OrganisationTeam,
    beforeEnter: (to, from, next) => {
        if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
          next()
        }else{
          router.push('/login')
        }
    }
  },
  {
    path: '/CreateOrganisation',
    name: 'CreateOrganisation',
    component: CreateOrganisation,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
        }else{
          router.push('/login')
        }
    }
  },
  {
    path: '/festivals/:name',
    name: 'festivals',
    component: festivals,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
        }else{
          router.push('/login')
        }
    }
  },
  {
    path: '/festival/:name',
    name: 'festival',
    component: FestivalView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
      }
  }
  },
  {
    path: '/createfestivals',
    name: 'createfestivals',
    component: CreateFestivals,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
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
    path: '/Account/:name',
    name: 'Account',

    component: UserEdit,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
      }
  }
  },

  {
    path: '/users',
    name: 'users',
    component: User,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN'){
        next()
      }else{
        router.push('/login')
      }
  }
  },

  {
    path: '/user/:name',
    name: 'user',
    component: UserEdit,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
      }
  }
  },

  {
    path: '/singers/:name',
    name: 'singers',
    component: SingersPage,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
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
