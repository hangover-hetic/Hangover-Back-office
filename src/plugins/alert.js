import alertVue from '../components/alert.vue'


const alertModal = {
    install(Vue){
        this.EventBus = new Vue()

        Vue.component('alertVue', alertVue)

        Vue.prototype.$alert = {
            show(params){
                alertVue.EventBus.$emit('show', params)
            }
        }
    }
}

export default alertModal