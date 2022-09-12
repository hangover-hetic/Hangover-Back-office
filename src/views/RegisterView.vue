<template>
    <div class="login">
        <form @submit="submitForm">
            <div class="form">
                <h1>Register</h1>
                <input class="form-1 input-text" id="firstName" type="text" v-model="firstName"
                    placeholder="first name" />
                <input class="form-2 input-text" id="lastName" type="text" v-model="lastName" placeholder="last name" />
                <input class="form-1 input-text" id="email" type="text" v-model="email" placeholder="Email" />
                <input class="form-2 input-text" id="password" type="password" v-model="password"
                    placeholder="Password" />
                <input class="form-1 input-text" id="phone" type="text" v-model="phone" placeholder="Mobile phone" />
                <input class="form-2 input-text" id="Address" type="text" v-model="address" placeholder="address" />
                <input class="form-2 input-text" id="country" type="text" v-model="country" placeholder="Country" />
                <div>
                    <input class="button-registration" id="register" type="submit" value="register" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            phone: null,
            address: null,
            country: null,
        }
    },
    methods: {
        submitForm(e) {
            e.preventDefault()
            axios({
                url: 'https://hangover.timotheedurand.fr/api/users',
                method: 'Post',
                data: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                    address: this.address,
                    country: this.country,
                },
            }).then((res) => {
                //this.$store.dispatch("loadFestivals");
                this.response = res.data
                this.$router.push('/')
                Vue.$toast.success("Utilisateur créé")
            })
                .catch((e) => {
                    Vue.$toast.error("Erreur lors de la création de l'utilisateur : " + e)
                })
        },
    },
}
</script>

<style scoped lang="scss">
@import '../assets/style/formulaire.scss';
</style>
