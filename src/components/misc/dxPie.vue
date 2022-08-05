<template>
  <q-card>
    <q-card-section>
      <DxPieChart
        :data-source="data"
        palette="Material"
        :title="title"
        @point-click="pointClickHandler($event)"
        @legend-click="legendClickHandler($event)"
      >
        <DxSeries
          argument-field="label"
          value-field="value"
        >
          <DxLabel
            :visible="true"
            :customize-text="formatLabel"
            position="columns"
          >
            <DxConnector
              :visible="true"
              :width="0.5"
            />
            <DxFont :size="14" />
          </DxLabel>
        </DxSeries>
        <DxLegend
          :row-count="1"
          vertical-alignment="bottom"
          horizontal-alignment="center"
          item-text-position="right"
        />
      </DxPieChart>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue'
import DxPieChart, {
  DxSeries,
  DxLabel,
  DxConnector,
  DxLegend,
  DxFont
} from 'devextreme-vue/pie-chart'

defineProps(['data', 'title'])

const toggleVisibility = (item) => (item.isVisible() ? item.hide() : item.show())
const pointClickHandler = (e) => toggleVisibility(e.target)
const legendClickHandler = (e) => {
  const arg = e.target
  const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]

  toggleVisibility(item)
}
const formatLabel = (pointInfo) => `${pointInfo.valueText} (${pointInfo.percentText})`
</script>
