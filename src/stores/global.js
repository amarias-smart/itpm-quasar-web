import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    brand: 'ALL',
    brandList: ['ALL', 'BOTH', 'PLDT', 'SMART']
  }),

  getters: {
    getBrand (state) { return state.brand },
    getBrandList: (state) => state.brandList
  },

  actions: {
    updateBrand (data) { this.brand = data }
  }
})
