<template>
    <div class="createorganisation">
        <h1 class="h1-title">Créer une organisation</h1>

        <form @submit.prevent="PostOrganisation">
            <div class="form">
                <div class="form__field">
                    <div class="field__left">
                        <div class="left__column">
                            <label for="name">Nom de l'organisation</label>
                            <input class="dotted" id="name" v-model="name" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit">Créer</button>
            <div class="button_create">

            </div>
        </form>
        <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'
const dayjs = require('dayjs')
import { http } from '../../assets/services/http-common'
import Vue from 'vue'


export default {
    components: {
        TheNavbar,
    },


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
        }
    },

    mounted() { },

    methods: {
        PostOrganisation() {
            http({
                url: 'organisation_teams',
                method: 'Post',
                data: {
                    name: this.name,
                },
            })
                .then(() => {
                    this.$store.dispatch('loadFestivals')
                    Vue.$toast.success("Organisation créée")
                    this.$router.go(-1)
                })
                .catch((e) => {
                    Vue.$toast.error("Erreur : " + e)
                })
        },
    },
}

//computed: mapState(["festivals"]),
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/festivalInput.scss';

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

.form {
    margin-bottom: 2%
}

button {
    cursor: pointer;
}
</style>
