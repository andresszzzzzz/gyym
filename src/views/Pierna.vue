<template>
  <q-page class="gym-bg q-pa-lg">
    
    <!-- Encabezado con Progreso Global -->
    <div class="text-center q-mb-xl">
      <q-icon name="fitness_center" size="60px" color="red" />
      <div class="text-h3 text-weight-bold text-white q-mt-sm">Rutina de Pierna</div>
      <div class="text-subtitle1 text-grey-4">Progreso: {{ completedCount }} / {{ ejercicios.length }} completados</div>
      <q-linear-progress size="12px" :value="globalProgress" color="red" class="q-mt-md rounded-borders shadow-2" />
    </div>

    <!-- Lista de Ejercicios -->
    <div v-for="(ej, index) in ejercicios" :key="index" class="row justify-center q-mb-xl">
      
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-card 
          class="gym-card col-12 col-md-9" 
          :class="{ 'completed-card': ej.isCompleted }"
        >
          <div class="row">
            <!-- Sección de información -->
            <div class="col-12 col-md-6 q-pa-lg">
              <div class="text-h5 text-weight-bold" :class="ej.isCompleted ? 'text-green' : 'text-white'">
                {{ ej.nombre }}
                <q-icon v-if="ej.isCompleted" name="check_circle" color="green" />
              </div>

              <q-separator class="q-my-md" dark />

              <!-- Chips de información -->
              <div class="q-gutter-sm q-mb-md">
                <q-chip color="red" text-color="white" icon="build">{{ ej.equipo }}</q-chip>
                <q-chip color="green" text-color="white" icon="repeat">{{ ej.reps }}</q-chip>
              </div>

              <!-- Cronómetro -->
              <div class="text-h3 text-white q-my-sm font-mono text-weight-bold">
                {{ formatTime(ej.timer) }}
              </div>
              
              <!-- Barra de progreso -->
              <q-linear-progress 
                size="10px" 
                :value="ej.timer / ej.maxTime" 
                color="red" 
                track-color="grey-8"
                class="q-mb-md" 
                rounded
              />

              <!-- Botones de Acción -->
              <div class="q-gutter-sm">
                <q-btn
                  :color="ej.isStarted ? 'warning' : 'red'"
                  :icon="ej.isStarted ? 'pause' : 'play_arrow'"
                  :label="ej.isStarted ? 'Pausar' : 'Iniciar'"
                  @click="toggleTimer(ej)"
                  rounded
                  unelevated
                />
                
                <q-btn
                  color="grey-7"
                  icon="restart_alt"
                  @click="resetExercise(ej)"
                  round
                  unelevated
                  flat
                  title="Reiniciar"
                />

                <q-btn
                  v-if="ej.isStarted || ej.timer > 0"
                  color="green"
                  icon="check"
                  label="Completar"
                  @click="completeExercise(ej)"
                  rounded
                  unelevated
                />
              </div>
            </div>

            <!-- Sección de Video -->
            <div class="col-12 col-md-6 bg-black">
              <video
                :src="ej.media"
                autoplay
                muted
                loop
                class="video-gym"
              ></video>
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

// Estado inicial de los ejercicios
const ejercicios = ref([
  { nombre: 'Elevación de Gemelos a Una Pierna', equipo: 'Peso corporal', reps: '4 x 15', media: '/pierna1.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Curl de Piernas Acostado (Máquina)', equipo: 'Máquina', reps: '4 x 12', media: '/pierna2.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Peso Muerto Rumano (Mancuerna)', equipo: 'Mancuernas', reps: '3 x 10', media: '/pierna3.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false },
  { nombre: 'Elevación de Gemelos de Pie (Mancuerna)', equipo: 'Mancuerna', reps: '4 x 15', media: '/pierna4.mp4', timer: 0, maxTime: 60, interval: null, isStarted: false, isCompleted: false }
])

// Formato MM:SS
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
      }
    }, 1000)
  }
}

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
    message: `¡Buen trabajo! ${ej.nombre} completado.`,
    position: 'top-right'
  })

  checkRoutineCompletion()
}

const completedCount = computed(() => ejercicios.value.filter(e => e.isCompleted).length)
const globalProgress = computed(() => completedCount.value / ejercicios.value.length)

const checkRoutineCompletion = () => {
  if (completedCount.value === ejercicios.value.length) {
    $q.dialog({
      title: '¡Rutina Finalizada!',
      message: '¡Excelente trabajo! Has completado todos los ejercicios de pierna.',
      persistent: true,
      ok: { color: 'red', label: '¡Genial!' }
    })
  }
}
</script>

<style scoped>
.gym-bg { background: linear-gradient(135deg,#111,#202020,#111); min-height:100vh; }
.gym-card { 
  background:#1c1c1c; 
  color:white; 
  border-radius:20px; 
  overflow:hidden; 
  transition:.35s; 
  box-shadow:0 10px 25px rgba(0,0,0,.45);
  border: 1px solid transparent;
}
.completed-card { border: 2px solid #21ba45; } 
.video-gym { width:100%; height:100%; object-fit:cover; min-height:300px; }
.font-mono { font-family: 'Courier New', Courier, monospace; }
</style>