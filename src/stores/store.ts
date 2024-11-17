// src/store/store.ts (agregar funciones de API)
import axios from 'axios';
import { defineStore } from 'pinia';

const apiUrl = 'https://ikcount.com/iklab/ikcount/api/counting/command?atoken=Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    count_out: 0,
    client: 'DEMO001',
    location: 'DEMO001A1L1',
    macAddress: 'DEMO001A1L1Z1MC4',
    isSocketConnected: false,
  }),
  actions: {
    setCount(count: number) {
      this.count = count;  // Actualiza el contador con el valor recibido
    },
    setCountOut(count_out: number) {
      this.count_out = count_out;  // Actualiza el contador con el valor recibido
    },
    setSocketStatus(status: boolean) {
      this.isSocketConnected = status; // Actualiza el estado de la conexión
    },
    async incrementCount() {
      await this.sendCommand('manual-add', 1);
      this.count += 1;
    },
    async decrementCount() {
      if (this.count > 0) {
        await this.sendCommand('manual-sub', 1);
        this.count -= 1;
      }
    },
    async sendCommand(command: string, quantity: number) {
      try {
        const response = await axios.post(apiUrl, {
          type: command,
          quantity: quantity,
          client: this.client,
          location: this.location,
          mac_address: this.macAddress,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.cod === 200) {
          console.log('Comando exitoso:', response.data);
        } else {
          console.error('Error en el comando:', response.data.mssg);
        }
      } catch (error) {
        console.error('Error al enviar el comando:', error);
      }
    },
  },
});
