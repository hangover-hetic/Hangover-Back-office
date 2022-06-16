<template>
  <div class="container">
    <h1 class="h1-title">Modifier un festival</h1>
    <form @submit.prevent="modifFestivals">
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
            <th align="left"><router-link to="/createfestivals"><img src="../assets/img/add.svg" alt="add"></router-link></th>
            
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
import axios from 'axios'
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

  mounted() {
    this.$store.dispatch("loadScreens");
    setTimeout(this.date, 200)

   
  },

  methods:{

    date(){
      this.start_date = dayjs(this.screens.startDate).format("YYYY-MM-DD");
      this.end_date = dayjs(this.screens.endDate).format("YYYY-MM-DD");
      console.log(this.screens.endDate) 
    },

    modifFestivals(){
      const path = window.location.pathname;
      const split = path.substr(10)
      axios({
          url: "https://hangover.timotheedurand.fr/api/festivals/" + split,
          method: "Put",
          data:{
              name: this.screens.name,
              description: this.screens.description,
              location: this.screens.location,
              startDate: this.start_date,
              endDate: this.end_date
          },
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        }).then(res => {console.log(res)
          this.$store.dispatch("loadScreens");
        })
    }
  },

  computed:{ 
    ...mapState(["screens"])

  }
};
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";
@import "../assets/style/festivalInput.scss";


.container {
  margin: auto;
}

th{
  padding-bottom: 0!important;

    &:nth-child(2){
      text-align: right;
      
      a{
        img{
          margin-right: 1.5%;
        }
      }
    } 
}




</style>
