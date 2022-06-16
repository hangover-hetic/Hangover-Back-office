<template>
  <div class="home">
    <h1 class="h1-title">Festivals</h1>
    <table>
      <thead>
        <tr>
          <th align="left">Nom</th>
          <th align="left">Date</th>
          <th align="left">Lieu</th>
          <th align="left"></th>
          <th align="left"><router-link to="/createfestivals"><img src="../assets/img/add.svg" alt="add"></router-link></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="categories bibaboup"
          v-for="item in festivals"
          :key="item.festivals"
        >
          <td>
            <label for="elements">{{ item.name }}</label>
          </td>
          <td>{{ dayjs(item.start_date).format("DD / MM / YYYY") }}</td>
          <td>{{ item.location }}</td>
          <td>
            <img
              src="../assets/img/delete.svg"
              v-on:click="CallDelete(item.id)"
            />
          </td>
          <router-link :to="{ name: 'festival', params: { name: item.id } }"
            ><td><img src="../assets/img/edit.svg" /></td
          ></router-link>
        </tr>
      </tbody>
    </table>
    <TheNavbar></TheNavbar>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from "@/components/Navbar";
import axios from 'axios'
const dayjs = require("dayjs");
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;

export default {
  name: "ListeBackoffice",
  store: store,

  components: {
    TheNavbar,
  },

  data() {
    return {
      //checkbox: true,
      dayjs,
      tab: [],
    };
  },

  mounted() {
    this.$store.dispatch("loadFestivals");
  },

  methods: {

   CallDelete(id) {
      console.log(id)
  axios
  .delete('https://hangover.timotheedurand.fr/api/festivals/' + id)
  .then(response => {
    console.log(response);
     this.$store.dispatch("loadFestivals");
  });
   }
   },

  computed: mapState(["festivals"]),
};
</script>


<style scoped lang="scss">
@import "../assets/style/liste.scss";

* {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
}

.home {
  margin: auto;
}
</style>
