<template>
  <div class="flex flex-center fullscreen bg-indigo-10">
    <div class="absolute fullscreen img_background"></div>

    <q-card style="width: 70%; border-radius: 10px;"
            class="z-top overflow-none">
      <q-card-section horizontal
                      class="row"
                      style="background: #535084;">
        <div class="col-12 col-md-7 q-pa-xl">
          <q-img src="~assets/undraw-thought-process.svg" />
        </div>
        <div class="col-12 col-md text-center"
             style="background: #1c203a;">
          <form @submit.prevent="validateUser"
                class="text-white">
            <h3 class="q-pb-none q-mb-none">ITPM Tracker</h3>
            <p class="text-grey-6">Welcome, login your credentials below:</p>

            <q-card-section class="q-gutter-md">
              <q-input dark
                       standout="bg-indigo text-white"
                       v-model="model.username"
                       label="Username"
                       :disable="disableForm">
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>

              <q-input dark
                       standout="bg-indigo text-white"
                       label="Password"
                       type="password"
                       v-model="model.password"
                       :disable="disableForm">
                <template v-slot:prepend>
                  <q-icon name="mdi-key" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-actions vertical>
              <q-btn flat
                     color="blue"
                     label="SIGN IN"
                     type="submit"
                     :loading="disableForm" />
            </q-card-actions>
          </form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserDataStore } from 'stores/userData'
import { auth } from 'src/services/authenticate'

const userStore = useUserDataStore()
const router = useRouter()
const model = ref({
  username: '',
  password: ''
})
const disableForm = ref(false)

const validateUser = async () => {
  disableForm.value = true

  try {
    const { data } = await auth(model.value)
    const { Result: userData } = data

    userStore.update(userData[0])

    router.push({ name: 'projects-dashboard' })

    disableForm.value = false
  } catch (ex) {
    disableForm.value = false
  }
}
</script>

<style scoped>
.img_background {
  background: url('../assets/dark-swirl.jpg');
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px);
}
</style>
