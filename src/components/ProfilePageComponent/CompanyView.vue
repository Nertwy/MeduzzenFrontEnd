<template>
  <div class="flex w-1/2 flex-col items-center">
    Company View
    <BasicSelect
      @select-change="selectChange"
      :data="companies"
      :key-to-show="'name'"
      :default-text="'Pick your company to view'"
    />
    <BasicTableWrapper
      v-if="companyRequests.length >= 1"
      class="table table-zebra text-center"
      :keys="['first name', 'last name']"
      :data="companyRequests"
    >
      <template #td-slot="{ id, index, value }">
        <td>
          <BasicButton
            class="btn-success"
            @click="acceptRequest(value.company_id, id ?? -1)"
          >
            Accept Request
          </BasicButton>
        </td>
        <td>
          <BasicButton
            class="btn-error"
            @click="declineRequest(value.company_id, id ?? -1)"
          >
            Decline Request
          </BasicButton>
        </td>
      </template>
    </BasicTableWrapper>
    <div v-else>No requests to accept</div>
    <div class="divider">
      &#8593; Requests &#8593; | &#8595; Invitations &#8595;
    </div>
    <InvitationsView :toast-ref="toastRef" />
    <div class="divider">
      &#8595; Members &#8595;
      <Toggle label="filter by admin users" v-model="isAdminFilter" />
    </div>
    <MembersView
      :company-id="companyId"
      :is-admin-filter="isAdminFilter"
      :members="members"
      :fetched-users-last-time="fetchedUsersLastTime"
    />
    <Toast ref="toastRef" :text="'Invite'" />
  </div>
</template>

<script setup lang="ts">
import Toast from "@/components/Toast.vue";

import BasicSelect from "@/components/BasicSelect.vue";
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import Toggle from "@/components/Toggle.vue";
import { getReqAxios, postReqAxios } from "@/utils/functions";
import {
  Company,
  InvitationToCompany,
  Members,
  UserLastTestTime,
} from "@/types";
import { ref } from "vue";
import { onMounted } from "vue";
import InvitationsView from "./InvitationsView.vue";
import MembersView from "./MembersView.vue";
const isAdminFilter = ref<boolean>(false);
const companies = ref<Company[]>([]);
const companyId = ref<number>(-1);
const companyRequests = ref<InvitationToCompany[]>([]);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const members = ref<Members[]>([]);
const fetchedUsersLastTime = ref<UserLastTestTime>({ user_last_test_time: [] });

const selectChange = async (id: number) => {
  await fetchCompanyRequests(id);
  await fetchMembers(id);
  await fetchLastTestTime(id);
  companyId.value = id;
};

const fetchMembers = async (company_id: number) => {
  try {
    const result = await getReqAxios<any[]>(
      `api/companies/${company_id}/users_in_company`,
      {}
    );

    const typedMembers: Members[] = result.map((member) => ({
      id: member.id,
      email: member.email,
      firstName: member.first_name,
      lastName: member.last_name,
      isAdmin: member.is_admin,
      isOwner: member.is_owner,
    }));
    members.value = typedMembers;
  } catch (error) {
    console.error(error);
  }
};
const fetchLastTestTime = async (companyId: number) => {
  try {
    const result = await getReqAxios<UserLastTestTime>(
      `api/users_last_test_time/${companyId}/`
    );
    fetchedUsersLastTime.value = result;
  } catch (error) {
    console.error(error);
  }
};
const fetchCompanyRequests = async (company_id: number) => {
  try {
    const result = await getReqAxios<any[]>(
      `api/companies/${company_id}/get_company_requests/`
    );

    const Requests: InvitationToCompany[] = result.map<InvitationToCompany>(
      (data) => ({
        id: data.id,
        senderFirstName: data.sender_first_name,
        senderLastName: data.sender_last_name,
        company_id: data.company,
      })
    );
    companyRequests.value = Requests;
  } catch (error) {
    console.error(error);
  }
};

const acceptRequest = async (company_id: number, request_id: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/accept_join_request/`, {
      data: {
        request_id,
      },
    });
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);
    console.error(error);
  }
};
const declineRequest = async (company_id: number, request_id: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/decline_join_request/`, {
      data: {
        request_id,
      },
    });
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);
    console.error(error);
  }
};
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
