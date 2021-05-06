<template>
  <div>
    <h1>Gestion des news</h1>
    <NuxtLink to="/admin/form-article">
      Ajouter
    </NuxtLink>
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
