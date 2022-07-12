<template>
    <div class="users">
        <h1 class="h1-title">Licences</h1>
        <table>
            <thead>
                <tr>
                    <th>Nom de l'organisation</th>
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

                    <td class="icons">
                        <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                        <router-link :to="{ name: 'licence', params: { name: item.id } }">
                            <img class="edit-icon" src="../../assets/img/edit.svg" />
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <TheNavbar></TheNavbar>
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
            msg: '',
            img: 'success',
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
                    this.msg = 'La licence a bien été supprimé'
                    this.$refs.alert.Alert()
                    this.$store.dispatch('getLicence')
                })
                .catch((error) => {
                    this.img = 'error'
                    if (error.response.status === 404) {
                        this.msg = "la licence n'existe pas"
                    } else if (error.response.status === 401) {
                        this.msg = "vous n'êtes pas autorisé à supprimer cette licence"
                    } else {
                        this.msg = 'une erreur est survenu : ' + error.message
                    }
                    this.$refs.alert.Alert()
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
