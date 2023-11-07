<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl"
        >{{ data?.email }} {{ data?.first_name }}</a
      >
    </div>
    <div class="flex-none gap-2">
      <BasicButton class="btn-ghost" @click="router.push('/Profile')"
        >Home</BasicButton
      >
      <BasicButton class="btn-ghost" @click="LogoutUser">Logout</BasicButton>

      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <img
            class="rounded-full w-10"
            :src="data?.image_path ? data?.image_path : defaultProfileImage"
            @click=""
          />
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between" @click="router.push('/Profile')">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a @click="router.push('/Stats')">Stats</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import useStoreTyped from "@/store/store";
import { fetchUserInfo, logout } from "@/utils/functions";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import BasicButton from "./buttons/BasicButton.vue";
import defaultProfileImage from "@/assets/Default.png";
import ModalWindow from "./ModalWindow.vue";
import CompanyForm from "./FormComponents/CompanyForm.vue";
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
    localStorage.clear();
    router.push("/login");
    store.dispatch("userLogout");
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchUser();
});
</script>
