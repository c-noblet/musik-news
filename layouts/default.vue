<template>
  <div>
    <nav>
      <ul class="flex flex-row">
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/news">
            News
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/artists">
            Artists
          </NuxtLink>
        </li>
        <li>
          <button v-if="isAuth" @click="logout">
            Logout
          </button>
          <NuxtLink v-else to="/login">
            Login
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <main>
      <flash-message />
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'RootComponent',
  data () {
    return {
      isAuth: null,
      role: null,
      user: null
    }
  },
  created () {
    this.isAuth = this.$store.getters['auth/getIsAuth']
    this.role = this.$store.getters['auth/getRole']
    this.user = this.$store.getters['auth/getUser']

    this.unsubscribe = this.$store.subscribe((mutations) => {
      console.log(mutations.payload)
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      } else if (mutations.type === 'auth/ROLE') {
        this.role = mutations.payload
      } else if (mutations.type === 'auth/USER') {
        this.user = mutations.payload
      }
    })
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    logout (e) {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.flash('Déconnexion réussie !', 'success', { timeout: 5000 })
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
