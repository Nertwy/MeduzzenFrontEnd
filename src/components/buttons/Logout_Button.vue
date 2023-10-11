<template>
  <button class="btn btn-ghost normal-case text-xl" @click="LogoutUser">
    Logout
  </button>
</template>
<script setup lang="ts">
import router from "@/router";
import { logout } from "@/utils/functions";
const LogoutUser = () => {
    logout()
    router.push("/Login")
}
</script>
