<template>
    <div class="alert">
        <div class="img__succes">
            <img :src="require(`@/assets/img/${img}.svg`)"> 
        </div>
        <div class="msg__success">
            <p>{{msg}}</p>
        </div>
    </div>
</template>

<script>
import alertVue from '../plugins/alert'

export default{
    name: 'alertComponent',

    data(){
        return{
            msg: 'oui',
            img: 'success'
        }
    },


    methods:{
        Alert(){      
             const success = document.querySelector('.alert')
             success.classList.add('show')
             
             setTimeout(() => {
                success.classList.remove('show')
             }, 5000)
        },

        show(params) {
            this.msg = params.msg;
            this.img = params.img;
        },

        beforeMount() {
            alertVue.EventBus.$on('show', (params) => {
            this.show(params)
            })
        }
    }

}
</script>

<style scoped lang="scss">

.alert{
    display: none
}

.show {
  display: block!important;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  top: 20px;

    .msg__success{
        p{
            margin-top: -5px;
        }
    }
}

</style>