<template>
    <div class="userEdit">
        
        <form @submit.prevent="editUser">
            <div class="user">
                <div class="user__info">

                    <div class="rowOne">
                        

                        <label for="LastName">Nom</label>
                        <input class="dotted" id="LastName" v-model="user.lastName" type="text" />
                        <label for="FirstName">Prénom</label>
                        <input class="dotted" id="FirstName" v-model="user.firstName" type="text" />

                     </div>
                     <div class="rowOne">

                        <label for="Email">Email</label>
                        <input class="dotted" id="Email" v-model="user.email" type="email" />

                        <label for="Password">Password</label>
                        <input class="dotted" id="Password" v-model="user.password" type="text" />

                     </div>
                </div>

                <div class="user__img">
                    <div class="image"></div>
                </div>
            </div>

            <input type="submit"/>
        </form>

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
        name: 'userEdit',

        store: store,

        data(){
            return{
                
                split: '',
            }
        },

        components: {
            TheNavbar,
        },

    

         mounted() {
            const path = window.location.pathname;
            const str = path.split('/');
            this.split = str[str.length-1]
            this.$store.dispatch("getUser")
        },

        methods:{

          editUser(){
            if(localStorage.getItem('rang', 'ROLE_ADMIN')){
                http
                .put('users/' + this.split, {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                }).then(res =>{
                    res.data;
                    this.$store.dispatch("getUser")
                })
            }else{
                 http
                .put('users/' + this.split, {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                }).then(res =>{
                    res.data;
                    this.$store.dispatch("getUser")
                    this.$router.push('/')
                })
            }
          }
    },

    computed:{
    ...mapState(["user"])
  }
    }

</script>

<style scoped lang="scss">
@import '../assets/style/festivalInput.scss';

.user{
    display: flex;
   
    gap: 10%;

    .user__info{
       
        display: flex;
        flex-direction: column;
        width: 100%;

        .rowOne{
            display: flex;
            flex-direction: column;
        }
    }
}

.user__img{

    .image{
        width: 150px;
        height: 150px;
        border: 1px dashed white

    }
}

</style>