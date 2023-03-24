import { reactive } from "vue";
import { io } from "socket.io-client";
import { useAuth } from "./stores/auth";

const auth = useAuth();
const token = JSON.parse(auth.token);

export const state = reactive({
  connected: false,
  counting: 0,
  capacity: 0,
  fooEvents: [],
  barEvents: [],
});

const URL = `https://ikcount.com/live?atoken=${token.access_token}`;

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("welcome", (...args) => {
  state.counting = args[0].current_aforo;
  state.capacity = args[0].max_capacity;
});

socket.on("raw", (...args) => {
  state.counting = args[0].current_aforo;
});
