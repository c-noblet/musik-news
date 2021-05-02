<template>
  <div>
    <h1> Inscription </h1>
    <label>Email</label>
    <input v-model="email"/>
    <label>Password</label>
    <input type="password" v-model="password"/>
    <label>Username</label>
    <input v-model="username"/>
    <button @click="submitForm" class="btn">S'inscrire</button>
    <p>
      Already have an account ? <NuxtLink to="/login">Login now !</NuxtLink>
    </p>
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
