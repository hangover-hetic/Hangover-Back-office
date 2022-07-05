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
          <router-link :to="{ name: 'festivals', params: { name: item.id, orga: item.name} }"
            ><td><img src="../assets/img/edit.svg" /></td
          ></router-link>
        </tr>
      </tbody>
    </table>
    <TheNavbar></TheNavbar>
    </div>
</template>

<script>
import { http } from "@/assets/services/http-common";
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
</style>
