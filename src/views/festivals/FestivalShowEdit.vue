<template>
  <div class="createfestivals">
    <h1 class="h1-title">Modifier le chanteur</h1>

    <form @submit.prevent="putSingers">
      <div class="form">
        <div class="form__field">
          <div class="field__left">
            <div class="left__column">
              <label for="name">Nom</label>
              <input class="dotted" id="name" v-model="singer.name" type="text" />

              <div class="id">
                <label for="selectStyles">Styles de musique :</label>
                <select id="selectStyles" v-model="style" class="dotted" :value="singer.styles[0].id">
                  <option v-for="item in styles" :key="item.styles" class="dotted" :value="item.id">
                    {{ item.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="right__column">
              <label for="date">Date de début</label>
              <input class="dotted" id="date_start" v-model="start_time" type="datetime-local" />

              <label for="startTime">Date de fin</label>
              <input class="dotted" id="startTime" v-model="end_time" type="datetime-local" />
            </div>
            <div class="box1 flex">
              <div class="singers">
                <div class="image" v-if="singer.image !== null">
                  <input class="image" type="file" accept="image/*" id="image" ref="file" @change="selectImage" />
                  <img :src="'https://hangover.timotheedurand.fr' + singer.image.contentUrl" alt=""
                    v-on:click="addImage()" />
                </div>
                <div class="image" v-else>
                  <label for="image1">Image du chanteur</label>
                  <input class="imageNone" type="file" accept="image/*" id="image" ref="file" @change="selectImage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="button_create">
        <button type="submit">Modifier</button>
      </div>
    </form>

    <TheNavbar orga="rgb(99, 99, 99)"></TheNavbar>
  </div>
</template>

<script>
import UploadService from '@/assets/services/UploadFilesService'
import TheNavbar from '@/components/Navbar'
import { http } from '../../assets/services/http-common'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import store from '/src/store/index'
import Vuex from 'vuex'
import Vue from 'vue'
global.v = Vuex

export default {
  name: 'singerPage',
  components: {
    TheNavbar,
  },

  store: store,

  data() {
    return {
      idSingers: '',
      idFestivals: '',
      singer: '',
      start_time: '',
      end_time: '',
      style: '',
      screens: '',
      imageChanged: false,
    }
  },

  mounted() {
    this.$store.dispatch('getStyles')
    this.path()
    this.getShows()
    setTimeout(this.date, 500)

    UploadService.getFiles().then((response) => {
      this.imageInfos = response.data
    })
  },

  methods: {
    addImage() {
      const image = document.getElementById('image')
      image.click()
      this.imageChanged = true

    },

    path() {
      const singersId = window.location.pathname
      const strSinger = singersId.split('/')
      this.idSingers = strSinger[2]
      console.log(this.idSingers)
    },

    date() {
      this.start_time = dayjs(this.singer.startTime).format('YYYY-MM-DDTHH:mm')
      this.end_time = dayjs(this.singer.endTime).format('YYYY-MM-DDTHH:mm')
      console.log(this.idStyle)
    },

    selectImage() {
      this.currentImage = this.$refs.file.files.item(0)
      this.imageChanged = true
    },

    putSingers() {
      if (!this.imageChanged) {
        this.putShow(this.singer.image.id)
        return
      }
      UploadService.upload(this.currentImage)
        .then((response) => {
          this.idImage = response.data.id

          this.putShow(this.idImage)
          this.message = response.data.message
          Vue.$toast.success("Votre image à bien été modifié")
          return UploadService.getFiles()
        })
        .catch((e) => {
          Vue.$toast.error("Votre image n'a pas été modifié" + e)
        })
    },

    putShow(idImage) {
      http({
        url: 'shows/' + this.idSingers,
        method: 'Put',
        data: {
          image: 'api/media/' + idImage,
          name: this.singer.name,
          startTime: this.start_time,
          endTime: this.end_time,
          styles: ['/api/styles/' + this.style],
        },
      }).then((res) => {
        this.singer = res.data
        this.getShows()
        this.$toast.success("Show modifié avec succès !")
      }).catch(e => {
        this.$toast.error("Erreur" + e)
      })
    },

    getShows() {
      http.get('shows/' + this.idSingers).then((singer) => {
        this.singer = singer.data
      })
    },
  },

  computed: {
    ...mapState(['styles']),
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/style/liste.scss';
@import '../../assets/style/festivalInput.scss';

.createfestivals {
  margin: auto;
}

.box1 {
  display: flex;
  align-items: center;

  input {
    display: flex;
    align-self: center;
    padding: 75px 15px;
  }
}

button {
  cursor: pointer;
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

.image {
  img {
    width: 150px;
    margin-top: -100px;
  }
}

.image.image {
  width: 0.1px;
  height: 0.1px;
  padding: 0;
  border: 0;
}
</style>
