<template>
    <div class="users">
        <h1 class="h1-title">Utilisateurs</h1>
    <table>
      <thead>
        <tr>
          <th align="left">Prénom</th>
          <th align="left">Nom</th>
          <th align="left">Email</th>
          <th align="left"></th>

          <th align="left">
           <img src="../../assets/img/add.svg" alt="add"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="categories bibaboup"
          v-for="item in users"
          :key="item.users"
        >
          <td>
            <label for="elements">{{ item.firstName }}</label>
          </td>
          <td><label for="elements">{{ item.lastName }}</label></td>
          <td>{{ item.email }}</td>
          <td>
            <img
              src="../../assets/img/delete.svg"
              v-on:click="CallDelete(item.id)"
            />
          </td>
         <router-link :to="{ name: 'user', params: { name: item.id } }"
            ><td><img src="../../assets/img/edit.svg" /></td
          ></router-link>
        </tr>
      </tbody>
    </table>
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
        name: 'UserPage',
        
        components: {
            TheNavbar,
        },

        store: store,

         mounted() {
            this.$store.dispatch("loadUsers");
        },

        methods:{
            CallDelete(id) {
                http
                .delete("users/" + id)
                .then((response) => {
                    response.data    
                    this.$store.dispatch("loadUsers");
                });
            },
        },


        computed: {
            ...mapState(["users"]),
        },
    }
</script>

<style scoped lang="scss">
@import "../../assets/style/liste.scss";
</style>