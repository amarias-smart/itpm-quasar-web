<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-card style="width: 50%;">
        <q-card-section class="text-center text-grey-8">
          <div class="text-h5 text-weight-bold">Frequently Asked Questions</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <article class="q-mb-lg text-weight-light">
            <div class="q-mb-xs">
              <q-icon
                name="mdi-help-circle-outline"
                size="sm"
                color="red"
              />
              How do I add new entries on the project list?
            </div>

            <div>
              <q-icon
                name="mdi-checkbox-marked-circle-outline"
                size="sm"
                color="green"
              />
              Click on the
              <q-icon
                name="mdi-account-details"
                size="sm"
                class="q-mx-xs"
              />
              icon on the top-right corner then select "Modify Entries".
            </div>
          </article>

          <article class="q-mb-lg text-weight-light">
            <div class="q-mb-xs">
              <q-icon
                name="mdi-help-circle-outline"
                size="sm"
                color="red"
              />
              How do I extract data with selected information only?
            </div>

            <div>
              <q-icon
                name="mdi-checkbox-marked-circle-outline"
                size="sm"
                color="green"
              />
              Click on the <span class="text-weight-bold">xlsx</span> icon icon on the top-right corner of a table.
            </div>
          </article>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
</script>
