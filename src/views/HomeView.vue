<!-- src/components/Counter.vue -->
<template>
  <div class="flex flex-col items-center justify-center space-y-4 counter-container">
    <h1 class="text-3xl font-bold">Contador de Personas</h1>
    
    <!-- Verifica la conexión -->
    <!-- <div v-if="!isSocketConnected" class="text-red-500">Conexión con el servidor en vivo no establecida.</div>
    <div v-else class="text-green-500">Conexión establecida.</div>
     -->
    <!-- Mostrar contador -->
    <p>Personas en el contador: {{ count }}</p>
    
    <!-- Botones para interactuar con el contador -->
    <div class="flex space-x-4 buttons">
      <button
        @click="incrementCount"
        class="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Sumar
      </button>
      <button
        @click="decrementCount"
        class="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Restar
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCounterStore } from '../stores/store';
import { initializeSocket } from '../services/socket';

// Usamos el store de Pinia
const counterStore = useCounterStore();

// Iniciar la conexión al socket
onMounted(() => {
  initializeSocket();
});

// Usar computed para asegurar la reactividad
const count = computed(() => counterStore.count);
const isSocketConnected = computed(() => counterStore.isSocketConnected);

// Acciones para incrementar o decrementar el contador
const incrementCount = counterStore.incrementCount;
const decrementCount = counterStore.decrementCount;
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

button {
  transition: background-color 0.3s;
}

button:hover {
  cursor: pointer;
}
.counter-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .buttons button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
  }
  
  .buttons button:hover {
    background-color: #45a049;
  }

  h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

