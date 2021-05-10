<template>
  <div>
    <div v-for="message in successMessages" :key="message" class="flash-message success flex flex-row justify-start items-center w-full">
      <span class="pill">SUCCÈS</span>
      <div class="flex flex-row justify-between items-center ml-4 w-full">
        <span class="font-semibold">{{ message }}</span>
        <button @click="removeFlashMessage(message, 'success')" class="mr-5">
          x
        </button>
      </div>
    </div>
    <div v-for="message in errorMessages" :key="message" class="flash-message error flex flex-row justify-start items-center w-full">
      <div class="flex flex-row justify-between items-center ml-4 w-full">
        <span class="pill">ERREUR</span>
        <span class="font-semibold">{{ message }}</span>
        <button @click="removeFlashMessage(message, 'error')">
          x
        </button>
      </div>
    </div>
    <div v-for="message in alertMessages" :key="message" class="flash-message alert flex flex-row justify-start items-center w-full">
      <div class="flex flex-row justify-between items-center ml-4 w-full">
        <span class="pill">ALERTE</span>
        <span class="font-semibold">{{ message }}</span>
        <button @click="removeFlashMessage(message, 'alert')">
          x
        </button>
      </div>
    </div>
    <div v-for="message in infoMessages" :key="message" class="flash-message info flex flex-row justify-start items-center w-full">
      <div class="flex flex-row justify-between items-center ml-4 w-full">
        <span class="pill">INFO</span>
        <span class="font-semibold">{{ message }}</span>
        <button @click="removeFlashMessage(message, 'info')">
          x
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlashMessage',
  data () {
    return {
      successMessages: [],
      errorMessages: [],
      alertMessages: [],
      infoMessages: []
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'flashMessage/SUCCESSMESSAGES') {
        this.successMessages.push(mutations.payload)
        this.clearFlashMessage(mutations.payload, 'success')
      } else if (mutations.type === 'flashMessage/ERRORMESSAGES') {
        this.errorMessages.push(mutations.payload)
        this.clearFlashMessage()
      } else if (mutations.type === 'flashMessage/ALERTMESSAGES') {
        this.alertMessages.push(mutations.payload)
      } else if (mutations.type === 'flashMessage/INFOMESSAGES') {
        this.infoMessages.push(mutations.payload)
      }
    })
  },
  methods: {
    clearFlashMessage (message, type) {
      setTimeout(() => {
        this.removeFlashMessage(message, type)
      }, 5000)
    },
    removeFlashMessage (message, type) {
      if (type === 'success') {
        this.successMessages.splice(this.successMessages.indexOf(message), 1)
      } else if (type === 'error') {
        this.errorMessages.splice(this.errorMessages.indexOf(message), 1)
      } else if (type === 'alert') {
        this.alertMessages.splice(this.alertMessages.indexOf(message), 1)
      } else if (type === 'info') {
        this.infoMessages.splice(this.infoMessages.indexOf(message), 1)
      }
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>
