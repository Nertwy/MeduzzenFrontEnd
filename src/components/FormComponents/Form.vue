<template lang="html">
    <form>
        <InputWithValidation :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" :type="'email'" v-model="data.email"
            placeholder="Enter your email" required />
        <input v-model="data.password" placeholder="Enter your password" required />
        <input v-model="data.re_password" placeholder="Confirm password" required />
        <input v-model="data.username" placeholder="Enter your User name" required />
        <button type="submit" @click.stop.prevent="handleSubmit">Register!</button>
        <Auth0 type="button" />
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputWithValidation from './InputWithValidation.vue';
// import { RegisterUser } from '@/types';
import { register } from '../../utils/functions';
type RegisterUser = {
    username: string;
    password: string;
    re_password: string;
    email: string;
}
const data = ref<RegisterUser>({
    email: "",
    password: "",
    username: "",
    re_password: ""
})

const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (data.value.password.localeCompare(data.value.re_password, undefined, { sensitivity: "case" }) !== 0) {
        console.error("Password isn`t confirmed ");
        return
    }

    register(data.value)
    console.log("Registration Successful");

}
</script>
<style lang="">
    
</style>