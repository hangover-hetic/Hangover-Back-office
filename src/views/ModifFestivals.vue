<template>
  <div class="container">
    <h1 class="h1-title">Modifier un festival</h1>
    <form @submit.prevent="modifFestivals">
      <div class="form">
        <div class="box1" v-if="this.screens.cover !== null">
          <div class="image">
           
           <img :src="'https://hangover.timotheedurand.fr' + this.screens.cover.contentUrl " alt="">
          </div>
          <div class="selectFile">
            <input
              type="file"
              accept="image/*"
              id="image"
              ref="file"
              @change="selectImage"
            />
          </div>
        </div>
        <div class="box1" v-else>
          <input
            class="imageNone"
            type="file"
            accept="image/*"
            id="image"
            ref="file"
            @change="selectImage"
          />
        </div>
        <div class="form__field">
          <div class="field__left">
            <div class="left__column">
              <label for="name">Nom du festival</label>
              <input
                class="dotted"
                id="name"
                v-model="screens.name"
                type="text"
              />

              <label for="lieuFestival">Lieu du festival</label>
              <input
                class="dotted"
                id="lieuFestival"
                v-model="screens.location"
                type="text"
              />
            </div>
            <div class="right__column">
              <label for="date">Date de début</label>
              <input
                class="dotted"
                id="date_start"
                v-model="start_date"
                type="date"
              />

              <label for="date">Date de fin</label>
              <input
                class="dotted"
                id="date_end"
                v-model="end_date"
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
          v-model="screens.description"
          type="text"
        />
      </div>
      <div class="button_create">
        <button type="submit">Modifier</button>
      </div>
    </form>
    <TheNavbar></TheNavbar>
  </div>
</template>

<script>
import TheNavbar from "@/components/Navbar";
const dayjs = require("dayjs");
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
import {http} from '../assets/services/http-common'
global.v = Vuex;
import UploadService from "../assets/services/UploadFilesService";

export default {
  components: {
    TheNavbar,
  },

  store: store,

  data() {
    return {
      dayjs,
      tab: [],
      start_date: "",
      end_date: "",
      idImage: "",
      contentUrl: '',
      image: '',
      suppImage: '',
      token: ''
    };
  },

  mounted() {
    this.$store.dispatch("loadScreens");
    this.$store.dispatch("loadFestivals");
    setTimeout(this.date, 500);
    this.token = localStorage.getItem('token')

   
    
   

    UploadService.getFiles().then((response) => {
      this.imageInfos = response.data;
    });
  },

  methods: {
    date() {
      this.start_date = dayjs(this.screens.startDate).format("YYYY-MM-DD");
      this.end_date = dayjs(this.screens.endDate).format("YYYY-MM-DD");      
    },

    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
    },


    modifFestivals() {
      const path = window.location.pathname;
      const split = path.substr(10);

      if(this.screens.gallery[0] !== undefined){
      if (document.getElementById("image").files.length !== 0) {
          this.suppImage = this.screens.gallery[0].id;

      http 
      .delete("https://hangover.timotheedurand.fr/api/media/" + this.suppImage)
      .then(res => console.log(res))
}
}
      
      

      UploadService.upload(this.currentImage)
        .then((response) => {
          this.idImage = response.data.id;
          
          

          http({
            url: "festivals/" + split,
            method: "Put",
            data: {
              cover: "api/media/" + this.idImage,
            }, 
            headers: {
          
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

           
          }).then((res) => {
            this.$store.dispatch("loadScreens");
            this.response = res.data;
          });

          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
          console.log(this.previewImage);
        })
        .catch((err) => {
          this.progress = 0;
          this.message = "Could not upload the image! " + err;
          this.currentImage = undefined;
        });

      http({
        url: "festivals/" + split,
        method: "Put",
        data: {
          name: this.screens.name,
          description: this.screens.description,
          location: this.screens.location,
          startDate: this.start_date,
          endDate: this.end_date,
          status: "PUBLISHED",
        },
         headers: {
          
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      }).then((res) => {
        console.log(res);
        this.$store.dispatch("loadScreens");
         setTimeout(this.addMediaImage,500);
        
      });
    },
  },

  computed: {
    ...mapState(["screens", "festivals"]),
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";
@import "../assets/style/festivalInput.scss";


.container {
  margin: auto;
}

th {
  padding-bottom: 0 !important;

  &:nth-child(2) {
    text-align: right;

    a {
      img {
        margin-right: 1.5%;
      }
    }
  }
}

.box1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    display: flex;
    align-self: center;
    
  }

  .image{

    img{
      height: 200px;
      width: 170px;
    }
    
  }

  input.imageNone{
    
    padding: 75px 15px!important;
  }
}
</style>
