<template>
  <div class="mt-10 flex flex-row justify-center items-center">
    <button v-for="numPage in nbPages" :key="numPage" :class="numPage == currentPage ? 'btn-pagination active' : 'btn-pagination'" @click="$emit('changePage', numPage)">
      <span>{{ numPage }}</span>
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
      } else {
        this.nbPages = 1
      }
    }
  }
}
</script>
