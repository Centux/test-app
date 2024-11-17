<template>
  <div class="counter-container">
      <h1>Contador de Personas</h1>
      <p>Personas en el contador: {{ count }}</p>
      <div class="buttons">
        <button @click="increase">Añadir Persona</button>
        <button @click="decrease">Quitar Persona</button>
      </div>
    </div>

</template>

<script>
import { useCounterStore } from '../stores/counter.js';
import { listenForEvents } from '../services/socket';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'home',
  setup() {
    const counterStore = useCounterStore();
    const socketData = ref('');

    const increase = async () => {
      await counterStore.increase();
    };

    const decrease = async () => {
      await counterStore.decrease();
    };

    onMounted(() => {
      listenForEvents((data) => {
        socketData.value = JSON.stringify(data);
        console.log('event', JSON.stringify(data));
        if (data && data.count !== undefined) {
          counterStore.setCount(data.count);
        }
      });
    });

    onBeforeUnmount(() => {
      // Aquí podemos cerrar la conexión si es necesario
      // closeConnection();
    });

    return {
      count: counterStore.count,
      increase,
      decrease,
      socketData,
    };
  },
};
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
