<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from 'axios';
window.axios = axios;

defineProps<{
  msg: string
}>();
const count = ref(0);

import { reactive } from "vue";
import { io } from "socket.io-client";
import Counter from '../components/Counter.vue';

const state = reactive({
  connected: false,
  fooEvents: ["WELCOME"],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://ikcount.com/socket.io/?atoken=Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=";

const socket = io(URL);

// socket.on("connect", () => {
//   state.connected = true;
//   console.log('CONNECT');
//   // socket.emit("item:list", (res) => {
//   //   this.items = res.data;
//   // });
//   socket.emit("SUMMARY", (res) => {
//     // this.items = res.data;
//     console.log('RES', res);
//   });
// });
socket.prependAny((event, ...args) => {
  console.log(`got ${event}`);
});

// socket.on('connect', (sock) => {
//   state.connected = true;
//   console.log('CONNECT', sock);
//   // sock.emit('SUMMARY', res);
//   //   socket.emit("WELCOME", (res) => {
//   //   // this.items = res.data;
//   //   console.log('RES', res);
//   // });
// });

socket.on("SUMMARY", (data) => { console.log('SUMMARY', data); });
socket.on("WELCOME", (data) => { console.log('WELCOME', data); });
socket.on("RAW", (data) => { console.log('RAW', data); });
socket.on("heartbeat", (data) => { console.log('HEARTBEAT.', data); }); //HEARTBEAT

socket.on("disconnect", () => {
  state.connected = false;
  console.log('DISCONNECT');
});


socket.onAny((event, ...args) => {
  console.log(`got ${event}`);
});

const handlePlus = () => {
    let json = {
      "type": "manual-add",
      "quantity": 1,
      "client": "DEMO001",
      "location": "DEMO001A1L1",
      "mac_address": "DEMO001A1L1Z1MC4"
    };
    window.axios.post('https://ikcount.com/iklab/ikcount/api/counting/command?atoken=Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=', 
          json, 
        {
            // atoken: 'Y2VudHV4OkFQSV9LRVlAMzM3NWFiYmQxZDIxZWI0YzkwYTRiNDJiZDRjNmQyMzYzNTQ0NDI0Nzc1ZTdjN2ZkYWQ4Y2JkNTM2NzVjNzk1ZTExM2ZhOGViMWI3NmFmOGQzNGRjYTU2YjE2MmYwYjQ5MTI3NGNlMGM5NmYzMjM4YzA2MmNmY2ViZTI4NzM3NTc6SUtMQUIwMDU=',
            headers: {
              'Content-Type': 'application/json'
            },

        })
        .then((response) => {
          console.log('response', response);
          count.value++;
            if (response.status==200 || response.status==201) {
                // OK
                console.log('OK WRITTEN!!!!!!');
            }
        });
  };

  onMounted(() => {
    socket.connect();

    // socket.disconnect();
    // socket.subscribe("welcome", (messages) => {
    //     console.log("Received messages:", messages);
    // });
  });


</script>

<template>
  <div class="greetings">
  
    <!-- <h1 class="green">{{ msg }}</h1>
    <h3>
      

      <p>Contador en: {{ count }}</p>
  <button type="button" @click="handlePlus">+</button>
  <button type="button" @click="handleMinus">-</button>
    </h3>
  </div>
  <br>
  <br>
  <div> -->

  </div>


</template>

<style scoped>
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
