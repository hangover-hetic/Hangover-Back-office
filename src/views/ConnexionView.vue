<template>
    <div class="login">
        <form @submit="submitForm">
            <div class="form"> 
                <h1>Login</h1>
                <input
                    class="form-1 input-text"
                    id="email"
                    type="text"
                    v-model="username"
                    placeholder="Email"
                />
                <input
                    class="form-2 input-text"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="mot de passe"
                />
                <div>
                    <input
                        class=" button-login"
                        id="login"
                        type="submit"
                        value="Login"
                    />
                    <input
                        class="button-registration"
                        id="registration"
                        value="Register"
                        type="button"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import store from "/src/store/index";
import Vuex from "vuex";
global.v = Vuex;


       export default {
       store: store,

       mounted(){
   
        
        if(localStorage.getItem('token') !== null){
           this.$router.replace('/home')
       }
       },

             

        computed:{
            ...mapState(["token"]),

            username:{
                        get(){
                            return this.$store.state.username;
                        },
                        set(value){
                            this.$store.commit("UPDATE_USERNAME", value);
                        }
            },
            password:{
                        get(){
                            return this.$store.state.password;
                        },
                        set(value){
                            this.$store.commit("UPDATE_PASSWORD", value);
                        }
            },
        },

        methods:{
           submitForm(e) {
            e.preventDefault()
            this.$store.dispatch("submitForm");
            localStorage.removeItem('token');
            setTimeout(this.setToken, 1000)   
    },

    setToken(){
         // it sets the cookie called `username`
       
       localStorage.setItem('token', this.token.data.token);
       this.$store.dispatch("loadFestivals");
      

       if(localStorage.getItem('token') !== null){
            window.localStorage.setItem("rang", "admin")
            this.$router.replace('/home')
       }
       
     },

    

        }
    }
</script>

<style scoped lang="scss">
@import "../assets/style/formulaire.scss";

    .button-login {
        color       : rgb(255, 255, 255);
        margin      : 0px 0px 10px;
        padding     : 8px;
        width       : 150px;
        margin-right: 50px;
        background  : rgb(212, 85, 11) 0 0 no-repeat padding-box;
        border      : none;
        outline     : 0;
        box-shadow  : none;
        &:hover {
            background: rgb(255, 255, 255) 0 0 no-repeat padding-box;
            color     : rgb(15, 14, 14);
            outline   : 0;
            box-shadow: none;
        }
    }
        .button-registration {
            color     : rgb(255, 255, 255);
            margin    : 0px 0px 10px;
            padding   : 8px;
            width     : 150px;
            background: rgb(59, 58, 58) 0 0 no-repeat padding-box;
            border    : none;
            outline   : 0;
            box-shadow: none;
            &:hover {
                background: rgb(119, 76, 52) 0 0 no-repeat padding-box;
                color     : rgb(255, 255, 255);
                outline   : 0;
                box-shadow: none;
            }
        }
    
 
</style>