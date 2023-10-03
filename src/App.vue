<script setup lang="ts">
import LangSelect from "./components/LangSelect.vue";
import ModalWindow from "./components/ModalWindow.vue"
</script>

<template>
    <ModalWindow />
    <LangSelect :items="['en','uk']" :default-selected-item="'en'"/>
    <div>{{ $t("hello") }}</div>
    <router-view></router-view>
</template>

<style scoped></style>
