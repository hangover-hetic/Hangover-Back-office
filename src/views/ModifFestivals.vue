<template>
  <div class="container">
    <h1 class="h1-title">Modifier un festival</h1>
    <form @submit.prevent="PostFestival">
      <div class="form">
        <div class="box">
          <i class="fa-solid fa-images custom-icon"></i>
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
              >

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


    <div>
      <h1>Liste des écrans</h1>
    </div>
    <div class="menu">
      <table>
        <thead>
          <tr>
            <th align="left">Écrans</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(screen, index) in screens.screens" :key="screen.screens">
              <td>
                <label for="elements"> Écran numéro : {{ index + 1 }}</label>
              </td>
              <td><img src="../assets/img/edit.svg" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <TheNavbar></TheNavbar>
  </div>
</template>

<script>
import TheNavbar from "@/components/Navbar";
const dayjs = require("dayjs");
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;

export default {
  components: {
    TheNavbar,
  },

  store: store,

  data() {
    return {
      
      dayjs,
      tab: [],
      start_date: '',
      end_date: '',
      
       
    };
  },

  created(){
     
  },

  mounted() {
    this.$store.dispatch("loadScreens");
    this.start_date = dayjs(this.screens.start_date).format("YYYY-MM-DD");
    this.end_date = dayjs(this.screens.end_date).format("YYYY-MM-DD");
    console.log(this.end_date) 
  },

  //methods: {

  //   CallDelete(id) {
  //    console.log(id)
  //this.$http
  //.delete('festivals/' + id)
  //.then(response => {
  //  console.log(response);
  //});
  // }
  // },

  computed: mapState(["screens"]),
};
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";
@import "../assets/style/festivalInput.scss";


.container {
  margin: auto;
}


</style>
