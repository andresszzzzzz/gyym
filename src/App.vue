<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2 text-black">

    <q-header v-if="!isLogin" reveal elevated class="bg-black text-red" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" color="red" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-white">
          <q-avatar>
            <img src="/Loggym.png">
          </q-avatar>
          App Gym
        </q-toolbar-title>
        
        <q-btn flat dense icon="logout" color="red" label="Salir" @click="salir" />
      </q-toolbar>
      <!-- El bloque de q-tabs ha sido eliminado -->
    </q-header>

    <q-drawer v-if="!isLogin" v-model="leftDrawerOpen" side="left" elevated class="bg-black text-white">
      <q-list>
        <q-item clickable v-ripple to="/" active-class="text-red">
          <q-item-section avatar><q-icon name="home" color="red" /></q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/pecho" active-class="text-red">
          <q-item-section avatar><q-icon name="accessibility_new" color="red" /></q-item-section>
          <q-item-section>Pecho</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/brazo" active-class="text-red">
          <q-item-section avatar><q-icon name="fitness_center" color="red" /></q-item-section>
          <q-item-section>Brazo</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/pierna" active-class="text-red">
          <q-item-section avatar><q-icon name="directions_walk" color="red" /></q-item-section>
          <q-item-section>Pierna</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/espalda" active-class="text-red">
          <q-item-section avatar><q-icon name="accessibility" color="red" /></q-item-section>
          <q-item-section>Espalda</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="!isLogin" reveal elevated class="bg-black text-red">
      <q-toolbar>
        <q-toolbar-title class="text-white">
          <q-avatar>
            <img src="/Loggym.png">
          </q-avatar>
          <div>App Gym</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const leftDrawerOpen = ref(false)

const isLogin = computed(() => route.path === '/login')

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function salir() {
  localStorage.removeItem('auth')
  router.push('/login')
}
</script>
