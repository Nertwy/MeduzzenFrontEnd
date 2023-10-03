<template>
    <button @click="LogoutUser"></button>
</template>
<script setup lang='ts'>
import router from '@/router';
import { logout } from '@/utils/functions';
const LogoutUser = () => {
    logout()
    router.push("/login")
}
</script>
<style lang='scss'></style>