import Vue from 'vue'
import VueRouter from 'vue-router'

import festivals from '../views/festivals/Festivals.vue'
import FestivalView from '../views/festivals/ModifFestivals.vue'
import CreateFestivals from '../views/festivals/CreateFestivals'


import Login from '../views/ConnexionView'
import Register from '../views/RegisterView'

import OrganisationTeam from '../views/organisations/organisationTeam'
import CreateOrganisation from '../views/organisations/CreateOrganisation'
import organisators from '../views/organisations/organisators'

import User from '../views/users/user'
import UserEdit from '../views/users/userEdit'

import licences from '../views/licences/licences'

import styleSingers from '../views/styleSingers/styleSingers'

import alertModal from '../plugins/alert'
import Vuex from "vuex";

global.v = Vuex;

Vue.use(VueRouter)
Vue.use(alertModal)

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
    path: '/licences',
    name: 'licences',
    component: licences,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN'){
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
    path: '/organisators/:name',
    name: 'organisators',
    component: organisators,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN' || window.localStorage.getItem('rang') === 'ROLE_USER' || window.localStorage.getItem('rang') === 'ROLE_ORGANISATOR'){
        next()
      }else{
        router.push('/login')
      }
  }
  },

  {
    path: '/styleSingers',
    name: 'styleSingers',
    component: styleSingers,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('rang') === 'ROLE_ADMIN'){
        next()
      }else{
        router.push('/login')
      }
  }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
