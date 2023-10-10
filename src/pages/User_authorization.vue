<template lang="html">
    <form @submit.prevent="handleLogin">
        <InputWithValidation v-model="data.email" required placeholder="email" />
        <InputWithValidation v-model="data.password" required placeholder="password" />
        <button type="submit">Login</button>
    </form>
</template>
<script lang="ts" setup>

import InputWithValidation from '@/components/Inputs/InputWithValidation.vue';
import useStoreTyped from '@/store/store';
import { User } from '@/types';
import { Login, fetchUserInfo } from '@/utils/functions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
type Props = {
    email: string,
    password: string
}
const data = ref<Props>({ password: "", email: "" })
const store = useStoreTyped()
const router = useRouter()

function isAUser(value: unknown): value is User {
    return typeof value === "object" && "first_name" in value! && "last_name" in value && "email" in value;
}
const handleLogin = async () => {
    try {
        const result = await Login(data.value.email, data.value.password)
        if (isAUser(result)) {
            store.commit('userLogin', result)
            router.replace('/')
        }
    } catch (error) {
        console.error(error);
    }
}
</script>
