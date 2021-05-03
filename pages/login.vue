<template>
  <div>
    <h1> Login </h1>
    <label>Email</label>
    <input v-model="email" value="valentin.gimonnet18@gmail.com"/>
    <label>Password</label>
    <input type="password" v-model="password" value="Admin123*"/>
    <button @click="submitForm" class="btn">Se connecter</button>

    <p>
      Didn't have any account yet ? <NuxtLink to="/register">Register now !</NuxtLink>
    </p>
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
    submitForm () {
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
