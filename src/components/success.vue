<template>
    <div class="success">
        <div class="img__succes">
            <img src="../assets/img/success.svg" />
        </div>
        <div class="msg__success">
            <p>succès {{success}}</p>
        </div>
    </div>
</template>

<script>

export default{
    name: 'successComponent',

    
    props:{
        success: String
    }
}
</script>

<style scoped lang="scss">

.success{
    display: none
}

</style>