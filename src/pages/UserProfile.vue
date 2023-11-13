<template>
  <NavBar />
  <div class="flex h-screen">
    <CompanyView />
    <div class="divider divider-horizontal"></div>
    <div class="flex w-1/2 flex-col items-center">
      <h1 class="text-2xl p-4">Your companies!</h1>
      <BasicTableWrapper
        :data="companiesYourIn"
        :keys="companyKeys"
        :exclude-strings="companyExcludeKeys"
        class="table table-zebra"
      >
        <CompanyView />
        <template #td-slot="{ id }">
          <td>
            <ModalWindow
              :btn-open-text="'leave company'"
              :title="'Leave company?'"
              :text="'If you leave the company you will need to get a new invitation from the owner'"
            >
              <BasicButton class="btn-error" @click="leaveCompany(id)">
                Leave company
              </BasicButton>
            </ModalWindow>
          </td>
          <td>
            <ModalWindow :btn-open-text="'create Quiz'" :title="'Create Quiz'">
              <QuizForm :company-id="id" />
            </ModalWindow>
          </td>
          <td>
            <BasicButton
              class="btn-link"
              @click="router.push(`/Company_profile/${id}/`)"
              >View Company</BasicButton
            >
          </td>
        </template>
      </BasicTableWrapper>
      <div class="rating">
        <label v-if="user?.avarage_score"
          >You got {{ user.avarage_score.toFixed(4) }}&nbsp;</label
        >
        <BaseInput
          type="radio"
          name="rating-1"
          class="mask mask-star-2 bg-orange-400"
        />
        Score
      </div>
      <SelectedUserChart :user_id="user.id" v-if="user?.id" />
      <ModalWindow
        :btn-open-text="'Delete profile'"
        :title="'Delete profile?'"
        :text="'This will erase all your information!'"
        ><div class="flex flex-col">
          <BaseInput
            label="Write password for confirmation"
            class="input input-bordered"
            v-model="confirmationPass"
          />
          <BasicButton
            class="btn-error"
            @click="handleDeleteUser(confirmationPass)"
            >Delete profile!</BasicButton
          >
        </div>
      </ModalWindow>
    </div>
  </div>
</template>
<script setup lang="ts">
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import NavBar from "@/components/NavBar.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import CompanyView from "@/components/ProfilePageComponent/CompanyView.vue";
import { User } from "@/types";
import { deleteReqAxios, getReqAxios, postReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
import QuizForm from "@/components/FormComponents/QuizForm.vue";
import { useRouter } from "vue-router";
import SelectedUserChart from "@/components/Charts/SelectedUserChart.vue";
import BaseInput from "@/components/Inputs/BaseInput.vue";

const companyKeys = ["company name", "company description", "leave company"];
const companyExcludeKeys: (string | number | symbol)[] = [
  "id",
  "created_at",
  "updated_at",
  "is_owner",
  "is_admin",
];

const confirmationPass = ref<string>("");
const router = useRouter();

const companiesYourIn = ref<any[]>([]);
const user = ref<User | null>(null);

const leaveCompany = async (company_id?: number) => {
  try {
    if (!company_id) return;
    await postReqAxios(`api/companies/${company_id}/leave_company/`, {});
  } catch (error) {
    console.error(error);
  }
};

const fetchCompaniesYourIn = async () => {
  try {
    const result = await getReqAxios<any[]>("api/companies/get_my_companies/");

    companiesYourIn.value = result;
  } catch (error) {
    console.error(error);
  }
};
const fetchAvgScore = async () => {
  try {
    const result = await getReqAxios<User>("api/users/me/");
    if (result) user.value = result;
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteUser = async (current_password: string) => {
  try {
    await deleteReqAxios(`api/auth/users/me/`, {
      data: {
        current_password,
      },
    });
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchCompaniesYourIn();
  fetchAvgScore();
});
</script>
