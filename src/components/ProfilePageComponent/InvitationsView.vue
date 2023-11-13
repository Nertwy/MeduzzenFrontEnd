<template>
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
</template>

<script setup lang="ts">
import BasicTableWrapper from "../BasicTable/BasicTableWrapper.vue";
import BasicButton from "../buttons/BasicButton.vue";
import { InvitationToUser } from "@/types";
import { getReqAxios, postReqAxios } from "@/utils/functions";
import Toast from "../Toast.vue";
import { ref } from "vue";
import { onMounted } from "vue";
type Props = {
  toastRef: InstanceType<typeof Toast> | null;
};
const userInvitations = ref<InvitationToUser[]>([]);
const invitationKeys = ["Company name", "Owner last name"];
const invitationsExclude: (keyof InvitationToUser)[] = ["id", "company_id"];
const props = defineProps<Props>();

const acceptInvitation = async (company_id: number, invitation_id: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/accept_invitation/`, {
      data: {
        invitation_id: invitation_id,
      },
    });
    props?.toastRef?.triggerToast(true, "Accepted");
  } catch (error) {
    props.toastRef?.triggerToast(false);
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
    props?.toastRef?.triggerToast(true, "Declined");
  } catch (error) {
    props.toastRef?.triggerToast(false);
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
onMounted(() => {
  fetchUserInvitations();
});
</script>
