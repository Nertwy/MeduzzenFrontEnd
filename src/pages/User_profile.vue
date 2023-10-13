<template>
  <NavBar />
  <template v-if="companies.length !== 0">
    <div class="flex h-screen">
      <div class="flex justify-center w-1/2">
        <Basic_select :data="companies" :key-to-show="'name'" :default-text="'Pick your company to view'"/>
      </div>
      <div class="flex justify-center w-1/2">
        <!-- <Basic_select :data="companies" :key-to-show="'name'" :default-text="'Pick your company to view'"/> -->
      </div>
    </div>
  </template>
  <template v-else>
    <Spinner />
  </template>
</template>
<script setup lang="ts">
import Basic_select from "@/components/Basic_select.vue";
import NavBar from "@/components/NavBar.vue";
import Spinner from "@/components/Spinner.vue";
import { Company } from "@/types";
import { getReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
const companies = ref<Company[]>([]);
const fetchYourCompanies = async () => {
  try {
    const result = await getReqAxios<Company[]>(
      "api/companies/owned_companies/"
    );
    companies.value = result;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchYourCompanies();
});
</script>
