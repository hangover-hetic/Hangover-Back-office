<template>
  <div class="users">
    <h1 class="h1-title">Utilisateurs</h1>
    <table>
      <thead>
        <tr>
          <th>Nom de l'oganisation</th>
          <th align="left">Acheté</th>
          <th align="left">Date de début</th>
          <th align="left">Date de fin</th>
          <th align="left"></th>

          <th align="left">
            <img src="../../assets/img/add.svg" alt="add" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="categories bibaboup" v-for="item in licences" :key="item.licences">
          <td><label>{{ item.organisationTeam }}</label></td>
          <td>
            <label for="elements">{{ item.isBuyed ? 'oui' : 'non' }}</label>
          </td>
          <td><label for="elements">{{ dayjs(item.startDate).format("DD / MM / YYYY") }}</label></td>
          <td>{{ dayjs(item.endDate).format("DD / MM / YYYY") }}</td>
          <td>
            <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
          </td>
          <router-link :to="{ name: 'user', params: { name: item.id } }">
            <td><img src="../../assets/img/edit.svg" /></td>
          </router-link>
        </tr>
      </tbody>
    </table>
    <TheNavbar></TheNavbar>
    <successVue :success="success" class=""></successVue>
  </div>
</template>

<script>
import successVue from '@/components/success.vue';
const dayjs = require("dayjs");
import { http } from '../../assets/services/http-common'
import TheNavbar from "@/components/Navbar";
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;

export default {
  name: 'UserPage',

  components: {
    TheNavbar,
    successVue
  },

  data() {
    return {
      dayjs,
      success: 'Paul'
    }
  },

  store: store,

  mounted() {
    this.$store.dispatch("getLicence");
  },

  methods: {
    CallDelete(id) {
      http
        .delete("licences/" + id)
        .then((response) => {
          response.data
          this.$store.dispatch("getLicence");

          const success = document.querySelector('.success')
          success.classList.add('show')

          setTimeout(() => {
            success.classList.remove('show')
          }, 5000)
        });
    },
  },


  computed: {
    ...mapState(["licences"]),
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/style/liste.scss";

.show {
  display: block !important
}

th {
  text-align: left;
}
</style>