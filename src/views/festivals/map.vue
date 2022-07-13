<template>
    <div class="map">
        <div class="singers" v-if="chanteurs === true">
            <h1 class="h1-title">Carte</h1>

            <div class="searchbar">
                <form @submit.prevent="searchCity">
                    <input type="text" v-model="localisation" placeholder="Rue, ville du festival" />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div class="carte">
                <gmap-map :center="center" ref="map" :zoom="12" style="width: 100%; height: 400px" @click="addMarker">
                    <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="edit(index)"
                        :label="m.name"
                    />

                    <div class="singer" v-if="singer !== null">
                        <gmap-marker
                            :key="index"
                            v-for="(m, index) in singer"
                            :position="m.position"
                            @click="edit(index)"
                            :label="m.name"
                        />
                    </div>

                    <gmap-polygon
                        v-if="paths.length > 0"
                        :paths="paths"
                        :zIndex="0"
                        :editable="true"
                        @paths_changed="updateEdited($event)"
                        @rightclick="handleClickForDelete"
                        :options="polygon.polygonOptions"
                        ref="polygon"
                    ></gmap-polygon>
                </gmap-map>

                <div>
                    <button @click="addPath()">Add Path</button>
                    <button @click="removePath()">Remove Path</button>
                </div>

                <div>
                    <label for="geojson">
                        <strong>Paste your geojson here:</strong>
                    </label>
                    <textarea
                        id="geojson"
                        :value="polygonGeojson"
                        style="width: 100%; height: 100px"
                        @input="readGeojson"
                    >
                    </textarea>
                    <div v-if="errorMessage">{{ errorMessage }}</div>
                </div>
            </div>

            <div class="nameSinger">
                <form @submit.prevent="editName()">
                    <input type="text" v-model="name" placeholder="Nom de l'artiste" />
                    <button type="submit">Ajouter</button>
                </form>
            </div>

            <button @click="postCoordonateSinger">Poster</button>
        </div>
        <mapShapeVue v-else></mapShapeVue>
        <fieldset>
            <legend>Sélectionner la carte que vous voulez</legend>

            <div>
                <input type="radio" id="chanteurs" name="drone" value="chanteurs" v-on:click="whichMap()" checked />
                <label for="chanteurs">Chanteurs</label>
            </div>

            <div>
                <input type="radio" id="map" name="drone" value="map" v-on:click="whichMap()" />
                <label for="map">map</label>
            </div>
        </fieldset>
        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import mapShapeVue from '../../components/mapShape.vue'
import { http } from '../../assets/services/http-common'
import axios from 'axios'
import TheNavbar from '@/components/Navbar'
import _ from 'lodash'

function closeLoop(path) {
    return path.concat(path.slice(0, 1))
}

