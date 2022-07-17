<template>
    <div class='map-page'>
        <h1 class='h1-title'>Carte</h1>
        <div class='map-container'>
            <gmap-map
                class='map'
                :center='center'
                ref='map'
                :zoom='12'
                @click='addMarker'
                @idle='syncMapCenter'
                @zoom_changed='saveZoom'
                @center_changed='updateCenter'
                :options='{
                     styles: mapStyles
                }'
            >
                <gmap-custom-marker
                    :key='index'
                    v-for='(m, index) in markers'
                    :marker='m.position'
                    @click.native='onClickMarker(index)'
                >
                    <img :src='types[m.icon]' style='height: 30px;' />
                    <p style='margin: 0;'>{{ m.name }}</p>
                </gmap-custom-marker>

                <gmap-polygon
                    v-if='zone'
                    :paths='[zone]'
                    :zIndex='0'
                    :editable='true'
                    @paths_changed='onZoneEdit'
                    @rightclick='handleClickForDelete'
                    @center_changed='updateCenter'
                    :options='polygon.polygonOptions'
                    ref='polygon'
                ></gmap-polygon>
            </gmap-map>
            <div class='map-aside'>
                <h2>Paramètres</h2>
                <h3>Zone de départ</h3>
                <div class='searchbar'>
                    <form @submit.prevent='searchCity'>
                        <input type='text' v-model='localisation' placeholder='Belfort' />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <h3>Zone</h3>
                <div>
                    <button @click='initZone'>Activer</button>
                    <button @click='removePath'>Supprimer</button>
                </div>
                <h3>Points d'intérêts</h3>
                <label for='mode'>Modification : </label>
                <input type='checkbox' v-model='modificationMode' id='mode' />
                <label for='mode'>Suppression : </label>
                <input type='checkbox' v-model='deleteMode' id='mode' />
                <form @submit.prevent='editName'>
                    <label for='name'>Label :</label>
                    <input type='text' v-model='name' placeholder='Scène 1' id='name' />
                    <button type='submit' v-if='indexId'>Modifier</button>
                </form>
                <label>Type :</label>
                <div
                    class='icon'
                    :class='{"selected" : type === typeSelected}'
                    v-for='type in Object.keys(types)'
                    :key='type'
                    @click='setMarkerType(type)'
                >
                    <img :src='types[type]' class='marker-icon' />
                    <p>{{ type }}</p>
                </div>

                <button @click='postMap'>Enregister la carte</button>
            </div>
        </div>
        <TheNavbar />
    </div>
</template>

<script>
import { http } from '@/assets/services/http-common'
import axios from 'axios'
import TheNavbar from '@/components/Navbar'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import TrashIcon from '@/assets/img/icons/trash.png'
import SceneIcon from '@/assets/img/icons/scene.png'
import HelpIcon from '@/assets/img/icons/help.png'
import mapConfig from '@/assets/mapConfig.json'
import Vue from 'vue'


