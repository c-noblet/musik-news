<template>
  <div>
    <h1>Administration</h1>
    <aside>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/admin/news">News</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/artists">Artistes/Groupes</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/concerts">Concerts</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/albums">Albums</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/genres">Genres</NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <section>
      <Nuxt />
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      isAuth: null,
      role: null,
      user: null
    }
  },
  methods: {},
  created () {
    this.isAuth = this.$store.getters['auth/getIsAuth']
    this.role = this.$store.getters['auth/getRole']
    this.user = this.$store.getters['auth/getUser']

    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      } else if (mutations.type === 'auth/ROLE') {
        this.role = mutations.payload
      } else if (mutations.type === 'auth/USER') {
        this.user = mutations.payload
      }
    })
  },
  mounted () {},
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>
