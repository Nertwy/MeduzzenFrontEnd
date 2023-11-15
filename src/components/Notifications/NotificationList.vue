<template>
  <BasicTableWrapper
    :keys="['text', 'status']"
    :data="data"
    class="table table-zebra"
  >
    <template #td-slot="{ id, index, value }">
      <td>
        <BasicButton @click="readNotification(id ?? -1)">
          Mark as read
        </BasicButton>
      </td>
    </template>
  </BasicTableWrapper>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import BasicTableWrapper from "../BasicTable/BasicTableWrapper.vue";
import { getReqAxios } from "@/utils/functions";
import { onMounted } from "vue";
import {
  CustomNotification,
  NewNotification,
  NotificationType,
  ReadNotification,
} from "@/types";
import BasicButton from "../buttons/BasicButton.vue";
type UserNotifications = {
  type: NotificationType;
  notifications: CustomNotification[];
};

const keys = [];
const data = ref<CustomNotification[]>([]);
const accessToken = localStorage.getItem("accessToken");
const ws = new WebSocket(
  `ws://${import.meta.env.VITE_BACKEND_HOST}notifications/?token=${accessToken}`
);

const userGroups = ref<any[]>([]);

onMounted(() => {
  ws.onmessage = (event) => {
    const notifications = JSON.parse(event.data) as UserNotifications;
    data.value?.push(...notifications.notifications);
  };

  ws.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  ws.onerror = (event) => {
    console.error("WebSocket error:", event);
  };
});

const readNotification = (id: number) => {
  const notification: ReadNotification = {
    id,
    type: "read_notification",
  };
  ws.send(JSON.stringify(notification));
};
</script>
