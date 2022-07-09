<template>
    <div class="licences">
        <liste-ecrans></liste-ecrans>
    </div>
</template>

<script>
import ListeEcransVue from '@/components/ListeEcrans.vue'
import ListeEcrans from '@/components/ListeEcrans.vue'


export default {
  components: { ListeEcrans },
  
    name: 'licencesPage',

    component:{
        ListeEcransVue,
    }
}

</script>

<style scoped lang="scss">

</style>