<template lang="html">
    <form class="card w-1/4 bg-base-100 shadow-xl border-white bordered p-4 justify-between space-y-3"
        @submit.prevent="handleSubmit">
        <h1 class="text-white text-4xl self-center">Register</h1>
        <InputWithValidation :regex="emailRegex" :type="'email'" v-model="data.email" placeholder="Enter your email"
            required class="input" />
        <InputWithValidation class="input input-bordered" v-model="data.password" placeholder="Enter your password" required
            type="password" :regex="passRegex"
            :label="'Password should contain  eight characters, at least one letter and one number'" />
        <InputWithValidation class="input input-bordered" v-model="data.re_password" placeholder="Confirm password" required
            type="password" :regex="passRegex" />
        <InputWithValidation class="input input-bordered" v-model="data.first_name" placeholder="Enter your first name"
            required :regex="dataRegex" />
        <InputWithValidation class="input input-bordered" v-model="data.last_name" placeholder="Enter your last name"
            required :regex="dataRegex" />
        <InputWithValidation class="input input-bordered" v-model="data.username" placeholder="Enter your last name"
            required :regex="dataRegex" />
        <button class="btn btn-accent" type="submit">Register!</button>
        <RouterLink to="/Login" class="btn btn-link">Have an account?</RouterLink>
        <slot></slot>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputWithValidation from '@/components/Inputs/InputWithValidation.vue';
import { register } from '../../utils/functions';
import { type RegisterUser } from "@/types"
const dataRegex = ref<RegExp>(/.{3,}/)
const emailRegex = ref<RegExp>(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const passRegex = ref<RegExp>(/^(?=.*[A-Za-z\d])(?=.*[\W_]).{8,}$/)
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
