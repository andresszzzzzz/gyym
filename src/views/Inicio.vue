<template>
  <q-page class="bg-grey-10 text-white">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      infinite
      control-color="white"
      height="600px" 
      class="bg-black"
    >
      <q-carousel-slide v-for="(img, index) in images" :key="index" :name="index + 1" class="q-pa-none">
        <q-img 
          :src="img" 
          fit="cover" 
          class="full-height full-width" 
        />
        
        <div class="absolute-center text-center q-pa-md bg-black-transparent">
          <h1 class="text-h2 text-bold text-red q-my-none">Bienvenido</h1>
          <p class="text-h5 text-white">Selecciona una rutina en el menú lateral.</p>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<style scoped>
.bg-black-transparent {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(5px);
}
</style>

<script setup>
import { ref } from 'vue'

const slide = ref(1)


const images = ref([
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1920'
])
</script>