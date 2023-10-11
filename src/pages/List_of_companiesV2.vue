<template>
  <section>
    <NavBar />
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <Basic_Table
        :keys="keys"
        :data="pageData.results"
        class="table table-zebra"
        :td-layout="Edit_Input"
        v-model="handleDataRef"
        :edit="edit"
      >
        <template #th-slot>
          <th>Edit</th>
          <th>Delete</th>
        </template>
        <template #td-slot="{ id, index, value }">
          <td>
            <Edit_Button
              button-text="Edit"
              @edit-click="() => handleEditClick(index)"
              @edit-cancel="() => handleEditClick(null)"
              :edit="edit === index"
              :edit-function-submit="() => {}"
            />
          </td>
          <td>
            <ModalWindow
              :btn-open-text="'Delete'"
              :title="'Delete company?'"
              :text="'All data will be lost!'"
            >
              <div class="flex flex-col gap-2">
                <label for="confirm_pass_input"
                  >Write your password to confirm deletion</label
                >
                <BaseInput class="input input-accent" v-model="userPassword" />
                <Delete_Button
                  :delete-function="() => deleteFunc?.(id ?? -1, userPassword)"
                />
              </div>
            </ModalWindow>
          </td>
        </template>
      </Basic_Table>
      <!-- <Toast :alert-info-type="ToastInfo.alertInfoType" :is-showing="ToastInfo.isShowing" :text="text" /> -->
    </template>
  </section>
</template>
<script setup lang="ts" generic="T">
import Edit_Button from "@/components/buttons/Edit_Button.vue";
import Spinner from "@/components/Spinner.vue";
import NavBar from "@/components/NavBar.vue";
import {
  GetAllCompanies,
  deleteReqAxios,
  updateReqAxios,
} from "@/utils/functions";
import useStoreTyped from "@/store/store";
import { defineComponent, onMounted, ref, watch } from "vue";
import { Company, PageWith } from "@/types";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import Delete_Button from "@/components/buttons/Delete_Button.vue";
import Basic_Table from "@/components/BasicTable/Basic_Table.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import Edit_Input from "@/components/Inputs/Edit_Input.vue";

type TableCompany = {
  id: number;
  name: string;
  description: string;
  members: number;
  is_visible: boolean;
};
const userPassword = ref("");
const your_companies = ref(false);
const keys = ref<string[]>([]);
const store = useStoreTyped();
const isLoading = ref(true);
const pageData = ref<PageWith<Company>>({
  count: 0,
  next: null,
  results: [],
  previous: null,
});
const edit = ref<number | null>(null);
const handleDataRef = ref<Record<string, Company>>({});
const handleEditClick = (index: number | null) => {
  edit.value = index;
  console.log(edit.value);
};
const deleteFunc = async (id: number | undefined, password: string) => {
  if (!id) return;
  const result = await deleteReqAxios(`api/companies/${id}`, {
    data: {
      current_password: password,
    },
  });
  if (result) store.commit("removeUserFromList", id);
};

const fetch = async () => {
  const fetchedData = await GetAllCompanies();
  if (!fetchedData) return;
  fetchedData?.results.forEach((company) => {
    store.commit("addCompanyToList", company);
  });
  pageData.value = fetchedData;
  keys.value = Object.keys(fetchedData?.results[0]);
  isLoading.value = false;
};

watch(your_companies, (newValue) => {
  your_companies.value = newValue;
});
onMounted(() => {
  fetch();
});
</script>
