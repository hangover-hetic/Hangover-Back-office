<template>
  <div class="container">
    <div class="title">
      <h1 class="h1-title">Shows - {{ currentFestival? currentFestival.name : "" }}</h1>
    </div>
    <form @submit.prevent="addShow">
      <div class="form form-shows">
        <div class="input-group">
          <label for="name">Nom</label>
          <input class="dotted" id="name" v-model="name" type="text" required/>
        </div>

        <div class="input-group">
          <label for="date">Début</label>
          <input class="dotted" id="date_start" v-model="startDate" type="datetime-local" required/>
        </div>

        <div class="input-group">
          <label for="date">Fin</label>
          <input class="dotted" id="date_end" v-model="endDate" type="datetime-local" required/>
        </div>

        <div class="input-group">
          <label for="selectStyles">Style :</label>
          <select id="selectStyles" v-model="style" class="dotted">
            <option v-for="item in styles" :key="item.styles" class="dotted" :value="item.id">
              {{item.label }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label for="image1">Image</label>
          <input
              class="imageNone"
              type="file"
              accept="image/*"
              id="image1"
              ref="file1"
              @change="selectImage"
          />
        </div>
          <button type="submit">Ajouter</button>
      </div>
    </form>
      <div class="shows" v-if="currentFestival">
        <table>
          <thead>
          <tr>
            <th align="left">Nom</th>
            <th align="left">Début</th>
            <th align="left">Fin</th>
            <th align="left">Image</th>
          </tr>
          </thead>
          <tbody>
          <tr class="shows bibaboup" v-for="item in currentFestival.shows" :key="item.name + item.id">
            <td>
              <label for="elements">{{ item.name }}</label>
            </td>
            <td>{{ getFormattedDate(item.startTime) }}</td>
            <td>{{ getFormattedDate(item.endTime) }}</td>
            <td ><img v-if="item.image" :src="'https://hangover.timotheedurand.fr' + item.image.contentUrl" alt=""/></td>

            <td class="icon">
              <img src="../../assets/img/delete.svg" v-on:click="deleteShow(item.id)" />
            </td>
            <router-link :to="{ name: 'chanteur', params: { id: item.id } }"
            ><td class="icon"><img class="edit-icon" src="../../assets/img/edit.svg" /></td
            ></router-link>
          </tr>
          </tbody>
        </table>
      </div>


    <TheNavBar/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {http} from "@/assets/services/http-common";
import UploadService from "@/assets/services/UploadFilesService";
import dayjs from "dayjs";
import TheNavBar from "@/components/Navbar";

export default {
  name: "FestivalShows",
  components: {TheNavBar},
  computed: {
    ...mapState(['currentFestival', 'styles']),
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      name: "",
      style: "",
      image: null,
    }
  },
  async mounted() {
    if (!this.currentFestival) {
      const path = window.location.pathname
      const str = path.split('/')
      const split = str[str.length - 2]
      await this.$store.dispatch('loadFestival', split)
    }

    if(!this.styles) {
      await this.$store.dispatch('getStyles')
    }

    this.startDate = dayjs(this.currentFestival.startDate).format('YYYY-MM-DDThh:mm')
    this.endDate = dayjs(this.currentFestival.endDate).format('YYYY-MM-DDThh:mm')

  },
  methods: {
    getFormattedDate(date) {
      return dayjs(date).format('DD/MM/YYYY HH:mm')
    },
    async deleteShow(id) {
      try {
        await http.delete('shows/' + id)
        await this.$store.dispatch('loadFestival', this.currentFestival.id)
        this.$toast.success("Show supprimé !")
      } catch (e) {
        this.$toast.error("Erreur :" + e )
      }
    },
    addShow() {
      UploadService.upload(this.image)
          .then((response) => {
            this.idImage = response.data.id

            http({
              url: 'shows',
              method: 'Post',
              data: {
                name: this.name,
                image: 'api/media/' + this.idImage,
                festival: '/api/festivals/' + this.currentFestival.id,
                startTime: this.startDate,
                endTime: this.endDate,
                styles: ['/api/styles/' + this.style],
              },
            }).then(async (res) => {
              await this.$store.dispatch('loadFestival', this.currentFestival.id)
              this.response = res.data
              this.$toast.success("Show ajouté avec succès")
            }).catch((e) => {
              this.$toast.error("Erreur" + e)
            })
            this.message = response.data.message
            return UploadService.getFiles()
          })
          .catch((e) => {
            this.$toast.error("Erreur" + e)
          })
    },
    selectImage() {
      this.image = this.$refs.file1.files.item(0)
    },

  },
}
</script>
<style scoped lang="scss">
@import '../../assets/style/festivalInput.scss';
@import '../../assets/style/liste.scss';

.container {
  color: white;
}

.singers {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  gap: 5%;

}


select {
  width: 100%;
  background-color: #202020;
  color: white;
  padding: 14px 20px;
  margin: 8px 0 0 0;
  border: 2px dashed #939393;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;

  option {
    color: #ffffff;
  }
}

.flex {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
  gap: 5%;
}

.box1.create__singers {
  width: 300px;
}

.box1 {
  display: flex;
  flex-direction: column;

  input {
    display: flex;
    align-self: center;
  }

  .image {
    display: flex;
    flex-direction: column;

    img {
      width: 175px;
      height: 220px;
      cursor: pointer;
    }
  }

  .image__festivals {
    input {
      width: 0.1px;
      height: 0.1px;
      padding: 0;
      border: 0px;
    }

    img {
      height: 300px;
      cursor: pointer;
    }
  }

  input.imageNone {
    padding: 75px 15px !important;
  }
}

.form-shows {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap:10px;
  width: 100%;
  align-items: end;
  accent-color: white;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input {
  box-sizing: border-box;
  margin-bottom: 0;
}


.shows {
  img {
    height: 50px;
  }
}

</style>