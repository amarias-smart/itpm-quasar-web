<template>
  <q-page padding>
    <DXTABLE
      title="ITPM Data"
      :data="dataSource"
      :columns="columns"
      :allowExport="true"
      :allow-status-grouping="false"
      :allow-header-filter="false"
      :allow-column-chooser="false"
      :allow-search-panel="false"
      :allow-summary="false"
    />
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { getAll } from 'src/services/projects'

const DXTABLE = defineAsyncComponent(() => import('components/misc/dxTable.vue'))

const dataSource = ref([])
const columns = [
  'name',
  'demandNumber',
  'waveNumber',
  'proponent',
  'groupOwner',
  'overallStatus',
  'ageingInDays'
]

getAll().then(({ data }) => { dataSource.value = data })
</script>
