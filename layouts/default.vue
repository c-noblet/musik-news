<template>
  <div
    id="body"
    class="bg-gray-700"
  >
    <Navbar />
    <main class="container mx-auto">
      <FlashMessage />
      <Nuxt />
    </main>
  </div>
</template>

<script>
import FlashMessage from '~/components/Global/FlashMessage.vue'
import Navbar from '~/components/Global/Navbar.vue'
export default {
  name: 'RootComponent',
  components: {
    FlashMessage, Navbar
  },
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
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      } else if (mutations.type === 'auth/ROLE') {
        this.role = mutations.payload
      } else if (mutations.type === 'auth/USER') {
        this.user = mutations.payload
      }
    })
  },
  mounted () {
    this.fetchUserInfo()
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    logout (e) {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Déconnexion réussie !')
          this.$router.push('/login')
        })
    },
    fetchUserInfo () {
      this.$store.dispatch('auth/getUserInfo')
    },
    toggleMenu (event) {
      document.getElementById('nav-content').classList.toggle('hidden')
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
