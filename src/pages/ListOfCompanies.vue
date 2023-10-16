<template>
  <section>
    <NavBar />
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <BasicTableWrapper
        :keys="keys"
        :data="store.state.companyList"
        class="table table-zebra"
        :td-layout="EditInput"
        v-model="handleDataRef"
        :edit="edit"
        :exclude-id="true"
      >
        <template #th-slot>
          <th>Edit</th>
          <th>Delete</th>
        </template>
        <template #td-slot="{ id, index, value }">
          <td>
            <EditButton
              button-text="Edit"
              @submit-user="() => updateFunc(id ?? -1, handleDataRef)"
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
                <BasicButton
                  :class="'btn-error'"
                  @click="() => deleteFunc(id, userPassword)"
                  >Delete</BasicButton
                >
              </div>
            </ModalWindow>
          </td>
        </template>
      </BasicTableWrapper>
      <!-- <Toast :alert-info-type="ToastInfo.alertInfoType" :is-showing="ToastInfo.isShowing" :text="text" /> -->
    </template>
  </section>
</template>
<script setup lang="ts" generic="T">
import EditButton from "@/components/buttons/EditButton.vue";
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
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import EditInput from "@/components/Inputs/EditInput.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";

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
const handleEditClick = (index: number | null) => {
  if (index === null) {
    edit.value = null;
    return;
  }
  const company = store.state.companyList[index];

  handleDataRef.value = company as T;
  edit.value = index;
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
