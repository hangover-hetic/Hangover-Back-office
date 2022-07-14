import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps' // Import package

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDzRv2FwUI4B4QawLW8q4Jp3Klu4y92foc',
        libraries: 'places',
    },
})

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {
    faBuilding,
    faDisplay,
    faUserGroup,
    faCircleUser,
    faArrowRightFromBracket,
    faFileContract,
    faMusic,
} from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faBuilding, faDisplay, faUserGroup, faCircleUser, faArrowRightFromBracket, faFileContract, faMusic)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
