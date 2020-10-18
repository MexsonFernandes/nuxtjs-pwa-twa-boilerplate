import config from '../nuxt.config'

export const state = () => ({
  app_version: config.app.version || null,
  app_name: config.pwa.manifest.short_name || process.env.npm_package_name,
  update_time: null,
  update_available: null,
  install_available: null,
  deferred_prompt: null,
})

export const mutations = {
  checkInstallAvailable(state, value) {
    state.install_available = value
  },
  createDeferredPrompt(state, value) {
    state.deferred_prompt = value
  },
  updateTime(state, value) {
    state.update_time = value
  },
  checkUpdateAvailable(state, value) {
    state.update_available = typeof value === 'boolean' ? value : null
  },
}
