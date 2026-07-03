<template>
  <q-page class="q-pa-md bg-grey-2">
    <h2 class="text-h4 text-black q-mb-lg text-center">Rutina de Brazo</h2>

    <div v-for="(ej, index) in ejercicios" :key="index" class="row justify-center q-mb-md">
      <q-card flat bordered class="col-12 col-md-8 bg-white">
        <div class="row items-center">
          
          <q-card-section class="col-12 col-md-6">
            <div class="text-h5 text-bold q-mb-md">{{ ej.nombre }}</div>
            
            <div class="q-mt-sm">
              <span class="text-grey-8">Equipamiento: </span> 
              <span class="text-weight-bold">{{ ej.equipo }}</span>
            </div>
            <div class="q-mt-sm">
              <span class="text-grey-8">Grupo principal: </span> 
              <span class="text-weight-bold">{{ ej.principal }}</span>
            </div>
            <div class="q-mt-sm">
              <span class="text-grey-8">Grupo secundario: </span> 
              <span class="text-weight-bold">{{ ej.secundario }}</span>
            </div>
            <div class="q-mt-sm">
              <span class="text-grey-8">Repeticiones: </span> 
              <span class="text-weight-bold text-red">{{ ej.reps }}</span>
            </div>
          </q-card-section>

          <q-card-section class="col-12 col-md-6 flex flex-center">
            <video 
              v-if="ej.tipo === 'video'" 
              controls 
              autoplay 
              loop 
              muted 
              width="100%" 
              style="border-radius: 8px;"
            >
              <source :src="ej.media" type="video/mp4">
            </video>
            <q-img v-else :src="ej.media" style="max-width: 250px; border-radius: 8px;" />
          </q-card-section>

        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
const ejercicios = [
  { 
    nombre: 'Curl de Biceps 21', equipo: 'Barra ', principal: 'Bíceps', secundario: 'Antebrazo',
    reps: '4 x 12', tipo: 'video', media: '/biceps1.mp4'
  },
  { 
    nombre: 'Behind the Back Curl (Cable)', equipo: 'Maquina', principal: 'Tríceps', secundario: 'Hombros',
    reps: '4 x 15', tipo: 'video', media: '/biceps2.mp4'
  },
  { 
    nombre: 'Curl Martillo', equipo: 'Mancuernas', principal: 'Bíceps (Braquial)', secundario: 'Antebrazo',
    reps: '3 x 12', tipo: 'video', media: '/biceps3.mp4'
  },
  { 
    nombre: 'Fondos en banco', equipo: 'Mancuerna', principal: 'Bíceps', secundario: 'Antebrazo',
    reps: '3 al fallo', tipo: 'video', media: '/biceps4.mp4' 
  }
]
</script>