<template>
    <NavBar />
    some text
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import NavBar from '../components/NavBar.vue';
import useStoreTyped from '../store/store';

const store = useStoreTyped()
console.log(store.state.user)
</script>
<style lang='scss'></style>