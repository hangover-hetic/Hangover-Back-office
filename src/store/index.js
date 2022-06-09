import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    festivals: '',
  },
  getters: {
    festivals: state => {
      return state.festivals;
  }
  },
  mutations: {
    SET_Festivals(state, festivals) {
      state.festivals = festivals
  }
  },
  actions: {
    loadFestivals ({ commit }) {
      axios
          .get('https://hangover.timotheedurand.fr/api/festivals?page=1', {
              headers: {
                'Accept': 'application/json'
              }
          })
          .then(response => response.data)
          .then(festivals => {
    
              commit('SET_Festivals',festivals)
      })
  }
  
  },
  modules: {
  }
})
