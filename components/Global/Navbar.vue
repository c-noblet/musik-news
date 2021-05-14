<template>
  <nav
    id="header"
    class="flex items-center justify-between flex-wrap bg-gray-800 p-3 fixed w-full z-10 top-0"
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <NuxtLink to="/" class="text-white no-underline hover:text-white hover:no-underline no-nuxt-link-style">
        <span class="text-2xl pl-2">Musik-News</span>
      </NuxtLink>
    </div>

    <div class="block lg:hidden">
      <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" @click="toggleMenu">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
      </button>
    </div>

    <div id="nav-content" class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0">
      <ul class="list-reset lg:flex justify-end flex-1 items-center">
        <li class="mr-3">
          <NuxtLink to="/" class="inline-block py-2 px-4 text-white no-underline">
            Accueil
          </NuxtLink>
        </li>
        <li class="mr-3">
          <NuxtLink to="/news" class="inline-block no-underline py-2 px-4">
            News
          </NuxtLink>
        </li>
        <li class="mr-3">
          <NuxtLink to="/artists" class="inline-block no-underline py-2 px-4">
            Artistes
          </NuxtLink>
        </li>
        <li v-if="role == 'admin'" class="mr-3">
          <NuxtLink to="/admin" class="inline-block no-underline py-2 px-4">
            Administration
          </NuxtLink>
        </li>
        <li class="mr-3">
          <button v-if="isAuth" class="inline-block no-underline py-2 px-4" @click="logout">
            Déconnexion
          </button>
          <NuxtLink v-else to="/login" class="inline-block no-underline py-2 px-4">
            Connexion
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
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
    toggleMenu () {
      document.querySelector('#nav-content').classList.toggle('hidden')
    },
    fetchUserInfo () {
      this.$store.dispatch('auth/getUserInfo')
    },
    logout (e) {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Déconnexion réussie !')
          this.$router.push('/login')
        })
    }
  }
}
</script>
