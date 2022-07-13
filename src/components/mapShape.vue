<template>
    <div class="shape">
        <h1 class="h1-title">oui</h1>
        <label>
            <strong>Start at:</strong>
            <gmap-autocomplete @place_changed="updateCenter($event)" />
        </label>

        <br />
        <br />

        <gmap-map :center="center" :zoom="12" style="width: 100%; height: 500px" ref="map">
            <gmap-polygon
                v-if="paths.length > 0"
                :paths="paths"
                :editable="true"
                @paths_changed="updateEdited($event)"
                @rightclick="handleClickForDelete"
                ref="polygon"
            >
            </gmap-polygon>
        </gmap-map>

        <div>
            <button @click="addPath()">Add Path</button>
            <button @click="removePath()">Remove Path</button>
        </div>

        <br />

        <div>
            <label for="geojson">
                <strong>Paste your geojson here:</strong>
            </label>
            <textarea id="geojson" :value="polygonGeojson" style="width: 100%; height: 100px" @input="readGeojson">
            </textarea>
            <div v-if="errorMessage">{{ errorMessage }}</div>
        </div>

        <div class="addShape">
            <form @submit.prevent="addShape">
                <button type="submit">ajouter la shape</button>
            </form>
        </div>
        <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from '@/components/Navbar'
import _ from 'lodash'
import { http } from '../assets/services/http-common'

function closeLoop(path) {
    return path.concat(path.slice(0, 1))
}

export default {
    name: 'mapShape',

    components: {
        TheNavbar,
    },

    data() {
        return {
            center: { lat: 1.38, lng: 103.8 },
            edited: null,
            paths: [],
            mvcPaths: null,
            errorMessage: null,
            polygonGeojson: '',
            shape: '',
            string: '',
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]

        this.getShape()
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
                this.shape = JSON.stringify(
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
        addShape() {
            const shape = JSON.parse(this.polygonGeojson)
            http.put('festivals/' + this.split, {
                map: { shape: [shape] },
            })
        },

        getShape() {
            http.get('festivals/' + this.split).then((shape) => {
                this.shape = shape.data.map.shape
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
@import '../assets/style/fonts.scss';
</style>