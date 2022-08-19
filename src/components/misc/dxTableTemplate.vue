<template>
  <DXTABLE
    :data="data"
    :columns="columns"
    :title="title"
    :allow-export="allowExport"
    :allow-search-panel="allowSearchPanel"
    :allow-header-filter="allowHeaderFilter"
    :allow-column-chooser="allowColumnChooser"
    :allow-summary="allowSummary"
    :allow-status-grouping="allowStatusGrouping"
  />
</template>

<script setup>
import { defineAsyncComponent, defineProps, ref } from 'vue'

const DXTABLE = defineAsyncComponent(() => import('components/misc/dxTable.vue'))
const props = defineProps([
  'data',
  'columns',
  'title',
  'allowExport',
  'allowSearchPanel',
  'allowHeaderFilter',
  'allowColumnChooser',
  'allowSummary',
  'allowStatusGrouping'
])
const data = ref(props.data)
</script>
