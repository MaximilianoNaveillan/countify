<template>
  <div class="text-center">
    <v-progress-circular
    :color="value.color"
    :model-value="value.number"
    :size="260"
    :width="40"
    >
    <div class="d-flex text-center">
      ocupación<br>
      {{isNaN(value.number) ? 0 : value.number }}%
    </div>
    </v-progress-circular>
  </div>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="primary"
      text-color="white"
    >
    {{ counting }} actual
    </v-chip>
    <v-chip
      class="ma-2"
      color="primary"
      text-color="white"
    >
    {{ capacity }} permitidas
    </v-chip>
  </div>
    
</template>
  
<script>
  import { state } from "@/socket";
  
  export default {
    name: "CountingState",
    computed: {
      counting() {
        return state.counting;
      },
      capacity() {
        return state.capacity;
      },
      value() {
        const number = Number.parseFloat(( state.counting / state.capacity ) * 100).toFixed(0)
        if(number < 30) return {color:'deep-purple-lighten-2',number}
        if(number < 50) return {color:'deep-purple',number}
        if(number < 80) return {color:'orange-lighten-2',number}
        if(number < 90) return {color:'deep-orange-darken-1',number}
        if(number < 95) return {color:'deep-orange-darken-4',number}
        return {color:'deep-orange-darken-4',number}
      }
    }
  }
</script>