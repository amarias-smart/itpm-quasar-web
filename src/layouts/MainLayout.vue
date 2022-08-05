<template>
  <q-layout view="hHh lpR ffr">
    <q-header
      bordered
      class="bg-green"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="layoutStore.toggleOpen"
        />

        <q-toolbar-title>
          ITPM TRACKER
        </q-toolbar-title>

        <h6 class="text-weight-light q-my-none text-uppercase">{{ userProfile }}</h6>

        <q-separator
          vertical
          dark
          class="q-mx-md"
        />

        <USEROPTS class="q-mr-xs" />

        <NOTIFLIST class="q-mr-xs" />

        <MENUOPTS />
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      overlay
      behavior="mobile"
      v-model="layoutStore.openDrawer"
    >
      <DRAWERCONTENT />
    </q-drawer>

    <q-page-container class="bg-green-2">
      <suspense>
        <router-view />
      </suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import 'devextreme/dist/css/dx.light.css'
import { defineAsyncComponent } from 'vue'
import { useLayoutStore } from 'stores/layout'
import { useUserDataStore } from 'stores/userData'

const DRAWERCONTENT = defineAsyncComponent(() => import('components/layout/drawerContent.vue'))
const USEROPTS = defineAsyncComponent(() => import('components/layout/userOpts.vue'))
const NOTIFLIST = defineAsyncComponent(() => import('components/layout/notifsList.vue'))
const MENUOPTS = defineAsyncComponent(() => import('components/layout/menuOpts.vue'))

const layoutStore = useLayoutStore()
const userDataStore = useUserDataStore()
const userProfile = userDataStore.userData.profile
</script>
