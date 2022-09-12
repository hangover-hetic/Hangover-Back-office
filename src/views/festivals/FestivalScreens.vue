<template>
    <div class="screens">
        <h1 class="h1-title">Ecrans</h1>
        <table>
            <thead>
                <tr>
                    <th align="left">Token</th>
                    <th align="left">Lien</th>
                    <th align="right">
                        <img
                            id="addScreens"
                            src="../../assets/img/add.svg"
                            alt="addScreens"
                            v-on:click="addScreens()"
                            class="add-icon"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="categories bibaboup" v-for="item in tokenScreens" :key="item.tokenScreens">
                    <td>
                        <label for="elements">{{ item.token }}</label>
                    </td>
                    <td>
                        <a :href="'http://screen.hangover.timotheedurand.fr/?token=' + item.token"
                            >http://2c90-185-226-32-21.ngrok.io/?token={{ item.token }}</a
                        >
                    </td>
                    <td>
                        <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                    </td>
                </tr>
            </tbody>
        </table>

        <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
    </div>
</template>

<script>
import { http } from '../../assets/services/http-common'
import TheNavbar from '@/components/Navbar'
import Vue from 'vue'

export default {
    name: 'screensPage',

    components: {
        TheNavbar,
    },

    data() {
        return {
            tokenScreens: '',
            split: '',
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]
        this.listScreens()
    },

    methods: {
        listScreens() {
            http.get('festivals/' + this.split + '/screens').then((tokenScreens) => {
                this.tokenScreens = tokenScreens.data
            })
        },

        addScreens() {
            http.post('screens', {
                festival: '/api/festivals/' + this.split,
            })
                .then(() => {
                    this.listScreens()
                    Vue.$toast.success('Votre écrans a été ajouté')
                })
                .catch((e) => {
                    Vue.$toast.error("Votre écrans n'a pas été ajouté" + e)
                })
        },

        CallDelete(id) {
            http.delete('screens/' + id)
                .then((res) => {
                    console.log(res)
                    this.listScreens()
                    Vue.$toast.success("L'écran a été supprimé")
                })
                .catch((e) => {
                    Vue.$toast.error("Votre écrans n'a pas été supprimé" + e)
                })
        },
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';

#addScreens {
    cursor: pointer;
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

a {
    color: white;
}
</style>
