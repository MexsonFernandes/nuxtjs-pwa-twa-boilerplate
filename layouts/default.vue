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
  data: () => ({
    onlineMessage: 'You are online',
    offlineMessage: 'You are offline',
  }),
  async mounted() {
    this.$store.commit('checkUpdateAvailable', false)
    this.$store.commit('updateTime', null)

    navigator.serviceWorker.ready.then((registration) => {
      registration.update().then(() => {
        console.log('update ava')
      })
    })

    const workbox = await window.$workbox
    console.log(workbox)
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        console.log('app isa instaled')
        console.log(event)
        workbox.addEventListener('statechange', () => {
          // Has network.state changed?
          if (workbox.state) {
            console.log('update')
          }
          console.log()
        })
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        if (event.isUpdate) {
          console.log('update ava')
          this.newUpdateAvailable()
          // whatever logic you want to use to notify the user that they need to refresh the page.
          this.$store.commit('checkUpdateAvailable', true)
        }
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
