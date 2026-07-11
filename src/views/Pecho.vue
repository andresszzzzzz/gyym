<template>
  <q-page class="gym-bg q-pa-lg">

    <div class="text-center q-mb-xl">
      <q-icon name="fitness_center" size="60px" color="red" />
      <div class="text-h3 text-weight-bold text-white q-mt-sm">Rutina de Pecho</div>
      <div class="text-subtitle1 text-grey-4">Progreso: {{ completedCount }} / {{ ejercicios.length }} completados</div>
      <q-linear-progress size="12px" :value="globalProgress" color="red" class="q-mt-md rounded-borders shadow-2" />
    </div>

    <div v-for="(ej, index) in ejercicios" :key="index" class="row justify-center q-mb-xl">

      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-card class="gym-card col-12 col-md-9" :class="{ 'completed-card': ej.isCompleted }">
          <div class="row">
            <div class="col-12 col-md-6 q-pa-lg">
              <div class="text-h5 text-weight-bold" :class="ej.isCompleted ? 'text-green' : 'text-white'">
                {{ ej.nombre }}
                <q-icon v-if="ej.isCompleted" name="check_circle" color="green" />
              </div>

              <q-separator class="q-my-md" dark />

              <div class="q-gutter-sm q-mb-md">
                <q-chip color="red" text-color="white" icon="build">{{ ej.equipo }}</q-chip>
                <q-chip color="green" text-color="white" icon="repeat">{{ ej.reps }}</q-chip>
              </div>

              <div class="text-h3 text-white q-my-sm font-mono text-weight-bold">
                {{ formatTime(ej.timer) }}
              </div>

              <q-linear-progress size="10px" :value="ej.timer / ej.maxTime" color="red" track-color="grey-8"
                class="q-mb-md" rounded />

              <div class="q-gutter-sm">
                <q-btn :color="ej.isStarted ? 'warning' : 'red'" :icon="ej.isStarted ? 'pause' : 'play_arrow'"
                  :label="ej.isStarted ? 'Pausar' : 'Iniciar'" @click="toggleTimer(ej)" rounded unelevated />

                <q-btn color="grey-7" icon="restart_alt" @click="resetExercise(ej)" round unelevated flat
                  title="Reiniciar ejercicio" />

                <q-btn v-if="ej.isStarted || ej.timer > 0" color="green" icon="check" label="Completar"
                  @click="completeExercise(ej)" rounded unelevated />
              </div>
            </div>

            <div class="col-12 col-md-6 bg-black">
              <video :src="ej.media" autoplay muted loop class="video-gym"></video>
            </div>
          </div>
        </q-card>
      </transition>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Estado inicial con maxTime definido (ej. 60 segundos por ejercicio)
const ejercicios = ref([
  { nombre: 'Press de Banca', equipo: 'Barra', reps: '4 x 10', media: '/presibanca.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Press Inclinado', equipo: 'Mancuernas', reps: '3 x 12', media: '/presbancaincli.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Aperturas', equipo: 'Máquina', reps: '3 x 12', media: '/cablecru.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Press con Mancuernas', equipo: 'Mancuernas', reps: '4 x 10', media: '/pressmancu.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false }
])

// Formato de tiempo MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

const toggleTimer = (ej) => {
  if (ej.isStarted) {
    clearInterval(ej.interval)
    ej.isStarted = false
  } else {
    ej.isStarted = true
    ej.interval = setInterval(() => {
      if (ej.timer < ej.maxTime) {
        ej.timer++
      } else {
        clearInterval(ej.interval)
        ej.isStarted = false
        $q.notify({ type: 'info', message: 'Tiempo máximo alcanzado.' })
      }
    }, 1000)
  }
}

// Nueva función de Reinicio
const resetExercise = (ej) => {
  clearInterval(ej.interval)
  ej.timer = 0
  ej.isStarted = false
  ej.isCompleted = false
}

const completeExercise = (ej) => {
  clearInterval(ej.interval)
  ej.isStarted = false
  ej.isCompleted = true

  $q.notify({
    type: 'positive',
    message: `¡Bien hecho! ${ej.nombre} terminado.`,
    position: 'top-right'
  })

  checkRoutineCompletion()
}

// Progreso global
const completedCount = computed(() => ejercicios.value.filter(e => e.isCompleted).length)
const globalProgress = computed(() => completedCount.value / ejercicios.value.length)

const checkRoutineCompletion = () => {
  if (completedCount.value === ejercicios.value.length) {
    $q.dialog({
      title: '¡Rutina Finalizada!',
      message: '¡Excelente trabajo! Has completado todos los ejercicios.',
      persistent: true,
      ok: { color: 'red', label: '¡Genial!' }
    })
  }
}
</script>


<style scoped>
.gym-bg {
  background: linear-gradient(135deg, #111, #202020, #111);
  min-height: 100vh;
}

.gym-card {
  background: #1c1c1c;
  color: white;
  border-radius: 20px;
  overflow: hidden;
  transition: .35s;
  box-shadow: 0 10px 25px rgba(0, 0, 0, .45);
  border: 1px solid transparent;
}

.completed-card {
  border: 2px solid #21ba45;
}

.video-gym {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}
</style>