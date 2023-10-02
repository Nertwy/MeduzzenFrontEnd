<template>
    <div class="">
        <nav>Navigation Bar</nav>
        <div class="">
            <button @click="handleFetchToken">Fetch Token</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { googleGetToken } from '@/utils/functions';
const handleFetchToken = async () => {
    const url = new URL("http://localhost:3000/callback/?state=nRo5WeMdGL1d16Ovub65wzw7c3w9vNjt&code=4%2F0AfJohXnnJINRsRFKD35bVVqZzp58jhEfoZ1FpQHw8q4HTYLiiT1MfZFK35cQgCvYCROR5g&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent");

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const scope = url.searchParams.get("scope");
    const authuser = url.searchParams.get("authuser");
    const prompt = url.searchParams.get("prompt");
    console.log(code, state);
    if (code && state && scope && authuser && prompt)
        await googleGetToken(state,code, scope, authuser, prompt)
}

</script>