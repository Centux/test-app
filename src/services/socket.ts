// src/services/socket.ts
import { io, Socket } from 'socket.io-client';
import { useCounterStore } from '../stores/store';

const socketUrl = 'https://ikcount.com/live';  // URL del servidor Socket.IO
const accessToken = 'Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=';  // Token de acceso

let socket: Socket | null = null;  // Declaramos una variable socket que se inicializará después

export function initializeSocket() {
  if (socket) return;  // Evitar reconectar si ya está conectado

  // // Conectar el socket
  // socket = io(`${socketUrl}/live?atoken=${accessToken}`, {
  //   transports: ['websocket', 'polling'], // Usar WebSocket o Polling
  // });
  socket = io(socketUrl, {
    query: { atoken: accessToken },
    transports: ['websocket', 'polling'],
  });


  const counterStore = useCounterStore();

  // Manejo de eventos del socket
  socket.on('connect', () => {
    console.log('Conectado a Socket.IO');
    counterStore.setSocketStatus(true);  // Actualizamos el estado del socket
  });

  socket.on('disconnect', () => {
    console.log('Desconectado de Socket.IO');
    counterStore.setSocketStatus(false);  // Actualizamos el estado cuando se desconecta
  });

  // Verificar si el evento RAW llega correctamente
  socket.on('raw', (data: any) => {
    console.log('Recibido desde el servidor:', data); // Verificar los datos

    if (data && data.counting_in !== undefined) {
      counterStore.setCount(data.counting_in);  // Actualiza el contador en el store
    } else {
      console.warn('Datos inesperados:', data); // Si los datos no son lo esperado, muestra una advertencia
    }
    if (data && data.counting_out !== undefined) {
      counterStore.setCountOut(data.counting_out);  // Actualiza el contador en el store
    } else {
      console.warn('Datos inesperados:', data); // Si los datos no son lo esperado, muestra una advertencia
    }
  });

  socket.on('welcome', (data: any) => {
    console.log('Conexión establecida:', data, data.counting_out);
    if (data && data.counting_in !== undefined) {
      counterStore.setCount(data.counting_in);  // Actualiza el contador en el store
    }
    if (data && data.counting_out !== undefined) {
      counterStore.setCountOut(data.counting_out);  // Actualiza el contador en el store
    }
  });

  socket.on('summary', (data: any) => {
    console.log('Resumen:', data);
  });

  socket.on('heartbeat', (data: any) => {
    console.log('Latido:', data);
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
