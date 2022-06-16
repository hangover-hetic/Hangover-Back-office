<script>
       export default {
        data () {
            return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            phone: null,
            address: null,
            country: null
            }
        },
        methods:{
            submitForm (e) {
                e.preventDefault()
                console.log(this.firstName, this.lastName, this.email, this.password, this.phoneNumber, this.address, this.country)

            }
        }
    }


</script>

<template>
    <div class="login">
        <form @submmit="submitForm">
            <div class="form"> 
                <h1>Register</h1>
                <input
                    class="input-text"
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    placeholder="firstname"
                />
                <input
                    class="input-text"
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    placeholder="lastname"
                />
                <input
                    class="input-text"
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Email"
                />
                <input
                    class="input-text"
                    id="password"
                    v-model="password"
                    type="password"
                    placeholder="password"
                />
                <input
                    class="input-text"
                    id="phone"
                    v-model="phone"
                    type="text"
                    placeholder="phone number"
                />
                <input
                    class="input-text"
                    id="address"
                    v-model="address"
                    type="text"
                    placeholder="address"
                />
                 <input
                    class="input-text"
                    id="country"
                    v-model="country"
                    type="text"
                    placeholder="country"
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
                        type="submit"
                        value="Registration"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
   

   .form {
       display: flex;
       flex-direction: column;
       position: absolute;
       margin: auto;
       top: 28%;
       left: 43%;

    h1 {
        color: #fff;
        text-align: center;
    }

    .input-text {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    };

    .button-login {
        color            : rgb(255, 255, 255);
        margin           : 0px 0px 10px;
        padding          : 8px;
        width            : 150px;
        background       : rgb(212, 85, 11) 0 0 no-repeat padding-box;
        border           : none;
        margin-right     : 50px;
        outline          : 0;
        box-shadow       : none;
        &:hover {
            background     : rgb(255, 255, 255) 0 0 no-repeat padding-box;
            border-radius  : 8px;
            color          : rgb(15, 14, 14);
            outline        : 0;
            box-shadow     : none;
        }
    }
        .button-registration {
            color            : rgb(255, 255, 255);
            margin           : 0px 0px 10px;
            padding          : 8px;
            width            : 150px;
            background       : rgb(59, 58, 58) 0 0 no-repeat padding-box;
            border           : none;
            outline          : 0;
            box-shadow       : none;
            &:hover {
                background     : rgb(119, 76, 52) 0 0 no-repeat padding-box;
                border-radius  : 8px;
                color          : rgb(255, 255, 255);
                outline        : 0;
                box-shadow     : none;
            }
        }
    }
 
</style>