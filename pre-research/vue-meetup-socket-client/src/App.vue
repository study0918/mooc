<template>
  <div id="root">
    <Sidebar :users="state.users" />
    <Chat
      :messages="state.messages"
      @message="message"
      :loggedIn="state.loggedIn"
    />
    <LoginModal v-if="!state.loggedIn" @login="login" />
  </div>
</template>

<script setup>
import { reactive } from "vue";

import Chat from "./components/Chat.vue";
import LoginModal from "./components/LoginModal.vue";
import Sidebar from "./components/Sidebar.vue";

import { getRandomColor } from "./utils/colors";

const SOCKET_ENDPOINT = "https://9ufpt.sse.codesandbox.io";
const socket = io(SOCKET_ENDPOINT);

socket.on("chat message", (msg) => {
  state.messages.push(msg);
});

const state = reactive({
  loggedIn: false,
  user: null,
  messages: [],
  users: [],
});

socket.on("user list updated", (users) => {
  state.users = users;
});

// Note: get user from previous session if available
const USER_STORAGE_KEY = "dvm:user";
const storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

if (storedUser) login(storedUser);

function login(user) {
  if (!user.color) user.color = getRandomColor();
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  socket.emit("login", user);
  state.loggedIn = true;
  state.user = user;
}

function message(message) {
  socket.emit("chat message", {
    name: `${state.user.firstName} ${state.user.lastName}`,
    nameColor: state.user.color,
    time: new Date(),
    text: message,
  });
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

#root {
  @apply bg-gray-800 h-screen text-white flex flex-row;
}
</style>
