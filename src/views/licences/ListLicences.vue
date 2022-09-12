<template>
    <div class="users">
        <h1 class="h1-title">Licences</h1>
        <table>
            <thead>
                <tr>
                    <th>Nom de l'oganisation</th>
                    <th align="left">Acheté</th>
                    <th align="left">Date de début</th>
                    <th align="left">Date de fin</th>
                    <th align="left"></th>
                    <th align="left"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="categories bibaboup" v-for="item in licences" :key="item.licences">
                    <td>
                        <label>{{ item.organisationTeam.name }}</label>
                    </td>
                    <td>
                        <label for="elements">{{ item.isBuyed ? 'oui' : 'non' }}</label>
                    </td>
                    <td>
                        <label for="elements">{{ dayjs(item.startDate).format('DD / MM / YYYY') }}</label>
                    </td>
                    <td>{{ dayjs(item.endDate).format('DD / MM / YYYY') }}</td>
                    <td></td>
                    <td>
                        <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                    </td>
                    <router-link :to="{ name: 'licence', params: { name: item.id } }">
                        <td><img src="../../assets/img/edit.svg" /></td>
                    </router-link>
                </tr>
            </tbody>
        </table>
        <TheNavbar licence="rgb(99, 99, 99)"></TheNavbar>
        <alertVue :msg="msg" :img="img" ref="alert" />
    </div>
</template>

<script>
import alertVue from '@/components/alert.vue'
const dayjs = require('dayjs')
import { http } from '../../assets/services/http-common'
import TheNavbar from '@/components/Navbar'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import Vue from 'vue'
global.v = Vuex

export default {
    name: 'UserPage',

    components: {
        TheNavbar,
        alertVue,
    },

    data() {
        return {
            dayjs,
        }
    },

    store: store,

    mounted() {
        this.$store.dispatch('getLicence')
    },

    methods: {
        CallDelete(id) {
            http.delete('licences/' + id)
                .then(() => {
                    this.$store.dispatch('getLicence')
                    Vue.$toast.success("Licence supprimé")
                })
                .catch((e) => {
                    Vue.$toast.error("Erreur lors de la suppréssion de la licence : " + e)
                })
        },
    },

    computed: {
        ...mapState(['licences']),
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';

th {
    text-align: left;
}
</style>
