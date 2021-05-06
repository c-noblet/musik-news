<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
      <form
        @submit="submitForm($event)"
        class="text-center"
      >
        <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-white">
          Inscription
        </h1>
        <div class="py-2 text-left">
          <label class="block text-white text-sm font-bold mb-2" for="username">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Nom d'utilisateur"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="py-2 text-left">
          <label class="block text-white text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            type="email"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Email"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="py-2 text-left">
          <label class="block text-white text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input
            type="password"
            class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
            placeholder="Password"
            id="password"
            required
            v-model="password"
          />
        </div>
        <div class="py-2 mt-4">
          <button type="submit" class="btn btn-primary w-full">
            Se connecter
          </button>
        </div>
      </form>
      <div class="text-center mt-12">
        <span>
          Vous avez déjà un compte ?
        </span>
        <NuxtLink to="/login" class="font-light text-md text-primary underline font-semibold hover:text-white">Connectez-vous !</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      email: null,
      password: null,
      username: null
    }
  },
  methods: {
    submitForm () {
      this.$store.dispatch('auth/register', {
        email: this.email,
        password: this.password,
        username: this.username
      })
        .then((msg) => {
          this.$router.push('/')
          this.$store.dispatch('flashMessage/addSuccessMessage', 'Inscription réussie !')
        })
    }
  }
}
</script>
