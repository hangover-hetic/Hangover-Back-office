<template>
    <div class="users">
        <h1 class="h1-title">Organisateurs</h1>
    <table>
      <thead>
        <tr>
          <th align="left">Prénom</th>
          <th align="left">Nom</th>
          <th align="left">Email</th>
          <th align="left">Administrateur</th>

          <th align="left">
           <img src="../assets/img/add.svg" alt="add"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="categories bibaboup"
          v-for="item in NameOrga.organisators"
          :key="item.organisators"
        >
          <td>
            <label for="elements">{{ item.relatedUser.firstName }}</label>
          </td>
          <td><label for="elements">{{ item.relatedUser.lastName }}</label></td>
          <td>{{ item.relatedUser.email }}</td>
          <td>{{ item.isAdministrator ? 'oui' : 'non' }}</td>
          <td>
            <img
              src="../assets/img/delete.svg"
              v-on:click="CallDelete( item.relatedUser.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import {http} from '../assets/services/http-common'
import TheNavbar from "@/components/Navbar";
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;

    export default {
        name: 'UserPage',
        
        components: {
            TheNavbar,
        },

        store: store,

        data(){
            return{
                administrator: ''
            }
        },

         mounted() {
            this.$store.dispatch("loadNameOrga");
        },

        methods:{
            CallDelete(id) {
                http
                .delete("users/" + id)
                .then((response) => {
                    response.data    
                    this.$store.dispatch("loadNameOrga");
                });
            },
        },


        computed: {
            ...mapState(["NameOrga"]),
        },
    }
</script>

<style scoped lang="scss">
@import "../assets/style/liste.scss";
</style>