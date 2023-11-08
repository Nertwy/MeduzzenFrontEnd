<template>
  <section class="h-screen flex items-center justify-center">
    <form
      class="card w-1/4 bg-base-100 shadow-xl border-white bordered p-4 justify-between space-y-3"
    >
      <h1 class="text-white text-4xl self-center">Login</h1>
      <input
        class="input input-bordered"
        v-model="data.email"
        required
        placeholder="email"
      />
      <input
        class="input input-bordered"
        v-model="data.password"
        required
        placeholder="password"
      />
      <button class="btn btn-primary" @click.prevent="handleLogin">
        Login
      </button>
      <p>or</p>
      <GoogleButton />
      <button
        class="btn btn-link"
        type="button"
        @click="() => router.push('/Register')"
      >
        Register a new accout
      </button>
    </form>
  </section>
</template>
<script lang="ts" setup>
import useStoreTyped from "@/store/store";
import { Login} from "@/utils/functions";
import { ref } from "vue";
import { useRouter } from "vue-router";
import GoogleButton from "@/components/buttons/GoogleButton.vue";
const data = ref<{ email: string; password: string }>({
  password: "",
  email: "",
});
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
