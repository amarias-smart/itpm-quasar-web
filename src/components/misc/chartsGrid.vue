<template>
  <div class="row q-col-gutter-md">
    <div class="col">
      <DXPIE title="TOTAL"
             :data="completedData" />
    </div>

    <div class="col">
      <DXPIE title="ONGOING"
             :data="ongoingData" />
    </div>

    <div class="col">
      <DXPIE title="OTHERS"
             :data="othersData" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch, ref, defineAsyncComponent } from 'vue'
import { groupBy } from 'lodash'
import { useGlobalStore } from 'stores/global'

const DXPIE = defineAsyncComponent(() => import('components/misc/dxPie.vue'))

const props = defineProps(['data'])
const globalStore = useGlobalStore()

const data = ref(props.data)
const completedData = ref([])
const ongoingData = ref([])
const othersData = ref([])

const computeValues = (parentStatus) => {
  const totalCount = data.value
    .filter(f => f.status === 'ALL')
    .map(m => m.count)
    .reduce((x, y) => x + y, 0)

  const el = data.value
    .filter(f => f['parent status'] === parentStatus)
    .find(f => f.brand === globalStore.brand)

  const dataArr = []

  dataArr.push({
    label: 'COMPLETED',
    value: el.count
  })

  dataArr.push({
    label: 'NON-COMPLETED',
    value: totalCount - el.count
  })

  return dataArr
}
const computeValues2 = (parentStatus) => {
  const el = data.value.filter(f => f['parent status'] === parentStatus)

  if (globalStore.brand === 'ALL') {
    const groupedData = groupBy(el.filter(f => f.brand !== 'ALL').map(m => {
      return {
        label: m.status,
        value: m.count
      }
    }), 'label')

    return Object.keys(groupedData).map(m => {
      return {
        label: m,
        value: groupedData[m].map(m2 => m2.value).reduce((x, y) => x + y, 0)
      }
    })
  } else {
    return el.filter(f => f.brand === globalStore.getBrand).map(m => {
      return {
        label: m.status,
        value: m.count
      }
    })
  }
}

// INITIALIZE DATA
completedData.value = computeValues('COMPLETED')
ongoingData.value = computeValues2('ONGOING')
othersData.value = computeValues2('OTHERS')

// UPDATE DATA ON BRAND CHANGE
watch(() => globalStore.getBrand, (val) => {
  completedData.value = computeValues('COMPLETED')
  ongoingData.value = computeValues2('ONGOING')
  othersData.value = computeValues2('OTHERS')
})
</script>
