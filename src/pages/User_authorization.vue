<template lang="html">
    <form>
        <input v-model="data.email" required placeholder="email" />
        <input v-model="data.password" required placeholder="password" />
        <button @click.prevent="handleLogin">Login</button>
    </form>
</template>
<script lang="ts" setup>
import InputWithValidation from '@/components/FormComponents/InputWithValidation.vue';
import useStoreTyped from '@/store/store';
import { Login, fetchUserInfo } from '@/utils/functions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const data = ref<{ email: string, password: string }>({ password: "", email: "" })
const store = useStoreTyped()
const router = useRouter()
const handleLogin = async () => {
    try {
        const token = await Login(data.value.email, data.value.password)
        if (!token.auth_token) throw new Error("No token in responce");
        localStorage.setItem('access', token.auth_token)
        const userInfo = await fetchUserInfo()
        if (!userInfo) throw new Error("No user info was provided!");
        store.commit('userLogin', userInfo)
        router.replace('/')
    } catch (error) {
        console.error(error);
    }
}
</script>
<style lang="">
    
</style>
