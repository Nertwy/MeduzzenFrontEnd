<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl"
        >{{ data?.email }} {{ data?.first_name }}</a
      >
    </div>
    <div class="flex-none gap-2">
      <router-link to="/">
        <BasicButton class="btn-ghost">{{ $t("NavBar.Home") }}</BasicButton>
      </router-link>
      <BasicButton class="btn-ghost" @click="LogoutUser">{{
        $t("NavBar.Logout")
      }}</BasicButton>

      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <img
            class="rounded-full w-10"
            :src="data?.image_path ? data?.image_path : defaultProfileImage"
          />
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <router-link class="justify-between" to="/Profile">
              {{ $t("NavBar.Profile") }}
              <span class="badge">New</span>
            </router-link>
          </li>
          <li>
            <a>{{ $t("NavBar.Settings") }}</a>
          </li>
          <li>
            <router-link to="/Stats">{{ $t("NavBar.Stats") }}</router-link>
          </li>
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
import LangSelect from "./LangSelect.vue";

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
