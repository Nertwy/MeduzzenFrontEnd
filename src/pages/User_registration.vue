<template>
    <section>
        page info
        <Form />
    </section>
</template>
<script setup lang='ts'>
import { useAuth0 } from '@auth0/auth0-vue';
import Form from '../components/FormComponents/Form.vue';
import { useRouter } from 'vue-router';
const { isAuthenticated } = useAuth0()
const router = useRouter()
// if (isAuthenticated.value) router.push('/')
</script>
<style lang='scss'></style>