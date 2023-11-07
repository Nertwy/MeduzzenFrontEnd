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
const data = ref()
const ws = new WebSocket("ws://localhost:8000/notifications/");
onMounted(() => {
  ws.onopen = (event) => {
    ws.send("This is sending message");
  };
  ws.addEventListener("message", (event) => {
    console.log(event.target);
  });
  ws.onmessage = (event)=>{
    data.value = event.data
    console.log(event.data);
  }
});
const sendMessage = () => {
    console.log("click");
    
  ws.send("Test message");
};
</script>
