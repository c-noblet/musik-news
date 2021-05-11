<template>
  <NuxtLink :to="{name: 'artist-id', params: {id: artist.id }}" class="artist-card">
    <div class="flex flex-col justify-center items-center">
      <img :src="artist.avatar" alt="Avatar de l'artiste/groupe">
      <h2 class="text-center text-gray-200 text-semibold text-2xl">{{ artist.name }}</h2>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: ['artist']
}
</script>
