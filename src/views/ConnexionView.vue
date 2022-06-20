<script>

       export default {
        data () {
            return {
                email: null,
                password: null
            }
        },
        methods:{
            submitForm (e) {
                e.preventDefault()
                console.log(this.email)
                console.log(this.password)
            }
        }
    }
</script>

<template>
    <div class="login">
        <form @submit="submitForm">
            <div class="form"> 
                <h1>Login</h1>
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
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">

   .form {
       display       : flex;
       flex-direction: column;
       position      : fixed;
       margin        : auto;
       top           : 35%;
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
    }
 
</style>