<template>
  <div>
    <Nuxt />
    <client-only>
      <offline-alert
        :offline-message="offlineMessage"
        :online-message="onlineMessage"
      />
    </client-only>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      onlineMessage: 'You are online',
      offlineMessage: 'You are offline',
      deferredPrompt: null,
    }
  },
  async mounted() {
    this.$store.commit('checkUpdateAvailable', false)
    this.$store.commit('updateTime', null)

    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing

        newWorker.addEventListener('statechange', () => {
          switch (newWorker.state) {
            case 'installed':
              // check for new service worker
              if (navigator.serviceWorker.controller) {
                this.newUpdateAvailable()
                this.$store.commit('checkUpdateAvailable', true)
              }
              break
          }
        })
      })
    })

    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        console.log('app is insta')
        this.$store.commit('checkInstallAvailable', false)
        if (event.isUpdate) {
          // whatever logic you want to use to notify the user that they need to refresh the page.
          console.log('there is update')
        }
      })
    }
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.$store.commit('createDeferredPrompt', e)
        // Update UI notify the user they can install the PWA
        this.$store.commit('checkInstallAvailable', true)
      })

      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('appinstalled', (evt) => {
        this.$store.commit('checkInstallAvailable', false)
        this.$toast.success('App is installed!')
      })
    }
  },
  methods: {
    newUpdateAvailable() {
      this.$confirm({
        title: 'Wohoo!',
        message: 'New update available',
        button: {
          yes: 'OK',
        },
      })
      this.createUpdateToast()
    },
    createUpdateToast() {
      this.$toasted.show('Update the current app', {
        position: 'bottom-center',
        duration: null,
        action: {
          text: 'Refresh',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
            // refresh the page
            window.location.reload()
          },
        },
      })
    },
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
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
</style>
