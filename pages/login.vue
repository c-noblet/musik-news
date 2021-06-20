<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
      <form
        class="text-center"
        @submit="submitForm($event)"
      >
        <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-white">
          Connexion
        </h1>
        <div class="py-2 text-left">
          <label class="block text-white text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Email"
            required
          >
        </div>
        <div class="py-2 text-left">
          <label class="block text-white text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Mot de passe"
            required
          >
        </div>
        <div class="py-2 mt-4">
          <button type="submit" class="btn btn-primary w-full">
            Se connecter
          </button>
        </div>
      </form>
      <div class="text-center mt-12">
        <span>
          Vous n'avez pas encore de compte ?
        </span>
        <NuxtLink to="/register" class="font-light text-md text-primary underline font-semibold hover:text-white">
          Inscrivez-vous !
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    submitForm (event) {
      event.preventDefault()
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
        .then((msg) => {
          this.$router.push('/')
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Connexion réussie !')
        })
    }
  }
}
</script>
