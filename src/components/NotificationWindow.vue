<template>
  {{ data }}
  <!-- <BasicTableWrapper></BasicTableWrapper> -->
  <button @click="sendMessage">Send message</button>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import BasicTableWrapper from "./BasicTable/BasicTableWrapper.vue";
import { getReqAxios } from "@/utils/functions";
import { onMounted } from "vue";
const data = ref();

const ws = new WebSocket(
  `ws://${import.meta.env.VITE_BACKEND_HOST}notifications/`
);

onMounted(() => {
  ws.onopen = (event) => {
    const accessToken = localStorage.getItem("accessToken");
    ws.send(JSON.stringify(accessToken));
  };
  ws.onmessage = (event) => {
    const notificationData = JSON.parse(event.data);
    console.log(notificationData);
  };

  ws.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  ws.onerror = (event) => {
    console.error("WebSocket error:", event);
  };
});
const sendMessage = () => {
  const message = {
    text: "Hello, server!",
  };
  ws.send("asd");
};
</script>
