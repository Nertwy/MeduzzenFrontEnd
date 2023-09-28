<script setup lang="ts">
import { MutationTypes, useStore } from "./store/store";
import LangSelect from "./components/LangSelect.vue";
import ModalWindow from "./components/ModalWindow.vue"
const store = useStore()

</script>

<template>
    <button @click="() => store.commit(MutationTypes.increment)">{{store.state.count}}</button>
    <ModalWindow />
    <LangSelect :items="['en', 'uk']" :default-selected-item="'en'" />
    <div>{{ $t("hello") }}</div>
    <router-view></router-view>
</template>

<style scoped></style>
