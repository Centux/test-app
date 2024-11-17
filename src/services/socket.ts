// src/services/socket.ts
import { io, Socket } from 'socket.io-client';
import { useCounterStore } from '../stores/store';

const socketUrl = 'https://ikcount.com/live';  // URL del servidor Socket.IO
const accessToken = 'Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=';  // Token de acceso

let socket: Socket | null = null;  // Declaramos una variable socket que se inicializará después

export function initializeSocket() {
  if (socket) return;  // Evitar reconectar si ya está conectado

  socket = io(socketUrl, {
    query: { atoken: accessToken },
    transports: ['websocket', 'polling'],
  });

  const counterStore = useCounterStore();

  const updateStore = (data: any) => {
    counterStore.setCount(data.counting_in);  // Actualiza el contador en el store
    counterStore.setCountOut(data.counting_out);  // Actualiza el contador en el store
  }

  socket.on('connect', () => {
    console.log('Conectado a Socket.IO');
    counterStore.setSocketStatus(true);  // Actualizamos el estado del socket
  });

  socket.on('disconnect', () => {
    console.log('Desconectado de Socket.IO');
    counterStore.setSocketStatus(false);  // Actualizamos el estado cuando se desconecta
  });

  socket.on('raw', (data: any) => {
    console.log('Recibido desde el servidor:', data); // Verificar los datos
    updateStore(data);
  });

  socket.on('welcome', (data: any) => {
    console.log('Conexión establecida:', data, data.counting_out);
    updateStore(data);
  });

  socket.on('summary', (data: any) => {
    console.log('Resumen:', data);
  });

  socket.on('heartbeat', (data: any) => {
    console.log('Latido:', data);
    updateStore(data);
  });
}

// Función para desconectar el socket
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log('Socket desconectado');
    socket = null;  // Liberamos la referencia
  }
}
