<template>
  <div class="">
    <nav>Navigation Bar</nav>
    <div class=""></div>
  </div>
</template>

<script setup lang="ts">
import { googleGetToken } from "@/utils/functions";
import { onMounted } from "vue";
onMounted(() => {
  const url = new URL(document.location.href);
  googleGetToken(url).then((val) => {
    if (val) {
      localStorage.setItem("accessToken", val.accessToken);
    } else {
      console.error("No tokens where given from server");
    }
  });
});
</script>
