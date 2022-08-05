<template>
  <q-btn flat
         round
         icon="mdi-account-details">
    <q-menu>
      <q-list>
        <q-item clickable
                :to="{ name: 'settings-projects' }">
          <q-item-section>Modify Entries</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
