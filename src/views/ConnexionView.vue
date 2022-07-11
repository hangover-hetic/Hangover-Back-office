<template>
    <div class="login">
        <form @submit="submitForm">
            <div class="form">
                <h1>Login</h1>
                <input class="form-1 input-text" id="email" type="text" v-model="username" placeholder="Email" />
                <input
                    class="form-2 input-text"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="mot de passe"
                />
                <div>
                    <input class="button-login" id="login" type="submit" value="Login" />
                    <router-link to="register" class="button-registration">Register</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { http } from '../assets/services/http-common'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
global.v = Vuex

export default {
    store: store,

    mounted() {
        localStorage.setItem('rang', 'ou')

        if (localStorage.getItem('token') !== null || window.localStorage.getItem('rang') !== 'ROLE_USER') {
            this.$router.replace('/organisationTeam')
        }
    },

    computed: {
        ...mapState(['token']),

        username: {
            get() {
                return this.$store.state.username
            },
            set(value) {
                this.$store.commit('UPDATE_USERNAME', value)
            },
        },
        password: {
            get() {
                return this.$store.state.password
            },
            set(value) {
                this.$store.commit('UPDATE_PASSWORD', value)
            },
        },
    },

    methods: {
        submitForm(e) {
            e.preventDefault()
            this.$store.dispatch('submitForm')
            localStorage.removeItem('token')
            setTimeout(this.setToken, 1000)
        },

        setToken() {
            // it sets the cookie called `username`

            localStorage.setItem('token', this.token.data.token)
            http.defaults.headers['Authorization'] = 'Bearer ' + this.token.data.token
            this.$store.dispatch('loadFestivals')

            if (
                localStorage.getItem('rang') !== null ||
                (window.localStorage.getItem('rang') !== 'ROLE_USER' && localStorage.getItem('token'))
            ) {
                this.$router.push({ path: 'organisationTeam', params: { token: this.token.data.token } })
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import '../assets/style/formulaire.scss';
</style>
