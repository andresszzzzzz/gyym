<template>
  <q-page class="flex flex-center bg-grey-10 text-white">
    <q-card class="bg-black text-white" style="width: 400px; max-width: 90vw; border: 1px solid #f44336;">
      <q-card-section>
        <div class="text-h6 text-red">Iniciar Sesión</div>
      </q-card-section>
      <q-card-section>
        <q-input dark color="red" v-model="usuario" label="Usuario" />
        <q-input dark color="red" v-model="password" type="password" label="Contraseña" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="red" label="Entrar" @click="ingresar" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref('')
const password = ref('')

function ingresar() {
  localStorage.setItem('auth', 'true')
  router.push('/')
}
</script>