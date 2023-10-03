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
    try {
        const token = await Login(data.value.email, data.value.password)
        if (!token.auth_token) throw new Error("No token in responce");
        localStorage.setItem('access', token.auth_token)

    } catch (error) {
        console.error(error);
    }
}
</script>
<style lang="">
    
</style>
