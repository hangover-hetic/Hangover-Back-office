<template>
  <div class="createfestivals">
    <h1 class="h1-title">Créer un festival</h1>
    
    <form @submit.prevent="PostFestival">
      <div class="form">
        <div class="form__field">
          <div class="field__left">
            <div class="left__column">
              <label for="name">Nom du festival</label>
              <input class="dotted" id="name" v-model="name" type="text" />

              <label for="lieuFestival">Lieu du festival</label>
              <input
                class="dotted"
                id="lieuFestival"
                v-model="location"
                type="text"
              />
            </div>
            <div class="right__column">
              <label for="date">Date de début</label>
              <input
                class="dotted"
                id="date_start"
                v-model="startDate"
                type="date"
              />

              <label for="date">Date de fin</label>
              <input
                class="dotted"
                id="date_end"
                v-model="endDate"
                type="date"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form__description">
        <label for="description">Description</label>
        <textarea
          class="dotted"
          id="description"
          v-model="description"
          type="text"
        />
      </div>
      <div class="button_create">
        <button type="submit">Créer</button>
      </div>
    </form>

    <TheNavbar></TheNavbar>
  </div>
</template>

<script>
import TheNavbar from "@/components/Navbar";
const dayjs = require("dayjs");
import axios from "axios";
import UploadService from "../assets/services/UploadFilesService";
//import { mapState } from "vuex";
//import store from "/src/store/index";
//import Vuex from "vuex";
//global.v = Vuex;

export default {
  components: {
    TheNavbar,
  },

  //store: store,

  data() {
    return {
      dayjs,
      tab: [],
      name: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      currentImage: undefined,
      previewImage: undefined,
      imageInfos: [],
    };
  },

  mounted() {
     UploadService.getFiles().then(response => {
      this.imageInfos= response.data;
    });
  },

  methods: {
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);  
    },

    PostFestival() {

      UploadService.upload(this.currentImage)
        .then((response) => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
          console.log(this.previewImage)
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });

      axios({
        url: "https://hangover.timotheedurand.fr/api/festivals",
        method: "Post",
        data: {
          name: this.name,
          description: this.description,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.$store.dispatch("loadFestivals");
        this.response = res.data;
      });
    },

    

    
}

    
  }

  //computed: mapState(["festivals"]),

</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";
@import "../assets/style/festivalInput.scss";


.createfestivals {
  margin: auto;
}
.box1{
    display: flex;
    align-items: center;
  input{
    display: flex;
    align-self: center;
    padding: 75px 15px;
    
  }

}

button{
  cursor: pointer
}


</style>
