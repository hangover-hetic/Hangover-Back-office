<template>
    <div class="createorganisation">
        <h1 class="h1-title">Créer une organisation teams</h1>

        <form @submit.prevent="PostOrganisation">
            <div class="form">
                <div class="form__field">
                    <div class="field__left">
                        <div class="left__column">
                            <label for="name">Nom du festival</label>
                            <input class="dotted" id="name" v-model="name" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="button_create">
                <button class="button-border" type="submit">Créer</button>
            </div>
        </form>
        <alertVue :msg="msg" :img="img" ref="alert" />
        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'
import alertVue from '@/components/alert.vue'
const dayjs = require('dayjs')
import { http } from '../../assets/services/http-common'
//import { mapState } from "vuex";
//import store from "/src/store/index";
//import Vuex from "vuex";
//global.v = Vuex;

export default {
    components: {
        TheNavbar,
        alertVue,
    },

    //store: store,

    data() {
        return {
            dayjs,
            tab: [],
            name: '',
            description: '',
            location: '',
            startDate: '',
            endDate: '',
            currentImage: undefined,
            previewImage: undefined,
            imageInfos: [],
            msg: '',
            img: 'success',
        }
    },

    mounted() {},

    methods: {
        PostOrganisation() {
            http({
                url: 'organisation_teams',
                method: 'Post',
                data: {
                    name: this.name,
                },
            })
                .then((res) => {
                    this.$store.dispatch('loadFestivals')
                    this.response = res.data
                    this.msg = "L'organisation a bien été créée"
                    this.$refs.alert.Alert()
                })
                .catch((error) => {
                    this.img = 'error'
                    if (error.response.status === 422) {
                        this.msg = "le nom de l'organisation doit faire au moins 5 charactères"
                    } else if (error.response.status === 401) {
                        this.msg = "vous n'êtes pas autorisé à créer un organisation"
                    } else {
                        this.msg = 'une erreur est survenu : ' + error.message
                    }
                    this.$refs.alert.Alert()
                })
        },
    },
}

//computed: mapState(["festivals"]),
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/festivalInput.scss';

.createorganisation {
    width: 93%;

    .form {
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
