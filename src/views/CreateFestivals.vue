<template>
  <div class="createfestivals">
    <h1 class="h1-title">Créer un festival</h1>
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
                v-model="name"
                type="text"
                
              />

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
                id="Date"
                v-model="startDate"
                type="date"
                
              />
           
            <label for="date">Date de fin</label>
              <input
                class="dotted"
                id="Date1"
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
import axios from 'axios'
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
      //checkbox: true,
      dayjs,
      tab: [],
      name: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '', 
    };
  },

  mounted() {
   // this.$store.dispatch("loadScreens");
    
  },

  methods: {

    PostFestival(){
        axios
        .post('https://hangover.timotheedurand.fr/api/festivals',{
            body:{
                name : this.name,
                description : this.description,
                location : this.location,
                startDate : this.startDate,
                endDate : this.endDate
            },
            headers:{
              'Content-Type': 'application/json'
            }
           
                
            
        }).then(res => console.log(res))
        
       
    }

  
  },

  //computed: mapState(["screens"]),
};
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";

* {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
}

.h1-title {
  margin-left: 1%;
  font-size: 50px;
  color: #fff;
}

.createfestivals {
  width: 90%;
  margin: auto;
}

textarea,
input {
  width: 100%;
  background-color: #202020;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: 2px dashed rgb(54, 53, 53);
  border-radius: 4px;
  cursor: pointer;
}

textarea{
  height: 100px;
}

label {
  color: #fff;
}

button {
  border-width: 1px;
  border-color: #fff;
  color: #fff;
  background-color: #202020;
  width: 100px;
  height: 50px;
}

.button_create {
  display: flex;
  justify-content: right;
  width: 72%;

  button {
    cursor: pointer;
  }
}

.form {
  display: flex;
  gap: 5%;
  width: 70%;
  margin-bottom: 5%;

  .form__field {
    display: flex;
    flex-direction: column;
    gap: 10%;
    width: 100%;

    .field__left {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 10%;

      .right__column,
      .left__column {
        display: flex;
        flex-direction: column;
        width: 50%;
      }
    }

    .field__right {
      width: 100%;
    }
  }
}

.form__description {
  width: 70%;
}

.box {
  color: rgb(54, 53, 53);
  border: 2px dashed;
  height: 200px;
  width: 200px;
  cursor: pointer;
}

.custom-icon {
  width: 13rem;
  display: table-cell;
  font-size: 3rem;
  padding: 4.5rem 0;
  text-align: center;
}
</style>
