<script setup lang="ts">
import ModalWindow from "./components/ModalWindow.vue"
</script>

<template>
    <ModalWindow />
    <div>{{ $t("hello") }}</div>
    <router-view></router-view>
</template>

<style scoped></style>
