export const state = () => ({
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
