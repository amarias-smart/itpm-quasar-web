<template>
  <q-btn flat
         round
         icon="mdi-menu">
    <q-menu anchor="bottom right"
            self="top right">
      <q-list>
        <q-item clickable
                :to="{ name: 'settings-users' }">
          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item clickable
                :to="{ name: 'about-us' }">
          <q-item-section>About Us</q-item-section>
        </q-item>

        <q-item clickable
                :to="{ name: 'faqs' }">
          <q-item-section>FAQs</q-item-section>
        </q-item>

        <q-item clickable
                @click="openTheURL('http://10.122.8.236/esolve/Login')">
          <q-item-section>File CR</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { openURL } from 'quasar'

const openTheURL = (url) => openURL(url)
</script>
