<script setup>
import { ref } from "vue"
import axios from "axios"
import { useAuth } from './../stores/auth'
import router from "./../router";

const form = ref ({
  username:"",
  email:"",
  password:"",
})

const auth = useAuth();

const message = ref ("")
const snackbar = ref(false)

const handleLogin = async (form) => {
  const decodedStringBtoA = `${form.email}:${form.password}:IKLAB005`
  const encodedStringBtoA = btoa(decodedStringBtoA)
  const payload = {
    auth: encodedStringBtoA,
    privilegesDetail:true,
  }
  await axios.post(`/api/login`,payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
  .then(res => {
    const token = {
      access_token : res.data.access_token,
      client : res.data.client_id,
      location : res.data.privileges.manual_counters[0].location_id,
      macaddress : res.data.privileges.manual_counters[0].mac_address,
      username: res.data.username,
      email: res.data.email
    }
    auth.setToken(JSON.stringify(token))
    message.value = ""
    snackbar.value = false
    router.push({ path: '/about', name: "about" })
  })
  .catch(err => {
    auth.setToken("")
    message.value = err.response.data.message
    snackbar.value = true
  })
  
}
</script>
<template>
  <v-card class="px-6 py-8 elevation-0" width="400" max-width="90vw">
    <v-text-field
      v-model="form.email"
      class="mb-2"
      clearable
      label="Email"
    ></v-text-field>
    <br>
    <v-text-field
    type="password"
      v-model="form.password"
      clearable
      label="Password"
      placeholder="Enter your password"
    ></v-text-field>
    <br>
    <v-btn
      v-if="!auth.token" 
      block
      color="success"
      size="large"
      type="submit"
      variant="elevated"
      @click="handleLogin(form)"
    >
      Login
    </v-btn>
    <br>
    <v-btn
      v-if="auth.token" 
      block
      variant="flat"
      size="large"
      type="submit"
      @click="auth.setToken('')"
    >
    Logout
    </v-btn>
    <div class="text-center">        
      <v-snackbar
        v-model="snackbar"
        vertical
      >
        <div class="text-subtitle-1 pb-2">Error</div>
    
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
  </v-card>
</template>