export default {
    name: 'mapPage',

    components: {
        TheNavbar,
        mapShapeVue,
    },

    data() {
        return {
            localisation: '',
            loc: '',
            center: {
                lat: 48.858705,
                lng: 2.342865,
            },
            markers: [
                {
                    lat: 45.52387761780054,
                    lng: 73.63592349243164,
                },
            ],
            count: 0,
            idMarker: null,
            name: '',
            indexId: [],
            marker: [],
            newName: '',
            label: 'oui',
            split: '',
            singer: '',
            chanteurs: true,
            map: '',
            edited: null,
            paths: [],
            mvcPaths: null,
            errorMessage: null,
            polygonGeojson: '',
            shape: '',
            string: '',
            polygon: {
                polygonOptions: {
                    clickable: false,
                },
            },
            indexIdOld: [],
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]

        this.getShape()
        this.getCoordonateSinger()
    },

    watch: {
        polygonPaths: _.throttle(function (paths) {
            if (paths && this.shape !== null) {
                this.paths = paths
                this.polygonGeojson = JSON.stringify(
                    {
                        type: 'Polygon',
                        coordinates: this.paths.map((path) => closeLoop(path.map(({ lat, lng }) => [lng, lat]))),
                    },
                    null,
                    2
                )
                console.log(this.polygonGeojson)
            } else {
                this.string = JSON.stringify(
                    {
                        type: 'Polygon',
                        coordinates: this.paths.map((path) => closeLoop(path.map(({ lat, lng }) => [lng, lat]))),
                    },
                    null,
                    2
                )
                console.log(this.polygonGeojson)
            }
        }, 1000),
    },

    computed: {
        polygonPaths: function () {
            if (!this.mvcPaths) return null

            let paths = []
            for (let i = 0; i < this.mvcPaths.getLength(); i++) {
                let path = []
                for (let j = 0; j < this.mvcPaths.getAt(i).getLength(); j++) {
                    let point = this.mvcPaths.getAt(i).getAt(j)
                    path.push({ lat: point.lat(), lng: point.lng() })
                }
                paths.push(path)
            }
            return paths
        },
    },

    methods: {
        whichMap() {
            this.chanteurs = document.getElementById('chanteurs').checked
            if (this.chanteurs !== true) {
                this.chanteurs = false
            }
        },

        trigger() {
            const marker = document.getElementById('marker')
            marker.click()
            console.log(marker)
        },

        searchCity() {
            axios
                .get(
                    'http://api.positionstack.com/v1/forward?access_key=0d29376a9dd42c92d6070823c2866fea&query=' +
                        this.localisation
                )
                .then((loc) => {
                    this.loc = loc.data.data[0]

                    this.center.lat = this.loc.latitude
                    this.center.lng = this.loc.longitude
                })
        },

        addMarker(event) {
            const marker = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            }

            const i = this.count++
            console.log(this.markers)
            this.markers.push({
                id: i,
                name: this.name,
                position: marker,
            })
            this.$refs.map.panTo(marker)

            //this.center = marker;
        },

        edit(index) {
            this.indexIdOld.push(index)

            if (this.indexIdOld.length > 1) {
                this.indexIdOld = []
                this.indexIdOld.push(index)
            }
            console.log(this.indexIdOld)
        },

        editName() {
            if (this.singer[this.indexId] !== []) {
                this.markers[this.indexId] = {
                    id: this.singer[this.indexId].id,
                    name: this.singer[this.indexId].name,
                    label: this.singer[this.indexId].name,
                    position: this.singer[this.indexId].position,
                }

                console.log(this.markers)
            }

            this.markers[this.indexIdOld].name = this.name
            this.markers[this.indexIdOld].label = this.name

            this.indexId = []
            this.name = ''
        },

        postCoordonateSinger() {
            console.log(this.markers)
            const shape = JSON.parse(this.polygonGeojson)
            http.put('festivals/' + this.split, {
                map: {
                    singers: this.markers,
                    shape: [shape],
                },
            })
        },

        getCoordonateSinger() {
            http.get('festivals/' + this.split).then((singer) => {
                this.singer = singer.data.map.singers
                console.log(this.singer)
            })
        },

        addShape() {
            const shape = JSON.parse(this.polygonGeojson)
            http.put('festivals/' + this.split, {
                map: { shape: [shape] },
            })
        },

        getShape() {
            http.get('festivals/' + this.split).then((shape) => {
                this.shape = shape.data.map
                this.polygonGeojson = this.shape
                this.string = JSON.stringify(this.polygonGeojson)
                console.log(this.string)
            })
        },

        updateCenter: function (place) {
            this.center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            }
        },
        updateEdited: function (mvcPaths) {
            this.mvcPaths = mvcPaths
        },
        addPath: function () {
            // obtain the bounds, so we can guess how big the polygon should be
            var bounds = this.$refs.map.$mapObject.getBounds()
            var northEast = bounds.getNorthEast()
            var southWest = bounds.getSouthWest()
            var center = bounds.getCenter()
            var degree = this.paths.length + 1
            var f = Math.pow(0.66, degree)

            // Draw a triangle. Use f to control the size of the triangle.
            // i.e., every time we add a path, we reduce the size of the triangle
            var path = [
                { lng: center.lng(), lat: (1 - f) * center.lat() + f * northEast.lat() },
                {
                    lng: (1 - f) * center.lng() + f * southWest.lng(),
                    lat: (1 - f) * center.lat() + f * southWest.lat(),
                },
                {
                    lng: (1 - f) * center.lng() + f * northEast.lng(),
                    lat: (1 - f) * center.lat() + f * southWest.lat(),
                },
            ]

            this.paths.push(path)
        },
        removePath: function () {
            this.paths.splice(this.paths.length - 1, 1)
        },
        handleClickForDelete($event) {
            if ($event.vertex) {
                this.$refs.polygon.$polygonObject.getPaths().getAt($event.path).removeAt($event.vertex)
            }
        },
        readGeojson: function ($event) {
            try {
                this.polygonGeojson = $event.target.value

                var v = JSON.parse($event.target.value)

                this.paths = v.coordinates.map((linearRing) =>
                    linearRing.slice(0, linearRing.length - 1).map(([lng, lat]) => ({ lat, lng }))
                )

                this.errorMessage = null
            } catch (err) {
                this.errorMessage = err.message
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/fonts.scss';

.searchbar,
.carte {
    width: 800px;
    margin: 0 50% 0 40%;
    transform: translateX(-40%);
    justify-content: center;

    form {
        display: flex;
        gap: 15px;

        input {
            color: black;
            width: 500px;
        }

        button {
            padding: 10px 20px;
            color: black;
        }
    }
}
</style>