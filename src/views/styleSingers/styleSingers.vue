<template>
    <div class="organisationTeam">
        <h1 class="h1-title">OrganisationTeam</h1>
    <table>
      <thead>
        <tr>
          <th align="left">Nom du style de musique</th>
          <th align="right"><img src="../../assets/img/add.svg" alt="add" v-on:click="addStyles()"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="categories bibaboup"
          v-for="item in styles"
          :key="item.styles"
        >
          <td>
            <label for="elements">{{ item.label }}</label>
          </td>
          <td class="icons">
            <img
              src="../../assets/img/delete.svg"
              v-on:click="CallDelete(item.id)"
              alt="delete"
            />
          </td>
          
          
            
        </tr>
      </tbody>
    </table>

    <div class="addStyles hide" id="addStyles">
      <h3>Ajouter un organisateur</h3>
      <form @submit.prevent="CallAddUser">
        <input type="text" v-model="style"/>
        <input type="submit" value="Ajouter un style"/>
      </form>
    </div>
    <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import {http} from '../../assets/services/http-common'
import TheNavbar from "@/components/Navbar";
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;

export default {

    store: store,
     components: {
    TheNavbar,
  },

  data(){
    return{
      style: '',
    }
  },

  mounted(){
    this.$store.dispatch("getStyles")
  },

  methods:{

    CallDelete(id) {
      http
        .delete("styles/" + id)
        .then((response) => {
          console.log(response);
            this.$store.dispatch("getStyles")
        });
    },

    addStyles(){
     const Styles = document.getElementById('addStyles')
     Styles.classList.toggle('show')
     
    },

    CallAddUser(){
       
      http
      .post('styles', {
          label : this.style,
      })
      .then(res => {
        res.data
        this.$store.dispatch("getStyles")
      })
    }
  },

  computed: mapState(["styles"]),
}
</script>

<style scoped lang="scss">
@import "../../assets/style/liste.scss";

.organisationTeam{
    margin: auto;

}

td.icons{
  display: flex;
  justify-content: right;
  gap: 15px;
  img{
    margin: 0;
  }
}

.addStyles{
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  border-radius: 15px;
  background-color: #464646;
  position: absolute;
  justify-content: center;
}

.show{
  display: flex!important;
  flex-direction: column;

  h3{
    margin: 0 25px; 
  }
  
  
  input{
    margin: 5px 25px;
    color: #464646;
    &:nth-child(2){
        width: 350px;
        margin-top: 10px;
      }

    &:nth-child(3){
        width: 250px;
        
    }
  }
}

.size{
  font-size: 1.7rem;
}
</style>
