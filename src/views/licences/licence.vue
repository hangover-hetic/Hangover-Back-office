<template>
    <div class="createorganisation">
        <h1 class="h1-title">Modifier la licence</h1>

        <form @submit.prevent="editLicence">
            <div class="form">
                <div class="form__field">
                    <div class="field__left">
                        <div class="left__column">
                            <label for="name">Date de début</label>
                            <input class="dotted" id="name" v-model="startDate" type="date" />
                        </div>
                        <div class="right__column">
                            <label for="name">Date de fin</label>
                            <input class="dotted" id="name" v-model="endDate" type="date" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="button_create">
                <button class="button-border" type="submit">Modifier</button>
            </div>
        </form>

        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import { http } from '@/assets/services/http-common'
global.v = Vuex

export default {
    name: 'licencePage',
    store: store,
    components: {
        TheNavbar,
    },

    data() {
        return {
            startDate: '',
            endDate: '',
        }
    },

    mounted() {
        this.$store.dispatch('getSingleLicence')
        setTimeout(this.date, 500)
    },

    methods: {
        date() {
            this.startDate = dayjs(this.licence.startDate).format('YYYY-MM-DD')
            this.endDate = dayjs(this.licence.endDate).format('YYYY-MM-DD')
        },

        editLicence() {
            const path = window.location.pathname
            const str = path.split('/')
            const split = str[str.length - 1]

            http.put('licences/' + split, {
                startDate: this.startDate,
                endDate: this.endDate,
            }).then(() => {
                this.$store.dispatch('getSingleLicence')
            })
        },
    },

    computed: mapState(['licence']),
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/festivalInput.scss';

.createorganisation {
    width: 93%;

    .form {
        width: 96.5%;
        margin-bottom: 32px;
    }
}

.createfestivals {
    margin: auto;
}
.box1 {
    display: flex;
    align-items: center;
    input {
        display: flex;
        align-self: center;
        padding: 75px 15px;
    }
}

button {
    cursor: pointer;
}
</style>
