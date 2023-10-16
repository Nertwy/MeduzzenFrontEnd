<template>
  <section
    class="h-screen flex flex-col justify-center align-middle p-6 m-6 items-center"
  >
    <Form />
  </section>
  <GoogleButton />
</template>
<script setup lang="ts">
import GoogleButton from "@/components/buttons/GoogleButton.vue";
import Form from "@/components/FormComponents/Form.vue";
</script>
