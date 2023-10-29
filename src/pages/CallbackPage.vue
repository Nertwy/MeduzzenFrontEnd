<template>
  <div class="">
    <NavBar></NavBar>
    <div class=""></div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { GoogleUser } from "@/types";
import { getGoogleUserInfo, googleGetToken } from "@/utils/functions";
import { onMounted } from "vue";
const getGoogleToken = async () => {
  try {
    const url = new URL(document.location.href);
    await googleGetToken(url);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getGoogleToken();
});
</script>
