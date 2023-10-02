<template lang="html">
    <form>
        <input v-model="data.email" required placeholder="email" />
        <input v-model="data.password" required placeholder="password" />
        <button @click.prevent="handleLogin">Login</button>
    </form>
</template>
<script lang="ts" setup>
import InputWithValidation from '@/components/FormComponents/InputWithValidation.vue';
import { Login } from '@/utils/functions';
import { ref } from 'vue';
const data = ref<{ email: string, password: string }>({ password: "", email: "" })
const handleLogin = async () => {
    const token = await Login(data.value.email, data.value.password)
    console.log(token);

    if (token.auth_token) {
        localStorage.setItem('access', token.auth_token)
    }
    return
}
</script>
<style lang="">
    
</style>
