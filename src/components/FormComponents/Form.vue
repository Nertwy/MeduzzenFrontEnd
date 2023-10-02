<template lang="html">
    <form>
        <InputWithValidation :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" :type="'email'" v-model="data.email"
            placeholder="Enter your email" required />
        <input v-model="data.password" placeholder="Enter your password" required type="password" />
        <input v-model="data.re_password" placeholder="Confirm password" required type="password" />
        <input v-model="data.first_name" placeholder="Enter your first name" required />
        <input v-model="data.last_name" placeholder="Enter your last name" required />
        <input v-model="data.username" placeholder="Enter your last name" required />
        <button type="submit" @click.stop.prevent="handleSubmit">Register!</button>
        <RouterLink to="/Auth">Have an account?</RouterLink>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputWithValidation from './InputWithValidation.vue';
import { register } from '../../utils/functions';
import { type RegisterUser } from "@/types"
const data = ref<RegisterUser>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    re_password: "",
    username: ""
})

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (data.value.password.localeCompare(data.value.re_password, undefined, { sensitivity: "case" }) !== 0) {
        console.error("Password isn`t confirmed ");
        return
    }

    await register(data.value)
    console.log("Registration Successful");

}
</script>
<style lang="">
    
</style>