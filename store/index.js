import config from '../nuxt.config'

export const state = () => ({
  app_version: config.app.version || null,
  app_name: config.pwa.manifest.short_name || process.env.npm_package_name,
  update_time: null,
  update_available: null,
})

export const mutations = {
  updateTime(state, value) {
    state.update_time = value
  },
  checkUpdateAvailable(state, value) {
    state.update_available = typeof value === 'boolean' ? value : null
  },
}
