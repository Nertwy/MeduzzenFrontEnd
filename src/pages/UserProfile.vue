<template>
  <NavBar />
  <template v-if="companies.length !== 0">
    <div class="flex h-screen">
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
        <BasicTableWrapper
          class="table table-zebra text-center"
          :exclude-strings="invitationsExclude"
          v-if="userInvitations.length >= 1"
          :keys="invitationKeys"
          :data="userInvitations"
        >
          <template #td-slot="{ id, index, value }">
            <td>
              <BasicButton
                class="btn-success"
                @click="acceptInvitation(value.company_id, id ?? -1)"
              >
                Accept Invite
              </BasicButton>
            </td>
            <td>
              <BasicButton
                class="btn-error"
                @click="declineInvitation(value.company_id, id ?? -1)"
              >
                Decline Invite
              </BasicButton>
            </td>
          </template>
        </BasicTableWrapper>
        <div v-else>No Invitations for this user :(</div>
        <div class="divider">
          &#8595; Members &#8595;
          <Toggle label="filter by admin users" v-model="isAdminFilter" />
        </div>
        <BasicTableWrapper
          class="table table-zebra"
          :data="
            !isAdminFilter
              ? members
              : members.filter((item) => item.isAdmin === true)
          "
          :keys="userKeys"
          :exclude-strings="userExcludekeys"
        >
          <template #td-slot="{ id, value, index }">
            <template v-if="value.isAdmin">
              <td>
                <BasicButton
                  :class="`btn-error ${value.isOwner ? 'btn-disabled' : ''}`"
                  @click="revokeAdmin(companyId, index)"
                  >Remove admin</BasicButton
                >
              </td>
            </template>

            <template v-else>
              <td>
                <BasicButton
                  class="btn-info"
                  @click="appointAdmin(companyId, index)"
                  >Promote admin</BasicButton
                >
              </td>
            </template>
            <td>
              <template v-if="companyId >= 1">
                <UserAllQuizesChart
                  :company_id="companyId"
                  :user_id="value.id"
                />
              </template>
            </td>
            <td>
              {{ returnDateOrNone(value.email) }}
            </td>
          </template>
        </BasicTableWrapper>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="flex w-1/2 flex-col items-center">
        <h1 class="text-2xl p-4">Your companies!</h1>
        <BasicTableWrapper
          :data="companiesYourIn"
          :keys="companyKeys"
          :exclude-strings="companyExcludeKeys"
          class="table table-zebra"
        >
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
              <ModalWindow
                :btn-open-text="'create Quiz'"
                :title="'Create Quiz'"
              >
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
  <template v-else>
    <Spinner />
  </template>
  <Toast ref="toastRef" :text="'Invite'" />
</template>
<script setup lang="ts">
import Toggle from "@/components/Toggle.vue";
import BasicSelect from "@/components/BasicSelect.vue";
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import NavBar from "@/components/NavBar.vue";
import Spinner from "@/components/Spinner.vue";
import Toast from "@/components/Toast.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import {
  Company,
  InvitationToCompany,
  InvitationToUser,
  Members,
  User,
} from "@/types";
import { deleteReqAxios, getReqAxios, postReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
import QuizForm from "@/components/FormComponents/QuizForm.vue";
import { useRouter } from "vue-router";
import SelectedUserChart from "@/components/Charts/SelectedUserChart.vue";
import UserAllQuizesChart from "@/components/Charts/UserAllQuizesChart.vue";
import BaseInput from "@/components/Inputs/BaseInput.vue";
type fetchLastType = {
  user_last_test_time: {
    user__email: string;
    last_test_time: string;
  }[];
};
const userKeys = ["email", "first name", "last name", "is admin"];
const userExcludekeys: (keyof Members)[] = ["isOwner", "id"];
const companyKeys = ["company name", "company description", "leave company"];
const companyExcludeKeys: (string | number | symbol)[] = [
  "id",
  "created_at",
  "updated_at",
  "is_owner",
  "is_admin",
];
const invitationKeys = ["Company name", "Owner last name"];
const invitationsExclude: (keyof InvitationToUser)[] = ["id", "company_id"];
const confirmationPass = ref<string>("");
const router = useRouter();
const companies = ref<Company[]>([]);
const isAdminFilter = ref(false);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const companyRequests = ref<InvitationToCompany[]>([]);
const userInvitations = ref<InvitationToUser[]>([]);
const companiesYourIn = ref<any[]>([]);
const members = ref<Members[]>([]);
const companyId = ref<number>(-1);
const user = ref<User | null>(null);
const fetchedUsersLastTime = ref<fetchLastType>({ user_last_test_time: [] });
const selectChange = async (id: number) => {
  await fetchCompanyRequests(id);
  await fetchMembers(id);
  await fetchLastTestTime(id);
  companyId.value = id;
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
const leaveCompany = async (company_id?: number) => {
  try {
    if (!company_id) return;
    await postReqAxios(`api/companies/${company_id}/leave_company/`, {});
  } catch (error) {
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
const returnDateOrNone = (email: string) => {
  const userLastTestTime = fetchedUsersLastTime.value.user_last_test_time.find(
    (item) => item.user__email == email
  )?.last_test_time;

  if (!userLastTestTime) {
    return "No date of the last quizz";
  }
  const userDate = new Date(userLastTestTime);
  return userDate;
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

const fetchUserInvitations = async () => {
  try {
    const result = await getReqAxios<any[]>("api/companies/user_invitations/");

    const invitations: InvitationToUser[] = result.map((item) => ({
      id: item.id,
      company_name: item.company_name,
      company_id: item.company,
      senderLastName: item.sender_last_name,
    }));
    userInvitations.value = invitations;
  } catch (error) {
    console.error(error);
  }
};
const appointAdmin = async (company_id: number, user_index: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/appoint_admin/`, {
      data: {
        user_id: members.value[user_index].id,
      },
    });
    members.value[user_index].isAdmin = true;
  } catch (error) {
    console.error(error);
  }
};
const revokeAdmin = async (company_id: number, user_index: number) => {
  try {
    const result = await postReqAxios(
      `api/companies/${company_id}/remove_admin/`,
      {
        data: {
          user_id: members.value[user_index].id,
        },
      }
    );
    members.value[user_index].isAdmin = false;
  } catch (error) {
    console.error(error);
  }
};
const acceptInvitation = async (company_id: number, invitation_id: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/accept_invitation/`, {
      data: {
        invitation_id: invitation_id,
      },
    });
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);
    console.error(error);
  }
};
const declineInvitation = async (company_id: number, invitation_id: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/decline_invitation/`, {
      data: {
        invitation_id: invitation_id,
      },
    });
    toastRef.value?.triggerToast(true);
  } catch (error) {
    toastRef.value?.triggerToast(false);
    console.error(error);
  }
};

const fetchLastTestTime = async (companyId: number) => {
  try {
    const result = await getReqAxios<fetchLastType>(
      `api/users_last_test_time/${companyId}/`
    );
    fetchedUsersLastTime.value = result;
  } catch (error) {
    console.error(error);
  }
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
  fetchYourCompanies();
  fetchUserInvitations();
  fetchCompaniesYourIn();
  fetchAvgScore();
});
</script>
