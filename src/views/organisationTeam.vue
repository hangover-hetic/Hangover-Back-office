<template>
    <div class="organisationTeam">
        <h1 class="h1-title">OrganisationTeam</h1>
    <table>
      <thead>
        <tr>
          <th align="left">Nom</th>
          <th>Nombre de festivals</th>
          <th></th>
          <th align="left"></th>
          <th align="left"></th>
          <th align="left"><router-link to="/CreateOrganisation"><img src="../assets/img/add.svg" alt="add"></router-link></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="categories bibaboup"
          v-for="item in organisations"
          :key="item.organisations"
        >
          <td>
            <label for="elements">{{ item.name }}</label>
          </td>
           <td>{{item.festivals.length}}</td>
          <td></td>
          <td>
            <img
              src="../assets/img/delete.svg"
              v-on:click="CallDelete(item.id)"
            />
          </td>
           <td><img v-on:click="addOrganisators(item.id)" src="../assets/img/add-organisators.svg" /></td>
          <router-link :to="{ name: 'festivals', params: { name: item.id, orga: item.name} }"
            ><td><img src="../assets/img/edit.svg" /></td></router-link>
            
        </tr>
      </tbody>
    </table>

    <div class="addOrganisators" id="addOrganisators">
      <h3>Ajouter un organisateur</h3>
      <form @submit.prevent="CallAddUser">
        <input type="email" v-model="email"/>
        <input type="submit" value="Ajouter un organisateur"/>
      </form>
    </div>
    <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import http from '../router/index'
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
      email: '',
      idOrga: '',

    }
  },

  mounted(){
    this.$store.dispatch("loadOrganisations")
  },

  methods:{

    CallDelete(id) {
      http
        .delete("organisation_teams/" + id)
        .then((response) => {
          console.log(response);
            this.$store.dispatch("loadOrganisations")
        });
    },

    addOrganisators(id){
     const organisator = document.getElementById('addOrganisators')
     organisator.classList.toggle('show')
     console.log(id)
     this.idOrga = id
    },

    CallAddUser(){
       http
      .get('users?email=' + this.email)
      .then(res => {
      const relatedUser = res.data[0].id;

      http
      .post('organisators', {
          relatedUser : "/api/users/" + relatedUser,
          organisationTeam: "/api/organisation_teams/" + this.idOrga
      })
      .then(res => {
        res.data
        this.$store.dispatch("loadOrganisations")
      })
    })
    }
  },

  computed: mapState(["organisations"]),
}
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";

.organisationTeam{
    margin: auto;

    table{
        thead{
            th{
                &:nth-child(2){
                    text-align: left;
                }
            }
        }
    }
}

.addOrganisators{
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
</style>
