<template>
  <div class="artist-card flex flex-col justify-center items-center">
    <img :src="artist.avatar" alt="Avatar de l'artiste/groupe">
    <h2>{{ artist.name }}</h2>
    <NuxtLink :to="{name: 'artist-id', params: {id: artist.id }}" class="btn">Voir {{ artist.id }}</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['artist'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.artist-card {
  width: 20rem;
  height: 30rem;
  border-radius: 2.5rem;
  background-color:rgb(243, 243, 243);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.342);
}
img {
  width: 15rem;
  height: 20rem;
  border-radius: 2.5rem;

}
</style>
