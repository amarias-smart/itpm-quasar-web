<template>
  <q-page padding>
    <q-card
      class="q-mb-md"
      style="width: 10%;"
    >
      <DxSelectBox
        :items="globalStore.brandList"
        v-model:value="globalStore.brand"
      />
    </q-card>

    <div v-if="loadingChart">
      <CHARTSGRID
        :data="summaryCountDataSource"
        class="q-mb-md"
      />
    </div>

    <div v-if="loadingTable">
      <DXPIVOT :data="summaryDataSource" />
    </div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue'
// import { first, sortedUniq } from 'lodash'
import { DxSelectBox } from 'devextreme-vue/ui/select-box'
import { summaryCount, summary } from 'src/services/projects'
import { useGlobalStore } from 'stores/global'

const CHARTSGRID = defineAsyncComponent(() => import('components/misc/chartsGrid.vue'))
const DXPIVOT = defineAsyncComponent(() => import('components/misc/dxPivot.vue'))
// const DXTABLE = defineAsyncComponent(() => import('components/misc/dxTable.vue'))

const globalStore = useGlobalStore()
const loadingChart = ref(false)
const loadingTable = ref(false)
const summaryDataSource = ref({
  fields: [
    {
      caption: 'BRAND',
      dataField: 'brand',
      width: 120,
      area: 'row'
    },
    {
      caption: 'STATUS',
      dataField: 'parent status',
      width: 120,
      area: 'column'
    },
    {
      caption: 'WAVE #',
      dataField: 'wave count',
      dataType: 'number',
      summaryType: 'sum',
      area: 'data'
    }, {
      caption: 'WAVE %',
      dataField: 'wave count',
      dataType: 'number',
      summaryType: 'sum',
      summaryDisplayMode: 'percentOfColumnGrandTotal',
      area: 'data'
    }
  ],
  store: []
})
const summaryCountDataSource = ref([])
const initializeData = () => {
  summaryCount()
    .then(({ data }) => {
      summaryCountDataSource.value = data
      loadingChart.value = true
    })

  summary()
    .then(({ data }) => {
      summaryDataSource.value.store = data
      loadingTable.value = true
    })
}

watch(() => globalStore.getBrand, (val) => {
  initializeData()

  if (val !== 'ALL') {
    summaryDataSource.value.store = summaryDataSource.value.store.filter(f => f.brand === val)
  }
})

initializeData()
</script>
