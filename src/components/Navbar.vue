<script>
export default {
    name: 'TheNavbar',
}
</script>

<template>
    <div class="navbar">
        <nav>
            <div id="logo">
                <img src="../assets/img/hangover-logo.png" alt="" />
            </div>
            <router-link to="/organisationTeam" :style="{backgroundColor : orga}">
                <font-awesome-icon icon="fa-solid fa-building" class="size" />
            </router-link>
            <router-link to="/users" v-if="role" :style="{backgroundColor : user}">
                <font-awesome-icon icon="fa-solid fa-user-group" class="size"/>
            </router-link>
            <router-link :to="{ path: '/account/' + idUser }" :style="{backgroundColor : account}">
                <font-awesome-icon icon="fa-solid fa-circle-user" class="size" />
            </router-link>
            <router-link :to="{ path: '/licences' }" v-if="role" :style="{backgroundColor : licence}">
                <font-awesome-icon icon="fa-solid fa-file-contract" class="size"/>
            </router-link>
            <router-link :to="{ path: '/styles' }" v-if="role" :style="{backgroundColor : styles}">
                <font-awesome-icon icon="fa-solid fa-music" class="size"/>
            </router-link>
            <a href="#" v-on:click="signOut()">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="size-arrow-bottom"/>
            </a>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'TheNavBar',

    props:{
        orga:{
            type: String,
            default: ''
        },
        user:{
            type: String,
            default: ''
        },
        account:{
            type: String,
            default: ''
        },
        licence:{
            type: String,
            default: ''
        },
        styles:{
            type: String,
            default: ''
        }

    },

    data() {
        return {
            role: false,
            idUser: '',
        }
    },

    mounted() {
        if (window.localStorage.getItem('rang') === 'ROLE_ADMIN') {
            this.role = true
        } else {
            this.role = false
        }

        this.idUser = localStorage.getItem('idUser')
    },

    methods: {
        signOut() {
            localStorage.removeItem('rang')
            localStorage.removeItem('token')
            location.reload()
        },
    },
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

nav {
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    padding: 0, 5em;
    z-index: 1;
    height: 100vh;
    background: rgb(66, 66, 66);
    overflow: hidden;
}

nav #logo {
    background-color: #4bc0c8;
    height: 4rem;
    line-height: 4rem;
    padding-left: 0.4rem;
}

nav #logo > img {
    height: 4rem;
    line-height: 4rem;
}

nav a {
    color: #eee;
    text-decoration: none;
    display: table;
    width: 70px;
    background: rgb(66, 66, 66);
    transition: 0.3s background-color ease-in-out;
}
nav a .fa {
    width: 10rem;
    display: table-cell;
    font-size: 2rem;
    padding: 1rem 0;
    text-align: center;
}
.size {
    width: 4rem;
    display: table-cell;
    font-size: 1.4rem;
    padding: 1.1rem 0;
    text-align: center;
}

a:hover {
    background-color: rgb(99, 99, 99);
    transition: 0.3s background-color ease-in-out;
}
.size-arrow-bottom {
    width: 70px;
    display: table-cell;
    font-size: 1.4rem;
    padding: 1.1rem 0;
    text-align: center;
    position: fixed;
    bottom: 0;
    background: rgb(66, 66, 66);
    transition: 0.3s background-color ease-in-out;
}
.size-arrow-bottom:hover {
    background-color: rgb(99, 99, 99);
    transition: 0.3s background-color ease-in-out;
}
</style>
