<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-card>
        <q-card-section>
          <DxDataGrid
            key-expr="id"
            :data-source="dataSource || []"
            :show-borders="true"
            :show-column-lines="true"
            :show-row-lines="false"
            :column-auto-width="true"
            :row-alternation-enabled="true"
            :repaint-changes-only="true"
            @row-updating="onRowUpdating"
          >
            <DxEditing
              :allow-updating="true"
              :allow-deleting="true"
              :allow-adding="true"
              :use-icons="true"
              refresh-mode="full"
              mode="popup"
            >
              <DxPopup :width="700" />
            </DxEditing>
            <DxPaging :enabled="true" />

            <DxColumn
              data-field="id"
              caption="ID"
              :allow-editing="false"
            />

            <DxColumn
              data-field="profile"
              caption="PROFILE"
            />

            <DxColumn
              data-field="settings_page"
              caption="SETTINGS"
            />

            <DxColumn
              data-field="dashboard_page"
              caption="DASHBOARD"
            />

            <DxColumn
              data-field="inventory_page"
              caption="INVENTORY"
            />

            <DxColumn
              data-field="report_raw_page"
              caption="REPORT RAW"
            />
          </DxDataGrid>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import {
  DxDataGrid,
  DxEditing,
  DxColumn,
  DxPaging,
  DxPopup
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { omit, merge } from 'lodash'
import {
  getAll,
  insert,
  update,
  remove
} from 'src/services/users-profiles'

const updateNewObj = ref(null)
const dataSource = new CustomStore({
  key: 'id',
  load: () => getAll().then(r => r.data.map(m => omit(merge(m, {}), ['users']))),
  insert: (values) => insert(values),
  update: (key) => update(key, updateNewObj.value),
  remove: (key) => remove(key),
  reshapeOnPush: true
})
const onRowUpdating = (e) => (updateNewObj.value = merge(e.oldData, e.newData))
</script>
