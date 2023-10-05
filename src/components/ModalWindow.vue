<template>
  <div>
    <button class="btn" @click="openModal">{{ props.btnOpenText }}</button>
    <dialog :open="isOpen" class="modal">
      <article class="modal-box">
        <header class="modal-header">
          <h3 class="font-bold text-lg">{{ props.title }}</h3>
        </header>
        <section class="modal-content">
          <p class="py-4">{{ props.text }}</p>
        </section>
        <footer class="modal-action">
          <form method="dialog">
            <slot></slot>
            <button class="btn" @click="closeModal">{{ props.btnInModalText }}</button>
          </form>
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