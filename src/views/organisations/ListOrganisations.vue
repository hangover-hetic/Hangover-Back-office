<template>
    <div class="organisationTeam">
        <h1 class="h1-title">Organisations</h1>
        <table id="blur">
            <thead>
                <tr>
                    <th align="left">Nom</th>
                    <th>Nombre de festivals</th>

                    <th align="right">
                        <router-link to="/CreateOrganisation">
                            <div class="add-icon">
                                <img class="add-icon" src="../../assets/img/add.svg" alt="add" />
                            </div>
                        </router-link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="categories bibaboup" v-for="item in organisations" :key="item.organisations">
                    <td>
                        <label for="elements">{{ item.name }}</label>
                    </td>
                    <td>{{ item.festivals.length }}</td>

                    <td class="icons">
                        <img class="delete-icon" src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                        <img v-on:click="addOrganisators(item.id)" src="../../assets/img/add-organisators.svg" />
                        <router-link :to="{ name: 'festivals', params: { name: item.id, orga: item.name } }"
                            ><img src="../../assets/img/edit.svg"
                        /></router-link>
                        <router-link :to="{ name: 'organisators', params: { name: item.id } }"
                            ><img src="../../assets/img/peoplegroupe.svg"
                        /></router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="addOrganisators" id="addOrganisators">
            <div class="cross" @click="addOrganisators()">
                <AkarIconsCross />
            </div>
            <h3>Ajouter un organisateur</h3>
            <form @submit.prevent="CallAddUser">
                <input placeholder="Timoté@gmail.com" type="email" v-model="email" />
                <input type="submit" value="Ajouter un organisateur" />
            </form>
        </div>
        <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
    </div>
</template>

<script>
import { http } from '../../assets/services/http-common'
import TheNavbar from '@/components/Navbar'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import Vue from 'vue'
import AkarIconsCross from '../../assets/img/AkarIconsCross.vue'
global.v = Vuex

export default {
    store: store,
    components: {
        TheNavbar,
        AkarIconsCross,
    },

    data() {
        return {
            email: '',
            idOrga: '',
        }
    },

    mounted() {
        this.$store.dispatch('loadOrganisations')
    },

    methods: {
        CallDelete(id) {
            http.delete('organisation_teams/' + id)
                .then(() => {
                    this.$store.dispatch('loadOrganisations')
                })
                .then(() => {
                    Vue.$toast.success('Organisation supprimée')
                })
                .catch((e) => {
                    Vue.$toast.error('Erreur : ' + e)
                })
        },

        addOrganisators(id) {
            const organisator = document.getElementById('addOrganisators')
            const blur = document.getElementById('blur')
            blur.classList.toggle('blured')
            organisator.classList.toggle('show')
            this.idOrga = id
        },

        CallAddUser() {
            http.get('users?email=' + this.email).then((res) => {
                const relatedUser = res.data[0].id

                http.post('organisators', {
                    relatedUser: '/api/users/' + relatedUser,
                    organisationTeam: '/api/organisation_teams/' + this.idOrga,
                })
                    .then(() => {
                        this.$store.dispatch('loadOrganisations')
                        Vue.$toast.success('Utilisateur ajouté')
                    })
                    .catch((e) => {
                        Vue.$toast.error("Erreur lors de l'ajout de l'utilisateur : " + e)
                    })
            })
        },
    },

    computed: mapState(['organisations']),
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/fonts.scss';

.organisationTeam {
    margin: auto;

    table {
        thead {
            th {
                &:nth-child(2) {
                    text-align: left;
                }
            }
        }
    }
}

.add-icon {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    overflow: hidden;
    background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);
    border-radius: 50%;

    img {
        width: 32px;
        height: 32px;
        object-fit: cover;
        border-radius: 50%;
    }
}

td.icons {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 15px;

    img {
        margin: 0;
        width: 1.2rem;
    }

    .delete-icon {
        width: 1.1rem;
    }

    img:nth-child(2) {
        width: 1.65rem;
    }
}

.addOrganisators {
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    border-radius: 15px;
    border: 1px solid #fff;
    background-color: transparent;
    position: absolute;
    justify-content: center;
    text-align: center;
    color: #fff;

    .cross {
        cursor: pointer;
    }

    svg {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 2rem;
    }

    input {
        padding: 15px 25px;
        background-color: transparent;
        color: #fff !important;
        border: 1px solid #fff;
    }

    input:nth-child(1) {
        margin: 25px;
        padding: 10px 15px;
        width: 250px;
    }
}

.blured {
    filter: blur(4px);
}

.show {
    display: flex !important;
    flex-direction: column;

    h3 {
        margin: 0 25px;
    }

    input {
        margin: 5px 25px;
        color: #464646;

        &:nth-child(2) {
            width: 350px;
            margin-top: 10px;
        }

        &:nth-child(3) {
            width: 250px;
        }
    }
}

.size {
    font-size: 1.7rem;
}
</style>
