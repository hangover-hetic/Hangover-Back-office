import Vue from 'vue'
import Vuex from 'vuex'
import {http} from '../assets/services/http-common'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    festivals: '',
    screens: '',
    username: '',
    password: '',
    token: '',
    admin: false
   
  },
  getters: {
    festivals: state => {
      return state.festivals;
  },

  screens: state => {
      return state.screens;
  },

  token: state => {
    return state.token
  }

  },
  mutations: {

    //Authentification

    setAuthentification(state, status){
        state.admin = status
    },


    SET_Festivals(state, festivals) {
      state.festivals = festivals
  },

  SET_Screens(state, screens) {
    state.screens = screens
},
    UPDATE_USERNAME (state, value) { state.username = value },
    UPDATE_PASSWORD (state, value) { state.password = value },

    POST_LOGIN(state, token) {state.token = token}
  },
  actions: {
    loadFestivals ({ commit }) {
      http
          .get('festivals', {
              headers: {
                'Accept': 'application/json',
                
              }
          })
          .then(response => response.data)
          .then(festivals => {
    
              commit('SET_Festivals',festivals)
      })
  },

  loadScreens({ commit }) {

    const path = window.location.pathname;
    const split = path.substr(10)
    

    http
        .get('festivals/' + split, {
            headers: {
              'Accept': 'application/json',
              
            }
        })
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
        console.log(token.data.token)
        commit('POST_LOGIN', token)
      } )
      
        
    }
  
  },
  modules: {
  }
})
