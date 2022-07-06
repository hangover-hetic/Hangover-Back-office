<template>
    <div class="singers">
        <form @submit.prevent="addSingers">
     <h1>Chanteurs</h1>
     <div class="form">
        <div class="box1" v-if="screens.singers.length !== 0">
          <div class="singers">
            <div class="image">
              <img :src="'https://hangover.timotheedurand.fr' + screens.singers " alt="">
            </div>
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

         <div class="button_create">
            <button type="submit">Ajouter des chanteurs</button>
         </div>
     </div>
     
     </form>
     <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import TheNavbar from "@/components/Navbar";
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
import {http} from '../assets/services/http-common'
global.v = Vuex;
import UploadService from "../assets/services/UploadFilesService";

export default {
   name:'SingersPage',

    components: {
    TheNavbar,
  },

  store: store,

  mounted() {
    this.$store.dispatch("loadScreens");
    this.$store.dispatch("loadFestivals");
    this.token = localStorage.getItem('token')
    

    UploadService.getFiles().then((response) => {
      this.imageInfos = response.data;
    });
  },

  methods: {

    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
    },


    addSingers(){
        const path = window.location.pathname;
        const split = path.substr(10);

         UploadService.upload(this.currentImage)
        .then((response) => {
          this.idImage = response.data.id;

          http({
            url: "festivals/" + split,
            method: "Post",
            data: {
              singers: "api/media/" + this.idImage,
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
    },
  },

  computed: {
    ...mapState(["screens", "festivals"]),
  },
}
</script>


<style scoped lang="scss">
@import "../assets/style/liste.scss";
@import "../assets/style/festivalInput.scss";

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
