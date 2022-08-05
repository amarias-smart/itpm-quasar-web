<template>
  <q-list>
    <q-item-label header>PROJECTS</q-item-label>
    <q-item clickable
            :to="{ name: 'projects-dashboard' }">
      <q-item-section avatar>
        <q-icon name="mdi-chart-pie" />
      </q-item-section>
      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <q-item clickable
            :to="{ name: 'projects-inventory' }">
      <q-item-section avatar>
        <q-icon name="mdi-file" />
      </q-item-section>
      <q-item-section>Inventory</q-item-section>
    </q-item>

    <q-separator class="q-my-lg" />

    <q-item-label header>REPORTS</q-item-label>
    <q-item clickable
            :to="{ name: 'reports-raw' }">
      <q-item-section avatar>
        <q-icon name="mdi-file-chart" />
      </q-item-section>
      <q-item-section>Raw</q-item-section>
    </q-item>
  </q-list>
</template>
