<template>
  <form @submit.prevent="handleLogin">
    <InputWithValidation v-model="data.email" required placeholder="email" />
    <InputWithValidation
      v-model="data.password"
      required
      placeholder="password"
    />
    <button type="submit">Login</button>
  </form>
</template>
<script lang="ts" setup>
import InputWithValidation from "@/components/Inputs/InputWithValidation.vue";
import useStoreTyped from "@/store/store";
import { Login, fetchUserInfo } from "@/utils/functions";
import { ref } from "vue";
import { useRouter } from "vue-router";
type Props = {
  email: string;
  password: string;
};
const data = ref<Props>({ password: "", email: "" });
const store = useStoreTyped();
const router = useRouter();

const handleLogin = async () => {
  try {
    const result = await Login(data.value.email, data.value.password);
    store.commit("userLogin", result);
    router.replace("/");
  } catch (error) {
    console.error(error);
  }
};
</script>
