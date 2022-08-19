<template>
  <q-list>
    <!-- PROJECTS -->
    <q-item-label header>PROJECTS</q-item-label>
    <q-item
      clickable
      :to="{ name: 'projects-dashboard' }"
    >
      <q-item-section avatar>
        <q-icon name="mdi-chart-pie" />
      </q-item-section>
      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <q-item
      clickable
      :to="{ name: 'projects-inventory' }"
    >
      <q-item-section avatar>
        <q-icon name="mdi-file" />
      </q-item-section>
      <q-item-section>Inventory</q-item-section>
    </q-item>

    <!-- REPORTS -->
    <q-separator class="q-my-lg" />

    <q-item-label header>REPORTS</q-item-label>
    <q-item
      clickable
      :to="{ name: 'reports-raw' }"
    >
      <q-item-section avatar>
        <q-icon name="mdi-file-chart" />
      </q-item-section>
      <q-item-section>Raw</q-item-section>
    </q-item>

    <!-- SETTINGS -->
    <q-separator
      class="q-my-lg"
      v-show="showSettingRoutes"
    />

    <q-item-label
      header
      v-show="showSettingRoutes"
    >SETTINGS</q-item-label>
    <q-item
      clickable
      :to="{ name: 'settings-projects' }"
      v-show="showSettingRoutes"
    >
      <q-item-section avatar>
        <q-icon name="mdi-file-cog" />
      </q-item-section>
      <q-item-section>Projects</q-item-section>
    </q-item>

    <q-item
      clickable
      :to="{ name: 'settings-users' }"
      v-show="showSettingRoutes"
    >
      <q-item-section avatar>
        <q-icon name="mdi-account-cog" />
      </q-item-section>
      <q-item-section>Users</q-item-section>
    </q-item>

    <q-item
      clickable
      :to="{ name: 'settings-users-profile' }"
      v-show="showSettingRoutes"
    >
      <q-item-section avatar>
        <q-icon name="mdi-account-cog" />
      </q-item-section>
      <q-item-section>User Profiles</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showSettingRoutes = ref(route.name.includes('settings'))
</script>
