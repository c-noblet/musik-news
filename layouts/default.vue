<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0" id="header">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <NuxtLink to="/" class="text-white no-underline hover:text-white hover:no-underline no-nuxt-link-style">
          <span class="text-2xl pl-2"><i class="em em-grinning"></i> Musik-News</span>
        </NuxtLink>
      </div>

      <div class="block lg:hidden">
        <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" @click="toggleMenu">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>

      <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <NuxtLink to="/" class="inline-block py-2 px-4 text-white no-underline">Home</NuxtLink>
          </li>
          <li class="mr-3">
            <NuxtLink to="/news" class="inline-block no-underline py-2 px-4">News</NuxtLink>
          </li>
          <li class="mr-3">
            <NuxtLink to="/artists" class="inline-block no-underline py-2 px-4">Artists</NuxtLink>
          </li>
          <li class="mr-3" v-if="role == 'admin'">
            <NuxtLink to="/admin" class="inline-block no-underline py-2 px-4">Administration</NuxtLink>
          </li>
          <li class="mr-3">
            <button v-if="isAuth" @click="logout" class="inline-block no-underline py-2 px-4">
              Logout
            </button>
            <NuxtLink v-else to="/login" class="inline-block no-underline py-2 px-4">Login</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <main class="container mx-auto mt-24 md:mt-18">
      <flash-message />
      <Nuxt />
    </main>
  </div>
</template>

<script>
import FlashMessage from '~/components/Global/FlashMessage.vue'
export default {
  name: 'RootComponent',
  components: {
    'flash-message': FlashMessage
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
