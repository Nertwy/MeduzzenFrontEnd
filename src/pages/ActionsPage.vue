<template>
  <NavBar />
  <template v-if="loaded && pageData">
    <BasicTableWrapper
      :keys="keys"
      :data="pageData.results"
      class="table table-zebra"
      :edit="null"
    >
      <template #th-slot>
        <th>Join Group</th>
      </template>
      <template #td-slot="{ id, index, value }">
        <td v-if="Requests?.find((requests) => requests.company === id)">
          <BasicButton
            button-text="Cancel Request"
            class="btn btn-error"
            @click="handleCancel(id)"
            >Cancel request</BasicButton
          >
        </td>
        <td v-else-if="value.owner === store.state.user?.id">
          <UserInvitationWindow :company-id="value.id"></UserInvitationWindow>
        </td>
        <td v-else>
          <BasicButton
            button-text="Request to join"
            class="btn btn-success"
            @click="handleClick(id)"
            >Send Request</BasicButton
          >
        </td>
      </template>
    </BasicTableWrapper>
    <Toast
      ref="toastRef"
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
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import { Company, PageWith } from "@/types";
import { GetAllCompanies, getReqAxios, postReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import NavBar from "@/components/NavBar.vue";
import useStoreTyped from "@/store/store";
import UserInvitationWindow from "@/components/Actioncomponensts/UserInvitationWindow.vue";
import Toast from "@/components/Toast.vue";
type ToastInfo = {
  alertInfoType: boolean;
  isShowing: boolean;
};
type Invitation = {
  id?: number;
  company: number;
};

type CompanyWithMembers = Omit<Company, "members"> & { members: number };
const toastRef = ref<InstanceType<typeof Toast> | null>(null);

const keys = ref<string[]>([
  "id",
  "created at",
  "updated at",
  "name",
  "description",
  "is visible",
  "owner",
  "members",
]);
const store = useStoreTyped();
const ToastInfo = ref<ToastInfo>({ isShowing: false, alertInfoType: true });
const loaded = ref(false);

const pageData = ref<PageWith<CompanyWithMembers> | null>(null);
const Requests = ref<Invitation[] | null>(null);
const text = ref("");

const handleClick = async (id?: number) => {
  if (!id) return;
  try {
    await postReqAxios(`api/companies/${id}/request_to_join/`, {});
    text.value = "Request send";
    Requests.value?.push({ company: id });
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);

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
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);
    console.error(error);
  }
};

const fetch = async () => {
  try {
    const result = await GetAllCompanies<PageWith<Company>>();
    const modifiedResults = result.results.map((company) => ({
      ...company,
      members: company.members.length,
    }));
    pageData.value = { ...result, results: modifiedResults };
    const token = localStorage.getItem("accessToken");
    const pendingInvites = await getReqAxios<any>(
      "api/companies/get_pending_join_requests/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    Requests.value = pendingInvites;
    loaded.value = true;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetch();
});
</script>
