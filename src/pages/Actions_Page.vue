<template>
  <NavBar />
  <template v-if="pageData">
    <Basic_Table
      :keys="keys"
      :data="pageData.results"
      class="table table-zebra"
      :edit="null"
    >
      <template #th-slot>
        <th></th>
      </template>
      <template #td-slot="{ id, index }">
        <td v-if="Requests?.find((requests) => requests.company === id)">
          <Basic_button
            button-text="Cancel Request"
            class="btn btn-error"
            @click-func="handleCancel(id)"
          />
        </td>
        <td v-else>
          <Basic_button
            button-text="Request to join"
            class="btn btn-success"
            @click-func="handleClick(id)"
          />
        </td>
      </template>
    </Basic_Table>
    <Toast
      :alert-info-type="ToastInfo.alertInfoType"
      :is-showing="ToastInfo.isShowing"
      :text="text"
    />
  </template>
  <template v-else>
    <Spinner />
  </template>
</template>
<script setup lang="ts" generic="T">
import Spinner from "@/components/Spinner.vue";
import Basic_Table from "@/components/BasicTable/Basic_Table.vue";
import { Company, InvitationRequest, PageWith } from "@/types";
import { GetAllCompanies, getReqAxios, postReqAxios } from "@/utils/functions";
import { computed, onMounted, ref } from "vue";
import Toast from "@/components/Toast.vue";
import Basic_button from "@/components/buttons/Basic_button.vue";
import NavBar from "@/components/NavBar.vue";
type ToastInfo = {
  alertInfoType: boolean;
  isShowing: boolean;
};
type Invitation = {
  id?: number;
  company: number;
};
const keys = ref<string[]>([]);
const ToastInfo = ref<ToastInfo>({ isShowing: false, alertInfoType: true });
const pageData = ref<PageWith<Company> | null>(null);
const Requests = ref<Invitation[] | null>(null);
const text = ref("");
const triggerToast = (infoType: boolean) => {
  ToastInfo.value.isShowing = true;
  ToastInfo.value.alertInfoType = infoType;
  // Set a timeout to hide the toast window after 5 seconds.
  setTimeout(() => {
    ToastInfo.value.isShowing = false;
  }, 5000);
};
const handleClick = async (id?: number) => {
  if (!id) return;
  try {
    await postReqAxios(`api/companies/${id}/request_to_join/`, {});
    text.value = "Request send";
    Requests.value?.push({ company: id });

    triggerToast(true);
  } catch (error) {
    triggerToast(false);
    console.error(error);
  }
};
const handleCancel = async (id?: number) => {
  if (!id) return;
  try {
    await postReqAxios(`api/companies/${id}/cancel_join_request/`, {});
    text.value = "Request revoked";
    Requests.value =
      Requests.value?.filter((item) => item.company !== id) ?? null;
    triggerToast(true);
  } catch (error) {
    triggerToast(false);
    console.error(error);
  }
};
const fetch = async () => {
  const result = await GetAllCompanies();
  if (!result) return;
  pageData.value = result;
  if (result.results[0]) keys.value = Object.keys(result.results[0]);
  const token = localStorage.getItem("access");
  const pendingInvites = await getReqAxios(
    "api/companies/get_pending_join_requests/",
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  if (pendingInvites) Requests.value = pendingInvites;
};
onMounted(() => fetch());
</script>
