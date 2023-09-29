<template>
    <button class="button__login" @click="handleLogin">Log In</button>
</template>
  
<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect,getAccessTokenSilently } = useAuth0();

const handleLogin = () => {
    loginWithRedirect();
};
</script>