<template>
  <NuxtLink :to="`/news/${data.id}`" class="article">
    <article>
      <h3>{{ data.title }}</h3>
      <span>{{ data.published }}</span>
      <p>{{ data.content }}</p>
    </article>
  </NuxtLink>
</template>
<script>
export default {
  name: 'Article',
  props: ['data']
}
</script>
<style lang="scss" scoped>
  .article {
    display: block;
    border: 1px solid #000;
    padding: 1rem;
  }
</style>
