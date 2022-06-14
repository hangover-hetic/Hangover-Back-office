<script>

</script>

<template>
    <div class="login">
        <form>
           
            <div class="form"> 
                <h1>Register</h1>
                <input
                    class="input-text"
                    id="firstName"
                    type="text"
                    placeholder="firstname"
                />
                <input
                    class="input-text"
                    id="lastName"
                    type="text"
                    placeholder="lastname"
                />
                <input
                    class="input-text"
                    id="Email"
                    type="mail"
                    placeholder="Email"
                />
                <input
                    class="input-text"
                    id="password"
                    type="password"
                    placeholder="password"
                />
                <input
                    class="input-text"
                    id="phone"
                    type="text"
                    placeholder="phone number"
                />
                <input
                    class="input-text"
                    id="address"
                    type="text"
                    placeholder="address"
                />
                 <input
                    class="input-text"
                    id="country"
                    type="text"
                    placeholder="country"
                />
                <div>
                    <input
                        class=" button-login"
                        id="country"
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
       left: 50%;

    h1 {
        color: #fff                                                                   ;
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
        border-radius    : 8px;
        border           : none;
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
            border-radius    : 8px;
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