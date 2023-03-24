<script setup>
import { ref } from "vue"
import { useAuth } from './../stores/auth';
import ConnectionState from '../components/ConnectionState.vue'
import ConnectionManager from '../components/ConnectionManager.vue'
import CountingState from '../components/CountingState.vue'

import axios from 'axios'

const auth = useAuth();
const disabled = ref (false)
const message = ref ("")
const snackbar = ref (false)

const handleIncrement = async (t,type) => {
  disabled.value = true
  const token = JSON.parse(t);
  const body ={
    type: `${type}`,
    quantity: 1,
    client: token.client,
    location: token.location,
    macaddress: token.macaddress,
    username: token.username,
    email: token.email,
  }
    await axios
      .post(`/ikcount/api/livecommand?atoken=${token.access_token}`, body, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((res) => {
        disabled.value = false
        message.value = res.data.mssg
        snackbar.value = true
      })
      .catch((err) => {
        disabled.value = false
        message.value = err.response.data.message
        snackbar.value = true
      });
}
</script>
<template>
  <div >
    <v-card min-width="25vw" max-width="95vw" elevation="3" class="bg-indigo-lighten-5">
      <v-card-title class="">TIENDA DEMO</v-card-title>
      <v-card-subtitle class="pb-3 text-right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              <ConnectionState />
            </v-btn>
          </template>
          <ConnectionManager />
        </v-menu>  
      </v-card-subtitle>
      <v-card-text class="bg-white py-12">
        <CountingState />
      </v-card-text>  
      <v-card-actions>
        <v-row>
          <v-col>
            <div>
              <v-btn
                color="primary"
                prepend-icon="mdi-open-in-app"
                @click="handleIncrement(auth.token,'manual-add')"
                width="120"
                :disabled="disabled"
              >
                agregar
              </v-btn>
            </div>
          </v-col>    
          <v-col class="text-right">
            <div>
              <v-btn
              color="deep-orange-darken-4"
                append-icon="mdi-application-export"
                @click="handleIncrement(auth.token,'manual-sub')"
                width="120"
                :disabled="disabled"
              >
                restar
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    
    

    <v-snackbar
      v-model="snackbar"
      vertical
    >
  
      <p>{{ message }}</p>
  
      <template v-slot:actions>
        <v-btn
          color="warning"
          variant="text"
          @click="snackbar = false"
        >
          CERRAR
        </v-btn>
      </template>
    </v-snackbar>
    
  </div>
</template>


