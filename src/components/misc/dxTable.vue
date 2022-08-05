<template>
  <DxDataGrid :data-source="data"
              column-resizing-mode="widget"
              :show-borders="true"
              :show-row-lines="true"
              :allow-column-resizing="true"
              :allow-column-reordering="true"
              :column-auto-width="true"
              :column-min-width="100"
              @exporting="onExporting">
    <DxColumnChooser :enabled="allowColumnChooser"
                     mode="select" />
    <DxSearchPanel :visible="allowSearchPanel"
                   :width="240"
                   placeholder="Search..." />
    <DxPaging :page-size="10" />
    <DxPager :allowed-page-sizes="pageSizes"
             :show-page-size-selector="true"
             :show-navigation-buttons="true"
             :show-info="true" />
    <DxHeaderFilter :visible="allowHeaderFilter" />
    <DxExport :enabled="allowExport" />
    <DxColumnFixing :enabled="true" />
    <DxGrouping :auto-expand-all="false" />

    <DxColumn v-for="(col, i) in columns"
              :key="i"
              :data-field="col"
              :group-index="allowStatusGrouping ? groupingIndex(col) : null"
              :format="col === 'wave %' || col === 'demand %' ? `#0.#'%'` : null"
              css-class="maxed-width" />

    <DxSummary v-if="allowSummary">
      <DxGroupItem :show-in-group-footer="false"
                   :align-by-column="true"
                   column="wave number"
                   summary-type="sum" />

      <DxGroupItem :show-in-group-footer="false"
                   :align-by-column="true"
                   column="wave %"
                   summary-type="avg"
                   :value-format="formatDecimal" />

      <DxGroupItem :show-in-group-footer="false"
                   :align-by-column="true"
                   column="demand number"
                   summary-type="sum" />

      <DxGroupItem :show-in-group-footer="false"
                   :align-by-column="true"
                   column="demand %"
                   summary-type="avg"
                   :value-format="formatDecimal" />

      <DxTotalItem column="wave number"
                   summary-type="sum" />

      <DxTotalItem column="wave %"
                   summary-type="avg"
                   :value-format="formatDecimal" />

      <DxTotalItem column="demand number"
                   summary-type="sum" />

      <DxTotalItem column="demand %"
                   summary-type="avg"
                   :value-format="formatDecimal" />
    </DxSummary>
  </DxDataGrid>
</template>

<script setup>
import {
  DxDataGrid,
  DxPaging,
  DxPager,
  DxHeaderFilter,
  DxSearchPanel,
  DxColumnChooser,
  DxColumnFixing,
  DxColumn,
  DxExport,
  DxGrouping,
  DxSummary,
  DxTotalItem,
  DxGroupItem
} from 'devextreme-vue/data-grid'
import { exportDataGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'

const props = defineProps([
  'data',
  'columns',
  'title',
  'allowExport',
  'allowHeaderFilter',
  'allowFilterRow',
  'allowColumnChooser',
  'allowSearchPanel',
  'allowSummary',
  'allowStatusGrouping'
])
const pageSizes = [5, 10, 25, 'all']

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

const formatDecimal = (e) => `${e.toFixed(2)}%`
const groupingIndex = (column) => {
  switch (column) {
    case 'parent status':
      return 0

    case 'brand':
      return 1

    case 'status':
      return 2

    default:
      return null
  }
}
</script>

<style>
.dx-datagrid {
  padding: 10px;
  border-radius: 10px;
}

.maxed-width {
  max-width: 200px;
}
</style>
