<template>
  <template v-if="loaded && usersPageData">
    <ModalWindow :btn-open-text="'Invite Users'">
      <BasicTableWrapper
        :keys="['id', 'name', 'last name']"
        :data="usersPageData?.results ?? []"
      >
        <template #th-slot>
          <th>Invite User</th>
        </template>
        <template #td-slot="{ id, index, value }">
          <div class="">
            <template v-if="usersInvites.find((user) => value.id === user.id)">
              <BasicButton
                class="btn-error w-full"
                @click="revoke_invitation(value.id ?? -1)"
              >
                Revoke Invitation
              </BasicButton>
            </template>
            <template v-else>
              <BasicButton
                @click="handleInviteUser(value.id ?? -1, companyId)"
                class="btn-success w-full"
              >
                Invite User
              </BasicButton>
            </template>
          </div>
          <slot></slot>
        </template>
      </BasicTableWrapper>
    </ModalWindow>
  </template>
  <template v-else><Spinner /></template>
</template>
<script setup lang="ts">
import Spinner from "../Spinner.vue";
import { onMounted, ref } from "vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import { PageWith, User } from "@/types";
import ModalWindow from "@/components/ModalWindow.vue";
import { axiosRequest, deleteReqAxios, postReqAxios } from "@/utils/functions";
import BasicTableWrapper from "../BasicTable/BasicTableWrapper.vue";
type UserMiniList = Pick<User, "first_name" | "id" | "last_name">;
const props = defineProps({
  companyId: {
    type: [Number],
    required: true,
    default: -1,
  },
});
//revoke_invitation
//invited_users
const usersInvites = ref<Partial<User>[]>([]);
const usersPageData = ref<PageWith<UserMiniList> | null>(null);
const loaded = ref(false);

const handleInviteUser = async (userId: number, companyId: number) => {
  try {
    await postReqAxios(`api/companies/${companyId}/invite/`, {
      data: {
        reciver_id: userId,
      },
    });
    usersInvites.value.push({ id: userId });
  } catch (error) {
    console.error(error);
  }
};
const revoke_invitation = async (id: number) => {
  try {
    await deleteReqAxios(
      `api/companies/${props.companyId}/revoke_invitation/`,
      {
        data: {
          user_id: id,
        },
      }
    );
    const userToDel = usersInvites.value.find((user) => user.id === id);
    if (userToDel) {
      const index = usersInvites.value.indexOf(userToDel);
      if (index > -1) {
        usersInvites.value.splice(index, 1);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const fetch_invitations = async () => {
  const result = await axiosRequest<User[]>(
    `api/companies/${props.companyId}/invited_users/`
  );
  usersInvites.value = result;
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
    loaded.value = true;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetch_invitations();
  fetchUsers();
});
</script>
