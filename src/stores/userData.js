import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  persist: true,
  state: () => ({
    userData: {}
  }),

  getters: {
    get (state) {
      return state.userData
    }
  },

  actions: {
    update (payload) { this.userData = payload }
  }
})
