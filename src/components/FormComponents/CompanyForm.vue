<template>
  <ModalWindow>
    <h1 class="text-4xl text-white mb-6">Create Company</h1>
    <form class="flex flex-col">
      <BaseInput
        type="text"
        placeholder="Company Name"
        class="input input-bordered"
        :label="'Company name'"
        v-model:model-value="companyModalData.name"
        required
      />
      <BaseInput
        type="text"
        placeholder="description"
        class="input input-bordered"
        :label="'Company description'"
        v-model:model-value="companyModalData.description"
        required
      />
      <BaseInput
        type="checkbox"
        placeholder="visibility"
        :label="'Is company visible to others?'"
        class="checkbox"
        v-model:model-value="companyModalData.is_visible"
      />
      <button
        class="btn btn-accent w-1/2 self-center"
        @click.prevent="handleSubmitCompany"
        type="submit"
      >
        Create
      </button>
    </form>
  </ModalWindow>
  <Toast :text="'Company created successfully!'" :is-showing="showToast" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import ModalWindow from "../ModalWindow.vue";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import { postReqAxios } from "@/utils/functions";
import { Company } from "@/types";
import Toast from "../Toast.vue";
import useStoreTyped from "@/store/store";
const showToast = ref(false);
const store = useStoreTyped();
const companyModalData = ref<Omit<Company, "members" | "id" | "owner">>({
  name: "",
  description: "",
  is_visible: false,
});
const handleSubmitCompany = async () => {
  const owner_id = store.state.user?.id;

  const result = await postReqAxios("api/companies/", {
    data: {
      ...companyModalData.value,
      owner: owner_id,
    },
  });
  if (result) {
    showToast.value = true;
  }
};
</script>
<style lang="scss"></style>
