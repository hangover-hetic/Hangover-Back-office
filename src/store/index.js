import Vue from 'vue'
import Vuex from 'vuex'
import {http} from '../assets/services/http-common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organisations: '',
    NameOrga: '',
    festivals: '',
    screens: '',
    username: '',
    password: '',
    token: '',
    users: '',
    user: '',
  },

  getters: {

    festivals: state => {
      return state.festivals.data;
    },

    screens: state => {
        return state.screens;
    },

    users: state => {
      return state.users
    },

    user: state =>{
      return state.user
    }

  },


  mutations: {

  SET_ORGANISATIONS(state, organisations) {
    state.organisations = organisations
  },

  SET_NameOrga(state, NameOrga) {
    state.NameOrga = NameOrga
  },

  SET_Festivals(state, festivals) {
    state.festivals = festivals
  },

  SET_Screens(state, screens) {
    state.screens = screens
  },

  SET_Users(state, users) {
    state.users = users
  },

  SET_User(state, user) {
    state.user = user
  },

    UPDATE_USERNAME (state, value) { state.username = value },
    UPDATE_PASSWORD (state, value) { state.password = value },
    POST_LOGIN(state, token) {state.token = token}

  },


  actions: {

    loadOrganisations ({ commit }) {

   

      if(localStorage.getItem('rang') === "ROLE_ADMIN"){
      http
          .get('organisation_teams')
          .then(response => response.data)
          .then(organisations => {
            commit('SET_ORGANISATIONS',organisations)
          })
      }else{
        http
        .get('organisation_teams/user')
        .then(response => response.data)
        .then(organisations => {
          commit('SET_ORGANISATIONS',organisations)
        })
      }
    },

    loadFestivals ({ commit }) {
      const pathFestivals = window.location.pathname;
      const splitFestivals = pathFestivals.substr(11)

      http
          .get('organisation_teams/' + splitFestivals + '/festivals')
          .then(response => response.data)
          .then(festivals => {
            console.log(festivals)
            commit('SET_Festivals',festivals)
          })
    },

    loadUsers ({ commit }) {
      http
          .get('users')
          .then(response => response.data)
          .then(users => {
            console.log(users)
            commit('SET_Users', users)
          })
    },

    loadNameOrga ({ commit }) {
      const pathNameOrga = window.location.pathname;
      const splitNameOrga = pathNameOrga.substr(11)

      http
          .get('organisation_teams/' + splitNameOrga)
          .then(response => response.data)
          .then(NameOrga => {
            console.log(NameOrga)
             commit('SET_NameOrga',NameOrga)
          })
    },

  loadScreens({ commit }) {
    const path = window.location.pathname;
    const split = path.substr(10)

    http
        .get('festivals/' + split)
        .then(response => response.data)
        .then(screens => {
          commit('SET_Screens',screens)
        })

  }, 

    submitForm ( {commit}) {
    http({
          url: "authentication_token",
          method: "Post",
          data: {
              username: this.state.username,
              password: this.state.password,
          },
          
          }).then(token => {
              console.log(token.data)
              localStorage.setItem('rang', token.data.roles[0])
              localStorage.setItem('idUser', token.data.user.id)
              commit('POST_LOGIN', token)
              }).catch(function () {
                  alert('username or passwor is not corret please retry')
              });
        },

    getUser( {commit} ){
      const path = window.location.pathname;
      const split = path.substr(-1)

      http
          .get('users/' + split)
          .then(user => {
                this.user = user.data
                console.log(this.user)
                commit('SET_User', user.data)
              }).catch(error=>{
                if (error.response && error.response.status === 401) {
                  localStorage.removeItem('rang')
                  localStorage.removeItem('token')
                  localStorage.removeItem('idUser')
                  window.location.href = "/";
                }
          })
    }
        
  },
})
