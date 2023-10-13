<template>
  <section>
    <NavBar />
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <Basic_Table
        :keys="keys"
        :data="store.state.companyList"
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
              @submit-user="() => updateFunc(id ?? -1, handleDataRef)"
              @edit-click="() => handleEditClick(value.id)"
              @edit-cancel="() => handleEditClick(null)"
              :edit="edit === value.id"
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
                <Basic_button
                  :class="'btn-error'"
                  @click="() => deleteFunc(id, userPassword)"
                  >Delete</Basic_button
                >
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
import { onMounted, ref } from "vue";
import { Company, PageWith } from "@/types";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import Basic_Table from "@/components/BasicTable/Basic_Table.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import Edit_Input from "@/components/Inputs/Edit_Input.vue";
import Basic_button from "@/components/buttons/Basic_button.vue";

type TableCompany = {
  id: number;
  name: string;
  description: string;
  members: number;
  is_visible: boolean;
};
const userPassword = ref("");

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
const handleDataRef = ref<T>();
const handleEditClick = (id: number | null) => {
  const company = store.state.companyList.find((company) => company.id === id);

  handleDataRef.value = company as T;
  edit.value = id;
};
const updateFunc = async (id: number, data?: Partial<T>) => {
  try {
    const newCompany: Partial<Company> = {
      ...data,
    };
    await updateReqAxios("api/companies/", id, newCompany);
    await store.dispatch("updateCompanyFromList", newCompany);
    handleEditClick(null);
  } catch (error) {
    console.error(error);
  }
};
const deleteFunc = async (id: number | undefined, password: string) => {
  if (!id) return;
  console.log("Delete ");

  try {
    await deleteReqAxios(`api/companies/${id}`, {
      data: {
        current_password: password,
      },
    });
    await store.dispatch("removeCompanyFromList", id);
  } catch (error) {
    console.error(error);
  }
};

const fetch = async () => {
  try {
    const fetchedData = await GetAllCompanies<PageWith<Company>>();
    if (!fetchedData) throw new Error("No data");
    fetchedData?.results.forEach((company) => {
      store.commit("addCompanyToList", company as Company);
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
