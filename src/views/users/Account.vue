<template>
    <div class="account">
        
        <form @submit.prevent="UpdateAccount">
            <div class="user">
                <div class="user__info">

                    <div class="rowOne">

                        <label for="LastName">Nom</label>
                        <input class="dotted" id="LastName" v-model="LastName" type="text" />
                        <label for="FirstName">Prénom</label>
                        <input class="dotted" id="FirstName" v-model="FirstName" type="text" />

                     </div>
                     <div class="rowOne">

                        <label for="Email">Email</label>
                        <input class="dotted" id="Email" v-model="Email" type="email" />

                        <label for="Password">Password</label>
                        <input class="dotted" id="Password" v-model="Password" type="password" />

                     </div>
                </div>

                <div class="user__img">
                    <div class="image"></div>
                </div>
            </div>
        </form>

        <TheNavbar></TheNavbar>


    </div>
</template>

<script>
import TheNavbar from '../components/Navbar'

export default{
    name:'AccountUser',

    components:{
        TheNavbar,
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