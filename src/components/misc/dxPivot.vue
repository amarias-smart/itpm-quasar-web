<template>
  <q-card class="overflow-hidden">
    <DxPivotGrid
      :data-source="data"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-borders="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="false"
      :show-column-totals="false"
      @exporting="onExporting"
    >

      <DxFieldChooser
        :enabled="true"
        :height="400"
      />

      <DxExport :enabled="true" />
    </DxPivotGrid>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue'
import {
  DxPivotGrid,
  DxFieldChooser,
  DxExport
} from 'devextreme-vue/pivot-grid'
import { exportDataGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'

const props = defineProps(['data', 'title'])

const onExporting = (e) => {
  const title = props.title || 'ITPM Data'
  const workbook = new Workbook()
  const worksheet = workbook.addWorksheet('Main sheet')

  exportDataGrid({
    component: e.component,
    worksheet
  }).then(function () {
    workbook.xlsx.writeBuffer()
      .then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${title}.xlsx`)
      })
  })
  e.cancel = true
}
</script>
