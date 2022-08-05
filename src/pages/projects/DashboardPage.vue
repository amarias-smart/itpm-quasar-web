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

    <CHARTSGRID
      :data="summaryCountData"
      class="q-mb-md"
    />

    <DXPIVOT :data="summaryDataSource" />
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue'
// import { first, sortedUniq } from 'lodash'
import { DxSelectBox } from 'devextreme-vue'
import { summaryCount, summary } from 'src/services/projects'
import { useGlobalStore } from 'stores/global'

const CHARTSGRID = defineAsyncComponent(() => import('components/misc/chartsGrid.vue'))
const DXPIVOT = defineAsyncComponent(() => import('components/misc/dxPivot.vue'))
// const DXTABLE = defineAsyncComponent(() => import('components/misc/dxTable.vue'))

const globalStore = useGlobalStore()
const { data: summaryCountData } = await summaryCount()
const { data: summaryData } = await summary()
const summaryDataSource = ref({
  fields: [],
  store: summaryData
})

summaryDataSource.value.fields = [
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
]

watch(() => globalStore.getBrand, (val) => {
  if (val === 'ALL') {
    summaryDataSource.value.store = summaryData
  } else {
    summaryDataSource.value.store = summaryData.filter(f => f.brand === val)
  }
})
</script>