export default {
    name: 'mapPage',

    components: {
        TheNavbar,
        GmapCustomMarker
    },

    data() {
        return {
            localisation: '',
            loc: '',
            reportedMapCenter: {},
            center: {},
            markers: [],
            types: {
                scene: SceneIcon,
                poubelle: TrashIcon,
                help : HelpIcon,
            },
            typeSelected: 'scene',
            icon: SceneIcon,
            mapStyles: mapConfig,
            count: 0,
            idMarker: null,
            name: '',
            indexId: null,
            marker: [],
            newName: '',
            label: 'oui',
            split: '',
            singer: '',
            chanteurs: true,
            map: '',
            edited: null,
            initialZone: null,
            zone: null,
            errorMessage: null,
            string: '',
            polygon: {
                polygonOptions: {
                    clickable: false
                }
            },
            indexIdOld: [],
            modificationMode: false,
            deleteMode : false,
        }
    },

    mounted() {
        const path = window.location.pathname
        const str = path.split('/')
        this.split = str[str.length - 1]

        this.getMap()
    },
    methods: {
        searchCity() {
            axios
                .get(
                    'http://api.positionstack.com/v1/forward?access_key=0d29376a9dd42c92d6070823c2866fea&query=' +
                    this.localisation
                )
                .then((loc) => {
                    const { latitude, longitude } = loc.data.data[0]
                    this.reportedMapCenter = { lat : latitude, lng : longitude }
                    this.center = { lat : latitude, lng : longitude }
                    console.log(this.reportedMapCenter, this.center)
                })
        },

        addMarker(event) {
            if(this.modificationMode || this.deleteMode) return
            this.createMarker({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            })


            //this.center = marker;
        },

        createMarker({lat, lng}) {
            this.markers.push({
                id: this.markers.length,
                name: this.name,
                position: {lat, lng},
                icon: this.typeSelected
            })
            this.$refs.map.panTo({lat, lng})
        },

        onClickMarker(index) {
            if (!this.markers[index]) {
                console.error(`Le marker ${this.indexId} n'existe pas`)
                return
            }
            if(this.deleteMode) {
                this.markers.splice(index, 1)
                return
            }
            this.name = this.markers[index].name
            this.indexId = index
        },

        editName() {
            if (!this.markers[this.indexId]) return
            this.markers[this.indexId].name = this.name
            this.name = ''
            this.indexId = null
        },

        postMap() {
            http.put('festivals/' + this.split, {
                map: {
                    center: this.center,
                    markers: this.markers,
                    zone: this.zone,
                    zoom: this.zoom
                }
            }).then(() => {
                Vue.$toast.success("La carte est bien mise à jour!")
            }).catch(e => {
                Vue.$toast.error("Un problème est survenu : " + e)
            })
        },

        getMap() {
            http.get('festivals/' + this.split).then(({ data }) => {
                this.markers = data?.map?.markers || []
                this.center = data?.map?.center || {
                    lat: 48.858705,
                    lng: 2.342865
                }
                this.zoom = data?.map?.zoom || this.zoom
                this.setInitialZone(data?.map?.zone || this.initialZone)
            })
        },
        setMarkerType(type) {
            this.typeSelected = type
            this.icon = this.types[this.typeSelected]
        },
        updateCenter: function(latLng) {
            this.reportedMapCenter = {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        },
        syncMapCenter() {
            this.center = this.reportedMapCenter
        },
        saveZoom(zoom) {
            this.zoom = zoom
        },
        onZoneEdit(mvcPaths) {
            console.log(mvcPaths)
            const editedZone = mvcPaths.getAt(0)
            let path = []
            for (let j = 0; j < editedZone.getLength(); j++) {
                let point = editedZone.getAt(j)
                path.push({ lat: point.lat(), lng: point.lng() })
            }
            this.zone = path
        },
        initZone() {
            if (this.zone) return
            // obtain the bounds, so we can guess how big the polygon should be
            const bounds = this.$refs.map.$mapObject.getBounds()
            const northEast = bounds.getNorthEast()
            const southWest = bounds.getSouthWest()
            const center = bounds.getCenter()
            const f = 0.66

            // Draw a triangle. Use f to control the size of the triangle.
            // i.e., every time we add a path, we reduce the size of the triangle
            this.setInitialZone([
                { lng: center.lng(), lat: (1 - f) * center.lat() + f * northEast.lat() },
                {
                    lng: (1 - f) * center.lng() + f * southWest.lng(),
                    lat: (1 - f) * center.lat() + f * southWest.lat()
                },
                {
                    lng: (1 - f) * center.lng() + f * northEast.lng(),
                    lat: (1 - f) * center.lat() + f * southWest.lat()
                }
            ])
        },
        setInitialZone(zone) {
            this.zone = zone
        },
        removePath: function() {
            this.zone = null
        },
        handleClickForDelete($event) {
            if ($event.vertex) {
                this.$refs.polygon.$polygonObject.getPaths().getAt($event.path).removeAt($event.vertex)
            }
        }
    }
}
</script>

<style scoped lang='scss'>
@import '../../assets/style/fonts.scss';

.map-container {
    position: relative;
    display: grid;
    grid-template-columns: 80% 1fr;
    gap: 20px;
    min-height: 80vh;
    color: white;

    .map {
        height: 100%;

    }

    .icon {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        padding: 10px;
        color: grey;

        &.selected {
            color: white
        }

        .marker-icon {
            height: 20px;
        }

        p {
            margin: 0;
        }
    }

}
</style>
