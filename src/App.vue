<script setup lang="ts">
import { MutationTypes, useStore } from "./store/store";
import LangSelect from "./components/LangSelect.vue";
import ModalWindow from "./components/ModalWindow.vue"
import InputWithValidation from "./components/FormComponents/InputWithValidation.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
const store = useStore()
const { getAccessTokenSilently, user } = useAuth0()

</script>

<template>
    <NavBar />
    <router-view></router-view>
</template>

<style scoped></style>
