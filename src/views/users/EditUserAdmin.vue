<template>
    <div class="userEdit">
        <h1 class="h1-title">Mon compte</h1>
        <form @submit.prevent="editUser">
            <div class="user">
                <div class="user__img">
                    <div class="logo__festival selectFile__logo" v-if="this.user.profilePicture === null">
                        <input type="file" accept="image/*" id="imageNotFound" ref="file"
                            v-on:onchange="loadFile(event)" @change="selectImage" />
                        <img class="logo" src="../../assets/img/logo.svg" v-on:click="addImage()" />
                    </div>

                    <div class="logo__festival selectFile__logo" v-else>
                        <input type="file" accept="image/*" id="image" ref="file" v-on:onchange="loadFile(event)"
                            @change="selectImage" />
                        <img :src="'https://hangover.timotheedurand.fr' + this.user.profilePicture.contentUrl" alt=""
                            v-on:click="addImage()" />
                    </div>
                </div>

                <div class="user__info">
                    <div class="row">
                        <div class="rowOne">
                            <label for="LastName">Nom</label>
                            <input class="dotted" id="LastName" v-model="user.lastName" type="text" />
                            <label for="FirstName">Prénom</label>
                            <input class="dotted" id="FirstName" v-model="user.firstName" type="text" />
                        </div>
                        <div class="rowOne">
                            <label for="Email">Email</label>
                            <input class="dotted" id="Email" v-model="user.email" type="email" />

                            <label for="Password">Password</label>
                            <input class="dotted" id="Password" v-model="user.password" type="text" />
                        </div>
                    </div>
                    <div class="submit">
                        <input type="submit" value="Modifier" />
                    </div>
                </div>

            </div>


        </form>

        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import UploadService from '@/assets/services/UploadFilesService'
import { http } from '../../assets/services/http-common'
import TheNavbar from '@/components/Navbar'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import Vue from 'vue'
global.v = Vuex

export default {
    name: 'userEdit',

    store: store,

    data() {
        return {
            split: '',
            file: '',
            image: '',
        }
    },

    components: {
        TheNavbar,
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]
        this.$store.dispatch('getUser')

        UploadService.getFiles().then((response) => {
            this.imageInfos = response.data
        })
    },

    methods: {
        addImage() {
            this.image = document.getElementById('image')
            if (this.image === null) {
                this.image = document.getElementById('imageNotFound')
            }
            this.image.click()
        },

        selectImage() {
            this.currentImage = this.$refs.file.files.item(0)
        },

        editUser() {
            if (localStorage.getItem('rang', 'ROLE_ADMIN')) {
                http.put('users/' + this.split, {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                }).then((res) => {
                    res.data
                    this.$store.dispatch('getUser')
                    Vue.$toast.success("Utilisateur modifié")
                })
                    .catch((e) => {
                        Vue.$toast.error("Erreur lors de la modification de l'utilisateur : " + e)
                    })
            } else {
                http.put('users/' + this.split, {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                }).then((res) => {
                    res.data
                    this.$store.dispatch('getUser')
                    this.$router.push('/')
                    Vue.$toast.success("Utilisateur modifié")
                })
                    .catch((e) => {
                        Vue.$toast.error("Erreur lors de la modification de l'utilisateur : " + e)
                    })
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
                            url: 'users/' + this.split,
                            method: 'Put',
                            data: {
                                profilePicture: 'api/media/' + this.idImage,
                            },
                        }).then(() => {
                            this.$store.dispatch('getUser')
                            Vue.$toast.success("image de l'utilisateur modifié")
                        })
                        this.message = response.data.message
                        return UploadService.getFiles()
                    })
                    .catch((e) => {
                        Vue.$toast.error("Erreur lors de la modification de l'image de l'utilisateur : " + e)
                    })
            }
        },
    },

    computed: {
        ...mapState(['user']),
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/festivalInput.scss';

.user {
    display: flex;
    gap: 10%;

    .user__info {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5%;

        .submit {
            width: 150px;
        }


        .row {
            display: flex;
            gap: 10%;

            &One {
                display: flex;
                flex-direction: column;
                width: 32%;

                input {
                    width: 100%;
                }
            }
        }
    }
}

.user__img {
    .image {
        width: 150px;
        height: 150px;
        border: 1px dashed white;
    }
}

.logo__festival {
    input {
        width: 0.1px;
        height: 0.1px;
        padding: 0;
        border: 0;
    }
}

img {
    width: 250px;
    cursor: pointer;
}
</style>
