<template>
  <NavBar />
  <template v-if="loaded && pageData">
    <Basic_Table
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
          <Basic_button
            button-text="Cancel Request"
            class="btn btn-error"
            @click="handleCancel(id)"
            >Cancel request</Basic_button
          >
        </td>
        <td v-else-if="value.owner === store.state.user?.id">
          <ModalWindow :btn-open-text="'Invite Users'">
            <Basic_Table
              :keys="['id', 'name', 'last name']"
              :data="usersPageData?.results ?? []"
            >
              <template #th-slot>
                <th>Invite User</th>
              </template>
              <template #td-slot>
                <Basic_button @click="" class="btn-secondary"> Invite User </Basic_button>
              </template>
            </Basic_Table>
          </ModalWindow>
        </td>
        <td v-else>
          <Basic_button
            button-text="Request to join"
            class="btn btn-success"
            @click="handleClick(id)"
            >Send Request</Basic_button
          >
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
import { User } from "@/types";
import Spinner from "@/components/Spinner.vue";
import Basic_Table from "@/components/BasicTable/Basic_Table.vue";
import { Company, PageWith } from "@/types";
import {
  GetAllCompanies,
  axiosRequest,
  getReqAxios,
  postReqAxios,
} from "@/utils/functions";
import { onMounted, ref } from "vue";
import Toast from "@/components/Toast.vue";
import Basic_button from "@/components/buttons/Basic_button.vue";
import NavBar from "@/components/NavBar.vue";
import useStoreTyped from "@/store/store";
import ModalWindow from "@/components/ModalWindow.vue";
type UserMiniList = Pick<User, "first_name" | "id" | "last_name">;
type ToastInfo = {
  alertInfoType: boolean;
  isShowing: boolean;
};
type Invitation = {
  id?: number;
  company: number;
};
type CompanyWithMembers = Omit<Company, "members"> & { members: number };
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
const usersPageData = ref<PageWith<UserMiniList> | null>(null);
const pageData = ref<PageWith<CompanyWithMembers> | null>(null);
const Requests = ref<Invitation[] | null>(null);
const text = ref("");
const triggerToast = (infoType: boolean) => {
  ToastInfo.value.isShowing = true;
  ToastInfo.value.alertInfoType = infoType;
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
const fetchUsers = async () => {
  try {
    const result = await axiosRequest<PageWith<User>>("api/users/");
    const properData = result.results.map<UserMiniList>((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    }));
    usersPageData.value = {
      ...result,
      results: properData,
    };
  } catch (error) {
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
    const pendingInvites = await getReqAxios(
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
  fetchUsers();
});
</script>
