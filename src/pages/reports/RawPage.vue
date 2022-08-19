<template>
  <q-page padding>
    <DXTABLE
      :data="data"
      :columns="columnList"
      :title="'ITPM Raw Report'"
      :allow-export="true"
      :allow-search-panel="true"
      :allow-header-filter="true"
      :allow-column-chooser="true"
      :allow-summary="false"
      :allow-status-grouping="false"
    />
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { getAll } from 'src/services/projects'
import { first, omit } from 'lodash'
import { useUserDataStore } from 'stores/userData'

const DXTABLE = defineAsyncComponent(() => import('components/misc/dxTableTemplate.vue'))

const userDataStore = useUserDataStore()
const { data } = await getAll()
const dataSource = ref([])
const columnList = ref([])
const allowExport = ref(false)

dataSource.value = data.map(m => omit(m, ['projects_logs', 'projects_comments']))
columnList.value = Object.keys(omit(first(data), ['projects_logs', 'projects_comments']))

if (userDataStore.userData.profile !== 'viewer') {
  allowExport.value = true
}
</script>
