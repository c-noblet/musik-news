<template>
  <div>
    <h1 class="flex items-center py-2 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">
      Gestion des news
    </h1>
    <div class="text-right mb-5">
      <NuxtLink to="/admin/form-article" class="btn btn-primary ml-auto">
        Ajouter
      </NuxtLink>
    </div>
    <ArticleTable :articles="articles" />
  </div>
</template>
<script>
import ArticleTable from '@/components/Articles/ArticleTable'
export default {
  name: 'News',
  components: {
    ArticleTable
  },
  data () {
    return {
      articles: []
    }
  }
}
</script>
