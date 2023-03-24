
<template>
  <v-list>
    <v-list-item @click="connect()">
      <v-list-item-title>Connectar</v-list-item-title>
    </v-list-item>
    <v-list-item @click="disconnect()">
      <v-list-item-title>Desconectar</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
  
<script>
 import { socket } from "@/socket";
  
 export default {
   name: "ConnectionManager",
 
   methods: {
     connect() {
       socket.connect();
     },
     disconnect() {
       socket.disconnect();
     }
   }
 }
</script>