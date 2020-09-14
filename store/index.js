export const state = () => ({
  update_time: null,
  version: null,
  update_available: null,
})

export const mutations = {
  updateTime(state, value) {
    state.update_time = value
  },
  createVersion(state, value) {
    state.version = typeof value === 'string' ? value : null
  },
  checkUpdateAvailable(state, value) {
    state.update_available = typeof value === 'boolean' ? value : null
  },
}
