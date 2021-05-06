<template>
  <div>
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
      <thead>
        <tr class="text-left border-b border-gray-300">
          <th class="px-4 py-3">Nom</th>
          <th class="px-4 py-3">Date</th>
          <th class="px-4 py-3">Artiste</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-gray-100 border-b border-gray-200" v-for="concert in concerts" :key="concert.id">
          <td class="px-4 py-3">{{ concert.name }}</td>
          <td class="px-4 py-3">{{ getDate(concert.date) }}</td>
          <td class="px-4 py-3">{{ concert.artist ? concert.artist.name : 'Aucun artiste' }}</td>
          <td class="px-4 py-3">
            <div class="flex item-center justify-start">
              <NuxtLink :to="{name: 'admin-form-concert', params: {concertId: concert.id}}" class="btn-action">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </NuxtLink>
              <button @click="deleteConcert(concert.id)" class="btn-action ml-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000000">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :nbElement="nbConcerts" :limit="limit" :currentPage="currentPage" @changePage="changePage($event)"/>
  </div>
</template>
<script>
import Pagination from '@/components/Common/Pagination'

export default {
  name: 'ConcertTable',
  components: {
    pagination: Pagination
  },
  data () {
    return {
      concerts: [],
      nbConcerts: null,
      limit: 5,
      currentPage: 1
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'concert/CONCERTS') {
        this.concerts = mutations.payload
      } else if (mutations.type === 'concert/NBCONCERTS') {
        this.nbConcerts = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchConcerts({ page: this.currentPage, limit: this.limit })
  },
  methods: {
    getDate (dateStr) {
      if (dateStr.includes('/')) {
        return dateStr
      } else {
        const date = new Date(dateStr)
        return date.toLocaleDateString()
      }
    },
    fetchConcerts (params) {
      this.$store.dispatch('concert/getConcerts', params)
    },
    deleteConcert (id) {
      this.$store.dispatch('concert/deleteConcert', id)
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Concert supprimé avec succès !')
          this.fetchConcerts({ page: this.currentPage, limit: this.limit })
        })
    },
    changePage (data) {
      this.currentPage = data
      this.fetchConcerts({ page: data, limit: this.limit })
    }
  }
}
</script>
