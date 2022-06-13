<script>

</script>

<template>
    <div class="login">
        <form>
            <div class="form">
                <input
                    class="form-1"
                    id="email"
                    type="text"
                    placeholder="Email"
                />
                <input
                    class="form-2"
                    id="password"
                    type="password"
                    placeholder="mot de passe"
                />
                <input
                    class="login"
                    id="password"
                    type="submit"
                    value="Login"
                />
                <input
                    class="registration"
                    id="registration"
                    type="submit"
                    value="Registration"
                />
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
   .login {
        width: 90%;
        margin: auto;
   }

   .form {
       display: flex;
       flex-direction: column;
       position: fixed;
       margin: auto;
       top: 50%;
       left: 50%;

       input {
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
       
   }
 
</style>