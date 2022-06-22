<template>
    <div class="login">
        <form @submit="submitForm">
            <div class="form"> 
                <h1>Register</h1>
                <input
                    class="form-1 input-text"
                    id="firstName"
                    type="text"
                    v-model="firstName"
                    placeholder="first name"
                />
                <input
                    class="form-2 input-text"
                    id="lastName"
                    type="text"
                    v-model="lastName"
                    placeholder="last name"
                />
                <input
                    class="form-1 input-text"
                    id="email"
                    type="text"
                    v-model="email"
                    placeholder="Email"
                />
                <input
                    class="form-2 input-text"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                />
                <input
                    class="form-1 input-text"
                    id="phone"
                    type="text"
                    v-model="phone"
                    placeholder="Mobile phone"
                />
                <input
                    class="form-2 input-text"
                    id="Address"
                    type="text"
                    v-model="address"
                    placeholder="address"
                />
                  <input
                    class="form-2 input-text"
                    id="country"
                    type="text"
                    v-model="country"
                    placeholder="Country"
                />
                <div>
                    <input
                        class=" button-registration"
                        id="register"
                        type="submit"
                        value="register"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {http} from '../assets/services/http-common'

export default {
        data () {
            return {
                firstName: null,
                lastName: null,
                email:null,
                password:null,
                phone:null,
                address:null,
                country:null,
            }
        },
        methods:{
            submitForm (e) {
                e.preventDefault()
                 http({
                    url: "https://hangover.timotheedurand.fr/api/users",
                    method: "Post",
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        phone: this.phone,
                        address: this.address,
                        country: this.country
                    },
                }).then((res) => {
                    //this.$store.dispatch("loadFestivals");
                    this.response = res.data;
                });
            }
        }
    }
</script>

<style scoped lang="scss">

   .form {
       display       : flex;
       flex-direction: column;
       position      : fixed;
       margin        : auto;
       top           : 20%;
       left          : 43%;

    h1 {
        color     : #fff;
        text-align: center;                                                 
    }

    .input-text {
        width        : 100%;
        padding      : 10px 0;
        font-size    : 16px;
        color        : #fff;
        margin-bottom: 30px;
        border       : none;
        border-bottom: 1px solid #fff;
        outline      : none;
        background   : transparent;
    };

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
    }
 
</style>