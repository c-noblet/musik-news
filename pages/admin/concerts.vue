<template>
  <div>
    <h1>Gestion des concerts</h1>
    <NuxtLink to="/admin/form-concert">
      Ajouter
    </NuxtLink>
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
