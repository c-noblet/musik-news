<template>
  <NuxtLink :to="{name: 'artist-id', params: {id: artist.id }}" class="artist-card">
    <img :src="artist.avatar" alt="Avatar de l'artiste/groupe">
    <h2 class="text-center text-gray-200 text-semibold text-2xl">
      {{ artist.name }}
    </h2>
  </NuxtLink>
</template>

<script>
export default {
  props: ['artist']
}
</script>
