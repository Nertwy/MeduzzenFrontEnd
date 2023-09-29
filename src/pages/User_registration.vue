<template >
    <section>
        <form @submit="handleSubmit">
            <InputWithValidation :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" :type="'email'" v-model="data.email"
                placeholder="Enter your email" />
            <input v-model="data.password" placeholder="Enter your password" />
            <input v-model="data.confirmPassword" placeholder="Confirm password" />
            <input v-model="data.userName" placeholder="Enter your User name" />
            <button type="submit">Register!</button>
            <Auth0 type="button"/>
        </form>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputWithValidation from '../components/InputWithValidation.vue';
import NavBar from '../components/NavBar.vue';
type Props = {
    email: string,
    password: string,
    userName: string,
    confirmPassword: string
}
const data = ref<Props>({
    email: "",
    password: "",
    userName: "",
    confirmPassword: ""
})

const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (data.value.password.localeCompare(data.value.confirmPassword, undefined, { sensitivity: "case" }) !== 0) {
        console.error("Password isn`t confirmed ");
        return
    }

    console.log("Registration Successful");

}
</script>
<style lang="">
    
</style>