<template>
    <div class="screens">
        <h1>Liste des écrans</h1>
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
                        <a :href="'http://2c90-185-226-32-21.ngrok.io/?token=' + item.token"
                            >http://2c90-185-226-32-21.ngrok.io/?token={{ item.token }}</a
                        >
                    </td>
                    <td>
                        <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
                    </td>
                </tr>
            </tbody>
        </table>

        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import { http } from '../../assets/services/http-common'
import TheNavbar from '@/components/Navbar'

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
            }).then(() => {
                this.listScreens()
            })
        },

        CallDelete(id) {
            http.delete('screens/' + id).then((res) => {
                console.log(res)
                this.listScreens()
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
</style>
