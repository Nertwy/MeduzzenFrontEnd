<template>
    <div class="nav-bar__buttons">
        <template v-if="!isAuthenticated">
            <Sign_Up_Button />
            <Log_In_Button />
        </template>
        <template v-if="isAuthenticated">
            <Log_Out_Button />
        </template>
    </div>
</template>
<script setup lang="ts">
import Log_Out_Button from './buttons/Log_Out_Button.vue';
import Log_In_Button from './buttons/Log_In_Button.vue'
import Sign_Up_Button from './buttons/Sign_Up_Button.vue';
import { useAuth0 } from '@auth0/auth0-vue'
const { isAuthenticated } = useAuth0()
</script>
<style lang="">
    
</style>