<template>
  <nav class="navbar bg-base-100">
    <header>
      <a class="btn btn-ghost normal-case text-xl"
        >{{ data?.email }} {{ data?.first_name }}</a
      >
      <Logout_Button />
    </header>
  </nav>
</template>
<script setup lang="ts">
import useStoreTyped from "@/store/store";
import { User } from "@/types";
import { fetchUserInfo } from "@/utils/functions";
import { onMounted, computed } from "vue";
import Logout_Button from "./buttons/Logout_Button.vue";
const store = useStoreTyped();
const data = computed(() => store.state.user);
const fetchUser = async () => {
  try {
    const result = await fetchUserInfo();
    if (result) store.dispatch("setUser", result);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>
