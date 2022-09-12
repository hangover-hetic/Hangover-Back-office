<template>
    <div class="container">
        <form @submit.prevent="modifFestivals">
            <div class="logo">
                <div class="logo__festival selectFile__logo" v-if="this.screens.logo === null">
                    <input type="file" accept="image/*" id="iconNotFound" ref="logo" @change="selectImage" />
                    <img class="logo" src="../../assets/img/logo.svg" v-on:click="addIcon()" />
                </div>

                <div class="logo__festival selectFile__logo" v-else>
                    <input type="file" accept="image/*" id="icon" ref="logo" @change="selectImage" />
                    <img
                        :src="'https://hangover.timotheedurand.fr' + this.screens.logo.contentUrl"
                        alt=""
                        v-on:click="addIcon()"
                    />
                </div>

                <div class="title">
                    <h1 class="h1-title">Modifier {{ screens.name }}</h1>
                </div>
            </div>

            <div class="form">
                <div class="box1" v-if="this.screens.cover !== null">
                    <div class="image__festivals">
                        <img
                            v-if="this.screens.cover.contentUrl !== undefined"
                            :src="'https://hangover.timotheedurand.fr' + this.screens.cover.contentUrl"
                            alt=""
                            v-on:click="addImage()"
                        />
                        <input type="file" accept="image/*" id="image" ref="file" @change="selectImage" />
                    </div>
                </div>

                <div class="box1" v-else>
                    <input
                        class="imageNone"
                        type="file"
                        accept="image/*"
                        id="imageNotFound"
                        ref="file"
                        @change="selectImage"
                    />
                </div>

                <div class="form__field">
                    <div class="field__left">
                        <div class="left__column">
                            <label for="name">Nom du festival</label>
                            <input class="dotted" id="name" v-model="screens.name" type="text" />

                            <label for="lieuFestival">Lieu du festival</label>
                            <input class="dotted" id="lieuFestival" v-model="screens.location" type="text" />

                            <label for="lieuFestival">Lien du festival</label>
                            <input class="dotted" id="lieuFestival" v-model="screens.link" type="url" />

                            <label for="couleur">Couleur des écrans</label>
                            <div class="input-color">
                                <div class="color-preview" :style="{ 'background-color': screens.screenColor }" />
                                <input class="dotted" id="couleur" v-model="screens.screenColor" type="color" />
                            </div>
                        </div>

                        <div class="right__column">
                            <label for="date">Date de début</label>
                            <input class="dotted" id="date_start" v-model="start_date" type="date" />

                            <label for="date">Date de fin</label>
                            <input class="dotted" id="date_end" v-model="end_date" type="date" />

                            <label for="status">Status</label>
                            <select id="status" v-model="screens.status" class="dotted">
                                <option>PUBLISHED</option>
                                <option>DRAFT</option>
                            </select>
                        </div>
                        <div class="festival-modification-nav">
                            <h3>Gérer</h3>
                            <router-link :to="{ name: 'screens', params: { name: this.split } }">Ecrans</router-link>
                            <router-link :to="{ name: 'festivalShows', params: { id: this.split } }">Shows</router-link>
                            <router-link :to="{ name: 'moderation', params: { id: this.split } }"
                                >Modération</router-link
                            >
                            <router-link :to="{ name: 'carte', params: { id: this.split } }">Carte</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form__description">
                <label for="description">Description</label>
                <textarea class="dotted" id="description" v-model="screens.description" type="text" />
            </div>

            <div class="button_create">
                <button type="submit">Modifier</button>
            </div>
        </form>

        <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'

const dayjs = require('dayjs')
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import { http } from '../../assets/services/http-common'
import Vue from 'vue'
global.v = Vuex
import UploadService from '../../assets/services/UploadFilesService'

