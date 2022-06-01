import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
const base = axios.create({
  baseURL: "https://hangover.timotheedurand.fr/api/", 
});

import vuetify from '@/plugins/vuetify' // path to vuetify export




Vue.prototype.$http = base;

Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
