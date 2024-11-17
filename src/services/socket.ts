// src/services/socket.ts
import { io } from 'socket.io-client';
import { useCounterStore } from '../stores/store';

const socketUrl = 'https://ikcount.com'; // URL del servidor SocketIO
const accessToken = 'Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU='; // Token de acceso
const socket = io(`${socketUrl}/live?atoken=${accessToken}`, {
  transports: ['websocket', 'polling'], // Usar WebSocket o Polling
});

export function initializeSocket() {
  const counterStore = useCounterStore();

  socket.on('connect', () => {
    console.log('Conectado a Socket.IO');
    counterStore.setSocketStatus(true);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado de Socket.IO');
    counterStore.setSocketStatus(false);
  });

  socket.on('RAW', (data: any) => {
    // Aquí verificamos si recibimos datos y actualizamos el contador
    console.log('Datos RAW recibidos:', data); 
    if (data && data.count !== undefined) {
      console.log('Datos recibidos en RAW:', data);
      counterStore.setCount(data.count);  // Actualiza el contador en Pinia
    }
  });

  socket.on('WELCOME', (data: any) => {
    console.log('Conexión establecida:', data);
  });

  socket.on('SUMMARY', (data: any) => {
    console.log('Resumen:', data);
  });

  socket.on('HEARTBEAT', (data: any) => {
    console.log('Latido:', data);
  });
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log('Socket desconectado');
  }
}
