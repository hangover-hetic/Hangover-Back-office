import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    festivals: '',
    screens: '',
  },
  getters: {
    festivals: state => {
      return state.festivals;
  },

  screens: state => {
      return state.screens;
  }
  },
  mutations: {
    SET_Festivals(state, festivals) {
      state.festivals = festivals
  },

  SET_Screens(state, screens) {
    state.screens = screens
}
  },
  actions: {
    loadFestivals ({ commit }) {
      axios
          .get('https://hangover.timotheedurand.fr/api/festivals', {
              headers: {
                'Accept': 'application/json'
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
    

    axios
        .get('https://hangover.timotheedurand.fr/api/festivals/' + split, {
            headers: {
              'Accept': 'application/json'
            }
        })
        .then(response => response.data)
        .then(screens => {
  
            commit('SET_Screens',screens)
    })
}
  
  },
  modules: {
  }
})
