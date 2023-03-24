<template>
   <span> {{ connected ? 'Conectado' : 'Sin conexión' }}</span>
</template>
  
<script>
  import { state } from "@/socket";
  
  export default {
    name: "ConnectionState",
  
    computed: {
      connected() {
        return state.connected;
      }
    }
  }
</script>