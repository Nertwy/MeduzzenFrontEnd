<template lang="">
  <section>
    <h1>this is About page</h1>
  </section>
</template>
<script lang="ts">
import { onMounted } from "vue";
import useStoreTyped from "../store/store";
import { deleteReqAxios, postReqAxios } from "@/utils/functions";
const handleChangePass = async (
  current_password: string,
  new_password: string
) => {
  try {
    await postReqAxios("api/auth/users/set_password/", {
      data: {
        current_password,
        new_password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const deleteUser = async (password: string) => {
  try {
    await deleteReqAxios("api/auth/users/me/", {
      data: {
        current_password: password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
