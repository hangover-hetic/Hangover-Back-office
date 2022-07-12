<template>

    <div class="map">
<<<<<<< HEAD
        <h1 class="h1-title">Carte</h1>
=======
        <h1>Carte</h1>
>>>>>>> adrien
        <div class="searchbar">
            <form @submit.prevent="searchCity">
                <input type="text" v-model="localisation" placeholder="Rue, ville du festival">
                <button type="submit">Search</button>
                {{ loc.latitude }}
                {{ loc.longitude }}
            </form>
        </div>
<<<<<<< HEAD
        <div class="carte">
            <label>
                <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
                <button @click="addLocationMarker">Add</button>
            </label>
            <br />


            <br>
            <gmap-map :zoom="14" :center="center" style="width:100%;  height: 600px;" @place_changed="initMarker"
                @click="addLocationMarker">
                <gmap-marker :key="index" v-for="(m, index) in locationMarkers" :position="m.position"
                    @click="center = m.position"></gmap-marker>
            </gmap-map>
        </div>
        <TheNavbar></TheNavbar>
    </div>


=======
        <TheNavbar></TheNavbar>
    </div>

>>>>>>> adrien
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
<<<<<<< HEAD
            loc: '',
            center: {
                lat: '',
                lng: ''
            },
            locationMarkers: [],
            locPlaces: [],
            existingPlace: null
        }
    },

    mounted() {
        this.locateGeoLocation();
    },

=======
            loc: ''
        }
    },

>>>>>>> adrien
    methods: {
        searchCity() {
            axios
                .get('http://api.positionstack.com/v1/forward?access_key=0d29376a9dd42c92d6070823c2866fea&query=' + this.localisation)
                .then((loc) => {
                    this.loc = loc.data.data[0]
<<<<<<< HEAD
                    this.center.lat = this.loc.latitude;
                    this.center.lng = this.loc
                })
        },

        initMarker(loc) {
            this.existingPlace = loc;
            console.log(loc)
        },

        addLocationMarker() {
            if (this.existingPlace) {
                const marker = {
                    lat: this.existingPlace.geometry.location.lat(),
                    lng: this.existingPlace.geometry.location.lng()
                };
                this.locationMarkers.push({ position: marker });
                this.locPlaces.push(this.existingPlace);
                this.center = marker;
                this.existingPlace = null;
            }
        },
        locateGeoLocation: function () {
            navigator.geolocation.getCurrentPosition(res => {
                this.center = {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude
                };
            });
=======
                })
>>>>>>> adrien
        }
    }


}

</script>

<style scoped lang="scss">
<<<<<<< HEAD
@import '../../assets/style/fonts.scss';

=======
>>>>>>> adrien
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