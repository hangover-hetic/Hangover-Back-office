<script>
export default {
    name: 'TheNavbar',
}
</script>

<template>
    <div class="navbar">
        <nav>
            <div id="logo" />
            <router-link to="/organisationTeam">
                <font-awesome-icon icon="fa-solid fa-building" class="size" />
            </router-link>
            <router-link to="/users" v-if="role">
                <font-awesome-icon icon="fa-solid fa-user-group" class="size" />
            </router-link>
            <router-link :to="{ path: '/account/' + idUser }">
                <font-awesome-icon icon="fa-solid fa-circle-user" class="size" />
            </router-link>
            <router-link :to="{ path: '/licences' }" v-if="role">
                <font-awesome-icon icon="fa-solid fa-file-contract" class="size" />
            </router-link>
            <router-link :to="{ path: '/styleSingers' }" v-if="role">
                <font-awesome-icon icon="fa-solid fa-music" class="size" />
            </router-link>
            <a href="#" v-on:click="signOut()">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="size-arrow-bottom" />
            </a>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'TheNavBar',
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
    background: #555;
    overflow: hidden;
}

nav #logo {
    background: #ff6600;
    height: 4rem;
    line-height: 4rem;
    padding-left: 0.7rem;
}

nav a {
    color: #eee;
    text-decoration: none;
    display: table;
    width: 70px;
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
    font-size: 2rem;
    padding: 1rem 0;
    text-align: center;
}

a:hover {
    background-color: rgb(145, 143, 143);
}
.size-arrow-bottom {
    width: 4rem;
    display: table-cell;
    font-size: 2rem;
    padding: 1rem 0;
    text-align: center;
    position: fixed;
    bottom: 0;
}
.size-arrow-bottom:hover {
    background-color: rgb(145, 143, 143);
}
</style>
