import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  persist: true,
  state: () => ({
    openDrawer: false,
    miniDrawer: false
  }),

  getters: {
    getOpenDrawer (state) { return state.openDrawer },
    getMiniDrawer (state) { return state.miniDrawer }
  },

  actions: {
    toggleOpen () {
      this.openDrawer = !this.openDrawer
    },

    toggleMini () {
      this.miniDrawer = !this.miniDrawer
    }
  }
})
