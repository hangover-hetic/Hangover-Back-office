<template>
    <div class="feed">
        <h1 class='h1-title'>Modération du feed</h1>
        <div class="posts" v-for="item in posts" :key="item.posts">
            <div class="user">
                <div class="informations">
                    <div class="image__profil">
                        <router-link :to="{ name: 'user', params: { name: item.relatedUser.id } }"
                            v-if="item.relatedUser.profilePicture !== null"><img :src="
                                'https://hangover.timotheedurand.fr' + item.relatedUser.profilePicture.contentUrl
                            " /></router-link>
                    </div>
                    <div class="name">
                        <p>{{ item.relatedUser.firstName + ' ' + item.relatedUser.lastName }}</p>
                    </div>
                </div>
                <div class="ban">
                    <button>Bannir</button>
                </div>
            </div>

            <div class="image">
                <img :src="'https://hangover.timotheedurand.fr' + item.media.contentUrl" />
            </div>

            <div class="message" v-if="item.message !== null">
                <p>Message :</p>
                <p>
                    {{ item.message }}
                </p>
            </div>

            <div class="decision">
                <div class="published">
                    <button v-on:click="published(item.id)">Accept</button>
                </div>

                <div class="reject">
                    <button v-on:click="reject(item.id)">Rejeter</button>
                </div>
            </div>
        </div>

        <div class="posts" v-for="item in arr" :key="item.arr">
            <div class="user">
                <div class="informations">
                    <div class="image__profil">
                        <router-link :to="{ name: 'user', params: { name: item.relatedUser.id } }"
                            v-if="item.relatedUser.firstName !== null">
                            <!--<img :src="
                                'https://hangover.timotheedurand.fr' + item.relatedUser.profilePicture.contentUrl
                            " />-->
                        </router-link>
                    </div>
                    <div class="name">
                        <p>{{ item.relatedUser.firstName + ' ' + item.relatedUser.lastName }}</p>
                    </div>
                </div>
                <div class="ban">
                    <button>Bannir</button>
                </div>
            </div>

            <div class="image">
                <img :src="'https://hangover.timotheedurand.fr' + item.media.contentUrl" />
            </div>

            <div class="message" v-if="item.message !== null">
                <p>Message :</p>
                <p>
                    {{ item.message }}
                </p>
            </div>

            <div class="decision">
                <div class="published">
                    <button v-on:click="published(item.id)">Accept</button>
                </div>

                <div class="reject">
                    <button v-on:click="reject(item.id)">Rejeter</button>
                </div>
            </div>
        </div>

        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'
import { http } from '../../assets/services/http-common'
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill'
import Vue from 'vue'

const EventSource = NativeEventSource || EventSourcePolyfill

export default {
    name: 'feedPage',

    components: {
        TheNavbar,
    },

    data() {
        return {
            split: '',
            posts: '',
            post: '',
            arr: [],
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]

        this.oldPosts()
        this.mercureSubscribe()
    },

    methods: {
        oldPosts() {
            http.get('festivals/' + this.split + '/posts/moderation').then((posts) => {
                this.posts = posts.data
                console.log(this.posts)
            })
        },

        mercureSubscribe() {
            const url = new URL('https://hangover-hub.timotheedurand.fr/.well-known/mercure')
            url.searchParams.append('topic', 'https://hangoverapp.com/festival/' + this.split + '/moderation/', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('mercureToken'),
                },
            })

            const eventSource = new EventSource(url)

            eventSource.onmessage = (e) => {
                this.post = JSON.parse(e.data)
                console.log(this.post)
                this.arr.push(this.post)
                console.log(this.arr)
                console.log(this.post)
            }
        },

        published(id) {
            http.put('/posts/' + id + '/publish', {})
                .then(() => {
                    this.arr = []
                    this.oldPosts()
                    Vue.$toast.success("Le post a bien été publié")
                })
                .catch((e) => {
                    Vue.$toast.error("Erreur lors de la publication du post" + e)
                })
        },

        reject(id) {
            http.delete('/posts/' + id).then(() => {
                this.arr = []
                this.oldPosts()
                Vue.$toast.success("Le post a bien été rejeté")
            })
                .catch((e) => {
                    Vue.$toast.error("Error, le post n'a pas été rejeté" + e)
                })
        },
    },
}
</script>

<style scoped lang="scss">
.posts {
    margin: 30px;
    color: white;
}

.user {
    width: 600px;
    margin: 0 50% 0 40%;
    transform: translateX(-40%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #494949;

    .informations {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        margin: 0 15px;

        .image__profil {
            img {
                cursor: pointer;
                width: 50px;
                height: 50px;
                border-radius: 30px;
                margin-top: 50%;
                transform: translateY(-20%);
            }
        }
    }

    .ban {
        margin: 0 15px;

        button {
            background-color: #b10000;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }
}

.image {
    width: 600px;
    margin: 0 50% 0 40%;
    transform: translateX(-40%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #494949;

    img {
        width: 600px;
    }
}

.message {
    width: 600px;
    margin: 0 50% 0 40%;
    transform: translateX(-40%);
    align-items: center;
    background-color: #494949;

    p {
        margin: 0;
        padding: 10px 0 0 15px;
    }
}

.decision {
    width: 600px;
    margin: 0 50% 0 40%;
    padding: 15px 0 15px 0;
    transform: translateX(-40%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #494949;

    .published,
    .reject {
        margin: 0 15px;
    }

    .reject {
        button {
            background-color: #b10000;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }

    .published {
        button {
            background-color: #29b100;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }
}
</style>
