<template lang="html">
    <form class="card w-1/4 bg-base-100 shadow-xl border-white bordered p-4 justify-between space-y-3">
        <h1 class="text-white text-4xl self-center">Register</h1>
        <InputWithValidation :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" :type="'email'" v-model="data.email"
            placeholder="Enter your email" required />
        <input class="input input-bordered" v-model="data.password" placeholder="Enter your password" required type="password" />
        <input class="input input-bordered" v-model="data.re_password" placeholder="Confirm password" required type="password" />
        <input class="input input-bordered" v-model="data.first_name" placeholder="Enter your first name" required />
        <input class="input input-bordered" v-model="data.last_name" placeholder="Enter your last name" required />
        <input class="input input-bordered" v-model="data.username" placeholder="Enter your last name" required />
        <button class="btn btn-accent" type="submit" @click.stop.prevent="handleSubmit">Register!</button>
        <RouterLink to="/Auth" class="btn btn-link">Have an account?</RouterLink>
        <slot></slot>
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