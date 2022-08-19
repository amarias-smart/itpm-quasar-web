<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="(contact, i) in contacts"
        :key="i"
      >
        <q-card class="bg-gradient">
          <q-card-section>
            <div
              class="text-center text-uppercase text-weight-bold text-h6"
              :class="contact.isSmart ? 'text-green' : 'text-red'"
            >{{ contact.name }}</div>

            <q-separator
              inset
              class="q-my-sm"
            />

            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    :color="contact.isSmart ? 'green' : 'red'"
                    name="mdi-cellphone"
                  />
                </q-item-section>

                <q-item-section>{{ contact.mobile }}</q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon
                    :color="contact.isSmart ? 'green' : 'red'"
                    name="mdi-email"
                  />
                </q-item-section>

                <q-item-section>{{ contact.email }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const contacts = [
  {
    name: 'GARZON, Mike M.',
    mobile: '09189497730',
    email: 'MMGarzon@smart.com.ph',
    isSmart: true
  },
  {
    name: 'GESALTA-ZOLETA, Cherry Anne R.',
    mobile: '09998852508',
    email: 'CRGesalta@pldt.com.ph',
    isSmart: false
  },
  {
    name: 'DOLENDO-BUBAN, Rozelle E.',
    mobile: '09190643860',
    email: 'REDolendo@pldt.com.ph',
    isSmart: false
  },
  {
    name: 'AMBONI, Juliet G.',
    mobile: '09498865206',
    email: 'JGAmboni@pldt.com.ph',
    isSmart: false
  },
  {
    name: 'NOGOY, Jan Danielle V.',
    mobile: '09088802521',
    email: 'JVNogoy@pldt.com.ph',
    isSmart: false
  }
]
</script>
