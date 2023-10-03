<template>
    <section class="nav-bar__buttons">
        <header>
            <nav>
                Navbar
                {{ data?.email }} {{ data?.first_name }}
                <!-- <button @click="handleClick">Click me</button> -->
            </nav>
        </header>
    </section>
</template>
<script setup lang="ts">
import useStoreTyped from '@/store/store';
import { User } from '@/types';
import { ref, watch, onMounted, computed } from 'vue';
const store = useStoreTyped()
const data = computed(() => store.state.user)
</script>
<style lang="">
    
</style>