<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <DxDataGrid
          :data-source="dataSource || []"
          :show-borders="true"
          :show-column-lines="true"
          :show-row-lines="false"
          :column-auto-width="true"
          :row-alternation-enabled="true"
          :repaint-changes-only="true"
          @row-updating="onRowUpdating"
        >
          <DxPaging
            :enabled="true"
            :page-size="5"
          />
          <DxPager
            :allowed-page-sizes="[5, 10, 25, 'all']"
            :show-page-size-selector="true"
            :show-navigation-buttons="true"
            :show-info="true"
          />
          <DxHeaderFilter :visible="true" />

          <DxEditing
            :allow-adding="allowAdding"
            :allow-updating="allowUpdating"
            :allow-deleting="allowDeleting"
            :use-icons="true"
            refresh-mode="full"
            mode="popup"
          />

          <DxColumn
            type="buttons"
            :width="110"
            caption="ACTIONS"
            :visible="allowDeleting || allowUpdating"
          >
            <DxButton name="edit" />
            <DxButton name="delete" />
          </DxColumn>

          <DxColumn
            v-for="(col, i) in columnList"
            :key="i"
            :data-field="col"
            :data-type="dataTypeCheck(col)"
            :caption="col.replaceAll('_', ' ').toUpperCase()"
            :allow-editing="col === 'id' ? false : true"
            css-class="maxed-width"
          >
            <DxLookup
              v-if="col === 'pillar'"
              :data-source="pillarOpts"
            />

            <DxLookup
              v-else-if="col === 'group_owner'"
              :data-source="groupOwnerOpts"
            />

            <DxLookup
              v-else-if="col === 'status'"
              :data-source="statusOpts"
            />

            <DxLookup
              v-else-if="col === 'overall_status'"
              :data-source="overallStatusOpts"
            />

            <DxLookup
              v-else-if="col === 'segment'"
              :data-source="segmentOpts"
            />
          </DxColumn>
        </DxDataGrid>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useUserDataStore } from 'stores/userData'
import {
  DxDataGrid,
  DxEditing,
  DxColumn,
  DxLookup,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxButton
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { omit, merge } from 'lodash'
import {
  getAll,
  insert,
  update,
  remove
} from 'src/services/projects'

const updateNewObj = ref(null)
const columnList = ref([])
const allowAdding = ref(false)
const allowUpdating = ref(false)
const allowDeleting = ref(false)
const dataSource = new CustomStore({
  key: 'id',
  load: () => getAll()
    .then(r => {
      columnList.value = Object.keys(omit(r.data[0], ['projects_logs', 'projects_comments']))
      const cleanedData = r.data.map(m => omit(m, ['projects_logs', 'projects_comments']))
      return cleanedData
    }),
  insert: (values) => insert(values),
  update: (key) => update(key, updateNewObj.value),
  remove: (key) => remove(key),
  reshapeOnPush: true
})

// OPTIONS FOR THE DROP DOWN
const pillarOpts = [
  'Cost Opti',
  'CX',
  'Revenue',
  'Churn',
  'Others'
]
const groupOwnerOpts = [
  'Digital Assets/Online',
  'PLDT & Smart CCOS',
  'PLDT-CCare',
  'PLDT-CCM',
  'PLDT-CCOS',
  'PLDT-Home Ops',
  'PLDT-Home Ops / Home Application Mgt',
  'Retail Business Development',
  'Smart-CXDSE',
  'Smart-CCare',
  'Smart-CCM',
  'Smart-CCOS',
  'Smart-CXDSE'
]
const statusOpts = [
  'Pre-assessment',
  'Technical Assessment',
  'Scheduling',
  'Build & Test',
  'UAT',
  'Deployment',
  'PPT',
  'Completed',
  'On Hold',
  'Cancelled'
]
const overallStatusOpts = [
  'At Risk',
  'Cancelled',
  'Completed',
  'Delayed',
  'On Hold',
  'On Track',
  'TBD'
]
const segmentOpts = [
  'PLDT Home',
  'PLDT SME',
  'PLDT HOME/SMART',
  'SMART'
]
const userDataStore = useUserDataStore()

const onRowUpdating = (e) => (updateNewObj.value = merge(e.oldData, e.newData))
const dataTypeCheck = (field) => {
  if (field.includes('date')) { return 'date' } else if (field.includes('schedule')) { return 'date' } else if (field === 'wave_number' || field === 'ageing_in_days' || field.includes('savings')) { return 'number' } else if (field === 'priority') { return 'boolean' } else { return 'string' }
}
const updateAllows = (profile) => {
  if (profile === 'admin') {
    allowAdding.value = true
    allowUpdating.value = true
    allowDeleting.value = true
  } else if (profile === 'editor') {
    allowAdding.value = true
    allowUpdating.value = true
  }
}

updateAllows(userDataStore.userData.profile)
</script>
