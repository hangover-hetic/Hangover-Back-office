<script>
import TheNavbar from '@/components/Navbar'
import ListeEcrans from '@/components/ListeEcrans'

export default{
  
  components:{
    TheNavbar,
    ListeEcrans,
  }
}

</script>

<template>
  <div class="container">
    <h1 class="h1-title">Création du festival</h1>
    <form>
        <div class="box">
          <i class="fa-solid fa-images custom-icon"></i>
        </div>
        <p>
          <label for="name">Nom du festival</label>
          <input
            class="dotted"
            id="name"
            v-model="name"
            type="text"
            name="name"
          >
        </p>
        <p>
          <label for="date">Date</label>
          <input
            class="dotted"
            id="Date"
            v-model="Date"
            type="date"
            name="Date"
          >
        </p>
        <p>
          <label for="lieuFestival">Lieu du festival</label>
          <input
            class="dotted"
            id="lieuFestival"
            v-model="lieuFestival"
            type="text"
            name="lieuFestival"
          >
        </p>
        <p>
          <label for="description">description</label>
          <input
            class="dotted"
            id="description"
            v-model="description"
            type="text"
            name="description"
          >
        </p>
      <button>Créer</button>
    </form>
    <div>
      <h1>Liste des écrans</h1>
    </div>
    <ListeEcrans></ListeEcrans>
    <TheNavbar></TheNavbar>
  </div>
</template>

<style scoped lang="scss">

  .h1-title {
    margin-left : 1%;
    font-size   : 50px;
    color: #fff;
  }

  .container {
    max-width: 1000px;
    margin-left: 10em;
    margin-right: 10em;
  }
  
  input {
      width: 100%;
      background-color: #202020;
      color: rgb(54, 53, 53);
      padding: 14px 20px;
      margin: 8px 0;
      border: 2px dashed;
      border-radius: 4px;
      cursor: pointer;
  }

  label {
    color: #fff;
  }

  button {
    border-width: 1px;
    border-color: #fff;
    color: #fff;
    background-color: #202020;
    width: 100px;
    height: 50px;

  }

  .box {
    color: rgb(54, 53, 53);
    border: 2px dashed;
    height: 200px;
    width: 200px;
  }

  .custom-icon {
       width: 13rem;
        display: table-cell;
        font-size: 3rem;
        padding: 4.5rem 0;
        text-align: center;
  }

</style>
