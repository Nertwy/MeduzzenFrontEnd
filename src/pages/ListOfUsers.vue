<template>
  <section>
    <NavBar />
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <Basic_Table
        :keys="keys"
        :data="store.state.usersList"
        class="table table-zebra"
        :td-layout="Edit_Input"
        v-model="handleDataRef"
        :edit="edit"
      >
        <template #th-slot>
          <th>Edit</th>
          <th>Delete</th>
          <th>Password change</th>
        </template>
        <template #td-slot="{ id, index, value }">
          <td>
            <Edit_Button
              button-text="Edit"
              @submit-user="() => updateFunc(id ?? -1, handleDataRef)"
              @edit-click="() => handleEditClick(index)"
              @edit-cancel="() => handleEditClick(null)"
              :edit="edit === index"
              :edit-function-submit="() => {}"
            />
          </td>
          <td>
            <template v-if="id === store.state.user?.id">
              <ModalWindow
                :btn-open-text="'Delete'"
                :title="'Delete company?'"
                :text="'All data will be lost!'"
              >
                <div class="flex flex-col gap-2">
                  <label for="confirm_pass_input"
                    >Write your password to confirm deletion</label
                  >
                  <BaseInput
                    class="input input-accent"
                    v-model="userPassword"
                  />
                  <Basic_button
                    :class="'btn-error'"
                    @click="() => deleteFunc(id, userPassword)"
                    >Delete</Basic_button
                  >
                </div>
              </ModalWindow>
            </template>
          </td>
          <td>
            <template v-if="id === store.state.user?.id">
              <ModalWindow
                :btn-open-text="'Reset Password'"
                :title="'Reseting a password...'"
                :text="'Confirm your old password to reset'"
              >
                <div class="flex flex-col gap-2">
                  <InputWithValidation
                    :regex="/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"
                    placeholder="Existing password"
                    type="password"
                    class="input input-accent"
                    v-model="resetPassword.current_password"
                  />
                  <InputWithValidation
                    :label="'Password should match a sequence of 8 or more letters and numbers'"
                    :regex="/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"
                    placeholder="new password"
                    type="password"
                    class="input input-accent"
                    v-model="resetPassword.new_password"
                  />
                  <InputWithValidation
                    :regex="/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"
                    placeholder="confirm new password"
                    type="password"
                    class="input input-accent"
                    v-model="resetPassword.re_new_password"
                  />
                  <Basic_button
                    :class="'btn-error'"
                    @click="setPassword(resetPassword)"
                    >Delete</Basic_button
                  >
                </div>
              </ModalWindow>
            </template>
          </td>
        </template>
      </Basic_Table>
      <!-- <Toast :alert-info-type="ToastInfo.alertInfoType" :is-showing="ToastInfo.isShowing" :text="text" /> -->
    </template>
  </section>
</template>
<script setup lang="ts" generic="T">
import Edit_Button from "@/components/buttons/EditButton.vue";
import Spinner from "@/components/Spinner.vue";
import NavBar from "@/components/NavBar.vue";
import {
  GetAllUsers,
  deleteReqAxios,
  postReqAxios,
  updateReqAxios,
} from "@/utils/functions";
import useStoreTyped from "@/store/store";
import { onMounted, ref } from "vue";
import { Company, PageWith, ResetPassword, User } from "@/types";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import Basic_Table from "@/components/BasicTable/BasicTableWrapper.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import Edit_Input from "@/components/Inputs/EditInput.vue";
import Basic_button from "@/components/buttons/BasicButton.vue";
import InputWithValidation from "@/components/Inputs/InputWithValidation.vue";

const store = useStoreTyped();
const userPassword = ref("");
const resetPassword = ref<ResetPassword>({
  current_password: "",
  new_password: "",
  re_new_password: "",
});
const keys = ref<string[]>([]);
const isLoading = ref(true);
const pageData = ref<PageWith<User>>({
  count: 0,
  next: null,
  results: [],
  previous: null,
});
const edit = ref<number | null>(null);
const handleDataRef = ref<T>();
const handleEditClick = (index: number | null) => {
  if (index === null) {
    edit.value = null;
    return;
  }
  const user = store.state.usersList[index];

  handleDataRef.value = user as T;
  edit.value = index;
};
const updateFunc = async (id: number, data?: Partial<T>) => {
  try {
    const newUser: Partial<User> = {
      ...data,
    };
    await updateReqAxios("api/users/", id, newUser);
    await store.dispatch("updateUserFromList", newUser);
    handleEditClick(null);
  } catch (error) {
    console.error(error);
  }
};
const deleteFunc = async (id: number | undefined, password: string) => {
  if (!id) return;
  try {
    await deleteReqAxios(`api/users/me/`, {
      data: {
        current_password: password,
      },
    });
    await store.dispatch("removeUserFromList", id);
  } catch (error) {
    console.error(error);
  }
};
const setPassword = async (resetPassword: ResetPassword) => {
  try {
    if (
      resetPassword.new_password.toLowerCase() !==
      resetPassword.re_new_password.toLowerCase()
    )
      throw new Error("Password is incorrect!");

    postReqAxios("api/auth/users/set_password/", {
      data: {
        ...resetPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const fetch = async () => {
  try {
    const fetchedData = await GetAllUsers();
    fetchedData.results.forEach((company) => {
      store.commit("addUserToList", company as User);
    });
    pageData.value = fetchedData;
    keys.value = Object.keys(fetchedData.results[0]);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetch();
});
</script>
