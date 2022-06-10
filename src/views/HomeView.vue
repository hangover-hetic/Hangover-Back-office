<template>
  <div class="home">
    <ListeBackoffice></ListeBackoffice>
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import ListeBackoffice from '../components/Liste'
import Navbar from '@/components/Navbar'

export default{
  
  components:{
    ListeBackoffice,
    Navbar
}
}
</script>


<style scoped lang="scss">



</style>
