<template>
  <div class="createorganisation">
    <h1 class="h1-title">Créer une organisation teams</h1>
    
    <form @submit.prevent="PostOrganisation">
      <div class="form">
        <div class="form__field">
          <div class="field__left">
            <div class="left__column">
              <label for="name">Nom du festival</label>
              <input class="dotted" id="name" v-model="name" type="text" />
            </div>
        
          </div>
        </div>
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
import {http} from '../../assets/services/http-common'
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

  mounted(){
    
  },

 

  methods: {
   

    PostOrganisation() {

      http({
        url: "organisation_teams",
        method: "Post",
        data: {
          name: this.name,
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
@import "../../assets/style/liste.scss";
@import "../../assets/style/festivalInput.scss";


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
