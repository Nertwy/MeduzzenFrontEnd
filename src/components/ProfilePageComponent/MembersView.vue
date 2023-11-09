<template>
  <BasicTableWrapper
    class="table table-zebra"
    :data="
      !isAdminFilter ? members : members.filter((item) => item.isAdmin === true)
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
          <BasicButton class="btn-info" @click="appointAdmin(companyId, index)"
            >Promote admin</BasicButton
          >
        </td>
      </template>
      <td>
        <template v-if="companyId >= 1">
          <UserAllQuizesChart :company_id="companyId" :user_id="value.id" />
        </template>
      </td>
      <td>
        {{ returnDateOrNone(value.email) }}
      </td>
    </template>
  </BasicTableWrapper>
</template>

<script setup lang="ts">
import { Members, fetchLastType } from "@/types";
import BasicTableWrapper from "../BasicTable/BasicTableWrapper.vue";
import BasicButton from "../buttons/BasicButton.vue";
import UserAllQuizesChart from "@/components/Charts/UserAllQuizesChart.vue";
import { postReqAxios } from "@/utils/functions";
import { ref } from "vue";
type Props = {
  companyId: number;
  isAdminFilter: boolean;
  members: Members[];
  fetchedUsersLastTime: fetchLastType;
};
const userKeys = ["email", "first name", "last name", "is admin"];
const userExcludekeys: (keyof Members)[] = ["isOwner", "id"];
const props = withDefaults(defineProps<Props>(), {
  isAdminFilter: false,
  members: () => [],
});

const appointAdmin = async (company_id: number, user_index: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/appoint_admin/`, {
      data: {
        user_id: props.members[user_index].id,
      },
    });
    props.members[user_index].isAdmin = true;
  } catch (error) {
    console.error(error);
  }
};
const revokeAdmin = async (company_id: number, user_index: number) => {
  try {
    await postReqAxios(`api/companies/${company_id}/remove_admin/`, {
      data: {
        user_id: props.members[user_index].id,
      },
    });
    props.members[user_index].isAdmin = false;
  } catch (error) {
    console.error(error);
  }
};

const returnDateOrNone = (email: string) => {
  const userLastTestTime = props.fetchedUsersLastTime.user_last_test_time.find(
    (item) => item.user__email == email
  )?.last_test_time;

  if (!userLastTestTime) {
    return "No date of the last quizz";
  }
  const userDate = new Date(userLastTestTime);
  return userDate;
};
</script>
