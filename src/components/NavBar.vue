<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl"
        >{{ data?.email }} {{ data?.first_name }}</a
      >
    </div>
    <div class="flex-none gap-2">
      <BasicButton class="btn-ghost" @click="router.push('/Profile')">Home</BasicButton>
      <BasicButton class="btn-ghost" @click="LogoutUser">Logout</BasicButton>
    </div>
  </nav>
</template>
<script setup lang="ts">
import useStoreTyped from "@/store/store";
import { fetchUserInfo, logout } from "@/utils/functions";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import BasicButton from "./buttons/BasicButton.vue";
const store = useStoreTyped();
const router = useRouter();
const data = computed(() => store.state.user);
const fetchUser = async () => {
  try {
    const result = await fetchUserInfo();
    if (result) store.dispatch("setUser", result);
  } catch (error) {
    console.error(error);
  }
};

const LogoutUser = async () => {
  try {
    await logout();
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchUser();
});
</script>