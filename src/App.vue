<script setup>
import { RouterView } from 'vue-router'
import { useAuth } from './stores/auth'

//<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

const auth = useAuth();

</script>
<template>
  <v-app app>
    <v-app-bar
      color="primary"
      density="compact"
      app
    >
      <v-app-bar-title>Contador Manual</v-app-bar-title>
      <v-spacer></v-spacer>
        <v-btn to="/">Login</v-btn>
        <v-btn v-if="auth.token" to="/about">CONTADOR</v-btn>
      
    </v-app-bar>
    <v-main app>
      <v-container class="d-flex justify-center align-center text-h5 fill-height" fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template> 

