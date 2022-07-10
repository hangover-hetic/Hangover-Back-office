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
          <th align="left"></th>
          <th align="left">
            <img src="../../assets/img/add.svg" alt="add" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="categories bibaboup" v-for="item in licences" :key="item.licences">
          <td><label>{{ item.organisationTeam.name }}</label></td>
          <td>
            <label for="elements">{{ item.isBuyed ? 'oui' : 'non' }}</label>
          </td>
          <td><label for="elements">{{ dayjs(item.startDate).format("DD / MM / YYYY") }}</label></td>
          <td>{{ dayjs(item.endDate).format("DD / MM / YYYY") }}</td><td></td>
          <td>
            <img src="../../assets/img/delete.svg" v-on:click="CallDelete(item.id)" />
          </td>
          <router-link :to="{ name: 'user', params: { name: item.id } }">
          <td>  <img src="../../assets/img/edit.svg" /></td>
          </router-link>
        </tr>
      </tbody>
    </table>
    <TheNavbar></TheNavbar>
    <alertVue ref="alert"/>
  </div>
</template>

<script>
import alertVue from '@/components/alert.vue';
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
    alertVue
  },

  data() {
    return {
      dayjs,
      msg: '',
      img: 'success'
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
        .then(() => {
          this.$store.dispatch("getLicence");
          this.showModal()
          this.$refs.alert.Alert()
          
        }).catch(error=>{
            this.img = 'error'
            if(error.response.status === 404){
              this.msg = 'la licence n\'existe pas'
            }else if(error.response.status === 401){
              this.msg = 'vous n\'êtes pas autorisé à supprimer cette licence'
            }else{
              this.msg = 'une erreur est survenu : ' + error.message
            }
            this.$refs.alert.Alert()
        });
    },

    showModal() {
      // we must pass object params with all the information
      const params = {
        img: "Test!",
        msg: "test test test",
        // we are passing callback method for our confirm button
        onConfirm: () => {
          return this.alertFunc();
        }
      };
      // now we can call function that will reveal our modal
      this.$modal.show(params)
    },

          
  },


  computed: {
    ...mapState(["licences"]),
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/style/liste.scss";



th {
  text-align: left;
}
</style>