export default {
    components: {
        TheNavbar,
    },

    store: store,

    data() {
        return {
            dayjs,
            start_date: '',
            end_date: '',
            idImage: '',
            suppImage: '',
            token: '',
            username: '',
            label: '',
            tokenScreens: '',
            file: '',
            icon: '',
            split: '',
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]

        this.$store.dispatch('loadScreens')
        this.$store.dispatch('getStyles')
        this.listScreens()

        setTimeout(this.date, 500)
        this.token = localStorage.getItem('token')

        UploadService.getFiles().then((response) => {
            this.imageInfos = response.data
        })
    },

    methods: {
        addIcon() {
            this.icon = document.getElementById('icon')
            if (this.icon === null) {
                this.icon = document.getElementById('iconNotFound')
            }
            this.icon.click()
        },

        addImage() {
            const image = document.getElementById('image')
            image.click()
        },

        date() {
            this.start_date = dayjs(this.screens.startDate).format('YYYY-MM-DD')
            this.end_date = dayjs(this.screens.endDate).format('YYYY-MM-DD')
        },

        selectImage() {
            this.currentImage = this.$refs.file.files.item(0)
            this.currentLogo = this.$refs.logo.files.item(0)
        },

        modifFestivals() {
            if (this.screens.gallery[0] !== undefined) {
                if (document.getElementById('image').files.length !== 0) {
                    this.suppImage = this.screens.gallery[0].id
                    http.delete('media/' + this.suppImage)
                }
            }

            this.file = document.getElementById('image')
            if (this.file === null) {
                this.file = document.getElementById('imageNotFound')
            }

            if (this.file !== null && this.file.files.length !== 0) {
                UploadService.upload(this.currentImage)
                    .then((response) => {
                        this.idImage = response.data.id

                        http({
                            url: 'festivals/' + this.split,
                            method: 'Put',
                            data: {
                                cover: 'api/media/' + this.idImage,
                            },
                        }).then(() => {
                            this.$store.dispatch('loadScreens')
                            Vue.$toast.success('Votre image a bien été mise à jour')
                        })
                        this.message = response.data.message
                        return UploadService.getFiles()
                    })
                    .catch((e) => {
                        Vue.$toast.error("Votre image n'a pas pu être mise à jour" + e)
                    })
            }

            this.file = document.getElementById('icon')
            if (this.file === null) {
                this.file = document.getElementById('iconNotFound')
            }

            if (this.file !== null && this.file.files.length !== 0) {
                UploadService.upload(this.currentLogo)
                    .then((response) => {
                        this.idImage = response.data.id

                        http({
                            url: 'festivals/' + this.split,
                            method: 'Put',
                            data: {
                                logo: 'api/media/' + this.idImage,
                            },
                        }).then((res) => {
                            this.$store.dispatch('loadScreens')
                            this.response = res.data
                            Vue.$toast.success('Votre image a bien été mise à jour')
                        })
                        this.message = response.data.message
                        return UploadService.getFiles()
                    })
                    .catch((e) => {
                        Vue.$toast.error("Votre image n'a pas pu être mise à jour" + e)
                    })
            }

            http({
                url: 'festivals/' + this.split,
                method: 'Put',
                data: {
                    name: this.screens.name,
                    description: this.screens.description,
                    location: this.screens.location,
                    startDate: this.start_date,
                    endDate: this.end_date,
                    status: this.screens.status,
                    link: this.screens.link,
                    screenColor: this.screens.screenColor,
                },
            })
                .then(() => {
                    this.$store.dispatch('loadScreens')
                    setTimeout(this.addMediaImage, 500)
                    Vue.$toast.success('Les informations de votre Festival on été mise à jour')
                })
                .catch((e) => {
                    Vue.$toast.error("Les informations de votre Festival n'ont pas été mise à jour" + e)
                })
        },

        addScreens() {
            http.post('screens', {
                festival: '/api/festivals/' + this.split,
            })
                .then(() => {
                    this.listScreens()
                    Vue.$toast.success('')
                })
                .catch((e) => {
                    Vue.$toast.error(e)
                })
        },

        listScreens() {
            http.get('festivals/' + this.split + '/screens').then((tokenScreens) => {
                this.tokenScreens = tokenScreens.data
            })
        },
    },

    computed: {
        ...mapState(['screens', 'festivals', 'styles']),
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/festivalInput.scss';

.container {
    color: white;
    margin: auto;
    display: grid;
    grid-template-columns: 100% 1fr;
    gap: 20px;

    .logo {
        display: flex;
        align-items: center;
        gap: 15px;

        .selectFile__logo {
            display: flex;
            align-items: center;

            input {
                width: 0.1px;
                height: 0.1px;
                padding: 0 !important;
                border: 0;
            }

            .logo {
                width: 50px;
                height: 50px;
            }
        }

        .logo__festival {
            img {
                cursor: pointer;
                width: 50px;
                height: 50px;
                border-radius: 30px;
            }
        }
    }
}

.button_create {
    width: 100%;

    button {
        width: 144px;
        margin-right: 1.5%;
    }
}

.hide {
    display: none !important;
}

.show {
    display: block !important;
}

th {
    padding-bottom: 0 !important;

    &:nth-child(2) {
        text-align: right;

        a {
            img {
                margin-right: 1.5%;
            }
        }
    }
}

select {
    width: 100%;
    background-color: #202020;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: 2px dashed #939393;
    border-radius: 4px;
    cursor: pointer;

    option {
        color: #ffffff;
    }
}

.flex {
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 5%;
}

.box1.create__singers {
    width: 300px;
}

.box1 {
    display: flex;
    flex-direction: column;

    input {
        display: flex;
        align-self: center;
    }

    .image {
        display: flex;
        flex-direction: column;

        img {
            width: 175px;
            height: 220px;
            cursor: pointer;
        }
    }

    .image__festivals {
        input {
            width: 0.1px;
            height: 0.1px;
            padding: 0;
            border: 0px;
        }

        img {
            height: 300px;
            cursor: pointer;
        }
    }

    input.imageNone {
        padding: 75px 15px !important;
    }
}

.field__left {
    gap: 3% !important;
}

.input-color {
    display: flex;
    gap: 10px;

    input {
        margin: 0;
    }

    .color-preview {
        height: 30px;
        width: 30px;
    }
}

.festival-modification-nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 20px;
    width: 50%;

    h3 {
        margin-top: 0;
        margin-bottom: 0px;
        font-weight: 400;
    }

    a {
        text-decoration: none;
        box-sizing: border-box;
        padding: 20px 10px;
        background-color: transparent;
        border: #fff 1px solid;
        color: #fff;
    }
}

.form__description {
    display: flex;
    flex-direction: column;

    align-content: flex-end;
    margin-left: 32.5%;
    width: 63%;
}

.form {
    width: 100%;
}

input {
    box-sizing: border-box;
}
</style>
