<template>
  <NuxtLink :to="`/news/${data.id}`" class="flex flex-col rounded px-4 py-2 bg-gray-100 hover:bg-gray-300">
    <article class="flex flex-col">
      <h3 class="text-2xl text-bold text-gray-600">{{ data.title }}</h3>
      <p class="truncate text-gray-700">{{ data.content }}</p>
      <span class="italic text-sm text-right text-gray-500">{{ data.published }}</span>
    </article>
  </NuxtLink>
</template>
<script>
export default {
  name: 'Article',
  props: ['data']
}
</script>
