<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-card style="width: 50%;">
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
            <DxEditing
              :allow-updating="true"
              :allow-deleting="true"
              :allow-adding="true"
              :use-icons="true"
              refresh-mode="full"
              mode="row"
            />
            <DxPaging :enabled="true" />
            <DxHeaderFilter :visible="true" />

            <DxColumn
              data-field="id"
              caption="ID"
              :allow-editing="false"
            />

            <DxColumn
              data-field="domain"
              caption="DOMAIN"
            />

            <DxColumn
              data-field="profile"
              caption="PROFILE"
            >
              <DxLookup
                :data-source="profileList"
                display-expr="profile"
                value-expr="id"
              />
            </DxColumn>
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
  DxLookup,
  DxPaging,
  DxHeaderFilter
} from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { omit, merge } from 'lodash'
import {
  getAll as getAllUsers,
  insert,
  update,
  remove
} from 'src/services/users'
import { getAll as getAllUserProfiles } from 'src/services/users-profiles'

const updateNewObj = ref(null)
const dataSource = new CustomStore({
  key: 'id',
  load: () => getAllUsers().then(r => r.data.map(m => omit(merge(m, {}), ['users_profile']))),
  insert: (values) => insert(values),
  update: (key) => update(key, updateNewObj.value),
  remove: (key) => remove(key)
})
const profileList = await getAllUserProfiles().then(r => r.data.map(m => ({ id: m.id, profile: m.profile })))

const onRowUpdating = (e) => (updateNewObj.value = merge(e.oldData, e.newData))
</script>
