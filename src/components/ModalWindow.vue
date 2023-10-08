<template>
  <div class="flex flex-col">
    <button class="btn" @click="openModal">{{ props.btnOpenText }}</button>
    <dialog :open="isOpen" class="modal">
      <article class="modal-box">
        <header class="modal-header">
          <h3 class="font-bold text-lg">{{ props.title }}</h3>
        </header>
        <section class="modal-content">
          <p class="py-4">{{ props.text }}</p>
        </section>
        <footer class="modal-action justify-center flex flex-col items-center">
          <form method="dialog" class="w-fit">
            <slot class="flex flex-col"></slot>
          </form>

          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </footer>
      </article>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  title?: string;
  text?: string;
  btnInModalText?: string;
  btnOpenText: string
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  text: '',
  btnInModalText: 'Close',
  btnOpenText: 'Open'
});

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
}
</script>
<style>

</style>