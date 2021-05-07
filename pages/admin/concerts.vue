<template>
  <div>
    <h1 class="flex items-center py-2 px-8 border-l-4 border-gray-100 text-3xl font-semibold mb-3">Gestion des concerts</h1>
    <div class="text-right">
      <NuxtLink to="/admin/form-concert" class="btn btn-primary ml-auto">Ajouter</NuxtLink>
    </div>
    <ConcertTable />
  </div>
</template>

<script>
import ConcertTable from '@/components/Concert/ConcertTable'

export default {
  name: 'ConcertsAdminPage',
  components: {
    ConcertTable
  },
  data () {
    return {
      concerts: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'concert/CONCERTS') {
        this.concerts = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchConcerts()
  },
  methods: {
    fetchConcerts () {
      this.$store.dispatch('concert/getAllConcerts')
    }
  }
}
</script>
