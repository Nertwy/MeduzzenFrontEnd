<template>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="handleSignUp">Sign
        Up</button>
</template>
  
<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

const handleSignUp = () => {
    loginWithRedirect();
};
</script>