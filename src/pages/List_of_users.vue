<template>
  <section>
    <NavBar />
    <template v-if="isLoading">
      <Spinner />
    </template>
    <Table_With_Pagination
      :delete-func="deleteUser"
      :update-func="updateUser"
      :data="userList"
      :page-change-func="handlePageChange"
      :page-data="pageData"
      :pages="pages"
    />
  </section>
</template>
<script setup lang="ts">
import { PageWith, User } from "./../types";
import { GetAllUsers, deleteReqAxios, updateReqAxios } from "@/utils/functions";
import { computed, onMounted, ref } from "vue";
import Spinner from "@/components/Spinner.vue";
import useStoreTyped from "@/store/store";
import Table_With_Pagination from "@/components/Table_With_Pagination.vue";
import NavBar from "@/components/NavBar.vue";
const store = useStoreTyped();
const isLoading = ref(true);
const pageData = ref<PageWith<User>>({
  count: 0,
  next: null,
  results: [],
  previous: null,
});
const userList = computed(() => store.state.usersList);
const pages = ref(1);
const handlePageChange = async (page: number) => {
  const fetchedData = await GetAllUsers(page);
  if (fetchedData) {
    await store.dispatch("changeUserList", fetchedData.results);
  }
};
const deleteUser = async (id: number | undefined, password: string) => {
  if (!id) return;
  const result = await deleteReqAxios("api/auth/users/me/", {
    data: {
      current_password: password,
    },
  });
  if (result) store.commit("removeUserFromList", id);
};
const updateUser = async (user: User) => {
  const result = await updateReqAxios("api/users/", user.id ?? -1, user);
  if (result) await store.dispatch("updateUserFromList", user);
};

const fetch = async () => {
  try {
    const fetchedData = await GetAllUsers();
    fetchedData?.results.forEach((user) => {
      store.commit("addUserToList", user);
    });
    isLoading.value = false;
    pageData.value = fetchedData;
    pages.value = Math.ceil(
      pageData.value.count / pageData.value.results.length
    );
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetch();
});
</script>
