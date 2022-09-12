<template>
    <div class="home">
        <h1 class="h1-title">{{ NameOrga.name }}</h1>
        <table>
            <thead>
                <tr>
                    <th align="left">Nom</th>
                    <th align="left">Date</th>
                    <th align="left">Lieu</th>
                    <th align="left"></th>

                    <th align="right">
                        <router-link
                            :to="{
                                name: 'createfestivals',
                                params: {
                                    orga: '/api/organisation_teams/' + this.orga,
                                },
                            }"
                            ><div class="add-icon">
                                <img class="add-icon" src="../../assets/img/add.svg" alt="add" />
                            </div>
                        </router-link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="categories bibaboup" v-for="item in festivals" :key="item.festivals">
                    <td>
                        <label for="elements">{{ item.name }}</label>
                    </td>
                    <td>{{ dayjs(item.startDate).format('DD / MM / YYYY') }}</td>
                    <td>{{ item.location }}</td>
                    <td class="icon">
                        <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                    </td>
                    <router-link :to="{ name: 'festival', params: { name: item.id } }"
                        ><td class="icon"><img class="edit-icon" src="../../assets/img/edit.svg" /></td
                    ></router-link>
                </tr>
            </tbody>
        </table>
        <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
    </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Navbar'
import { http } from '../../assets/services/http-common'
const dayjs = require('dayjs')
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
global.v = Vuex

export default {
    name: 'ListeBackoffice',
    store: store,

    components: {
        TheNavbar,
    },

    data() {
        return {
            //checkbox: true,
            dayjs,
            tab: [],
            orga: '',
        }
    },

    created() {
        this.$store.dispatch('loadFestivals')
        this.$store.dispatch('loadOrganisations')
        this.$store.dispatch('loadNameOrga')
    },

    mounted() {
        const pathFestivals = window.location.pathname
        this.orga = pathFestivals.substr(11)
        localStorage.setItem('orga', '/api/organisation_teams/' + this.orga)
    },

    methods: {
        CallDelete(id) {
            http.delete('festivals/' + id).then(() => {
                this.$store.dispatch('loadFestivals')
            })
        },
    },

    computed: {
        ...mapState(['festivals', 'organisations', 'NameOrga']),
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';

.home {
    margin: auto;
}
</style>
