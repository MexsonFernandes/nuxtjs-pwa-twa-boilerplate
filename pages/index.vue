<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title is-1">{{ $store.state.app_name }}</h1>
      <h1 v-if="$store.state.update_time" class="title is-2">
        Last Updates: {{ $store.state.update_time }}
      </h1>
      <h1 v-if="$store.state.app_version" class="title is-4">
        <span class="has-text-weight-medium">App Version:</span>
        {{ $store.state.app_version }}
      </h1>
      <h1 v-if="$store.state.update_available != null" class="title is-6">
        <span class="has-text-weight-medium">Update Available:</span>
        {{ $store.state.update_available ? 'Yes' : 'No' }}
      </h1>
      <button
        v-if="installAvailable"
        class="button is-primary"
        @click="appInstall"
      >
        Install App
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      deferredPrompt: null,
      installAvailable: null,
    }
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
        // Update UI notify the user they can install the PWA
        this.installAvailable = true
      })

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('appinstalled', (evt) => {
        // Log install to analytics
        console.log('INSTALL: Success')
      })
    }
  },
  methods: {
    appInstall() {
      // hideMyInstallPromotion()
      // Show the install prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.$toast.info('Installation started!')
        } else {
          this.$toast.error('Installation canceled!')
        }
      })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
