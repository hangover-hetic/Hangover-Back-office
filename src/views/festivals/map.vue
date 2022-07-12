<template>

    <div class="map">
        <h1>Carte</h1>
        <div class="searchbar">
            <form @submit.prevent="searchCity">
                <input type="text" v-model="localisation" placeholder="Rue, ville du festival">
                <button type="submit">Search</button>
                {{ loc.latitude }}
                {{ loc.longitude }}
            </form>
        </div>
        <TheNavbar></TheNavbar>
    </div>

</template>

<script>
import axios from 'axios'
import TheNavbar from '@/components/Navbar'

export default {
    name: 'mapPage',

    components: {
        TheNavbar
    },

    data() {
        return {
            localisation: '',
            loc: ''
        }
    },

    methods: {
        searchCity() {
            axios
                .get('http://api.positionstack.com/v1/forward?access_key=0d29376a9dd42c92d6070823c2866fea&query=' + this.localisation)
                .then((loc) => {
                    this.loc = loc.data.data[0]
                })
        }
    }


}

</script>

<style scoped lang="scss">
.searchbar {
    width: 800px;
    margin: 0 50% 0 40%;
    transform: translateX(-40%);
    justify-content: center;

    form {
        display: flex;
        gap: 15px;

        input {
            color: black;
            width: 500px
        }

        button {
            padding: 10px 20px;
            color: black
        }
    }
}
</style>