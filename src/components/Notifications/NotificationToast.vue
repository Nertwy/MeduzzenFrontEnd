<template>
  <Toast ref="toastRef" :text="newNotification?.text">
    <template #toast-inside>
      <BasicButton @click="readNotification(newNotification?.id ?? -1)">{{
        $t("Notification.MarkAsRead")
      }}</BasicButton>
    </template>
  </Toast>
</template>
<script setup lang="ts">
import {
  CustomNotification,
  NotificationType,
  ReadNotification,
} from "@/types";
import { onMounted, ref } from "vue";
import Toast from "../Toast.vue";
import BasicButton from "../buttons/BasicButton.vue";
import { isArray } from "chart.js/helpers";
import useStoreTyped from "@/store/store";
import { fetchUserInfo } from "@/utils/functions";
type UserNotifications = {
  type: NotificationType;
  notifications: CustomNotification[] | CustomNotification;
};
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const accessToken = localStorage.getItem("accessToken");
const ws = new WebSocket(
  `ws://${import.meta.env.VITE_BACKEND_HOST}notifications/?token=${accessToken}`
);
const store = useStoreTyped();
const newNotification = ref<CustomNotification | null>();
onMounted(() => {
  ws.onopen = () => {};
  ws.onmessage = async (event) => {
    const notifications = JSON.parse(event.data) as UserNotifications;
    switch (notifications.type) {
      case "new_notification":
        await newNotificationAction(notifications);
        break;

      default:
        break;
    }
  };

  ws.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  ws.onerror = (event) => {
    console.error("WebSocket error:", event);
  };
});
const newNotificationAction = async (notifications: UserNotifications) => {
  if (!isArray(notifications.notifications)) {
    newNotification.value = notifications.notifications;
  } else {
    let user_id = store.state.user?.id;
    if (!user_id) {
      try {
        user_id = (await fetchUserInfo()).id;
      } catch (error) {
        console.error(error);
      }
    }
    const userNotification = notifications.notifications.find(
      (notification) => notification.recipient === user_id
    );
    if (userNotification) newNotification.value = userNotification;
  }
  toastRef.value?.triggerToast(true);
};
const readNotification = (id: number) => {
  const notification: ReadNotification = {
    id,
    type: "read_notification",
  };
  ws.send(JSON.stringify(notification));
};
</script>
`
