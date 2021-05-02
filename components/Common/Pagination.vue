<template>
  <div>
    <button v-for="numPage in nbPages" :key="numPage" :class="numPage == currentPage ? 'btn-pagination active' : 'btn-pagination'" @click="$emit('changePage', numPage)">
      {{ numPage }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['nbElement', 'currentPage', 'limit'],
  data () {
    return {
      nbPages: 1
    }
  },
  watch: {
    nbElement () {
      if (this.nbElement > this.limit) {
        this.nbPages = Math.ceil(this.nbElement / this.limit)
      }
    }
  }
}
</script>
