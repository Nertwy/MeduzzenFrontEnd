<script setup lang="ts" generic="T extends Language | string">
import { onMounted, ref } from 'vue';
import i18n from '../i18n';
import { Language, LanguageAndFlag } from '@/types';

type Props = {
  items: Array<T>
  defaultSelectedItem: T
}
onMounted(() => {
  const language = localStorage.getItem("lang")
  if (!language) {
    localStorage.setItem("lang", 'en')
    i18n.global.locale = "en"
  } else {
    i18n.global.locale = language as Language
  }
})


const props = defineProps<Props>()
const item = ref<string | null | LanguageAndFlag>(props.defaultSelectedItem)
const onSelectItem = (e: Event) => {
  const target = e.target as HTMLSelectElement
  if (!target.value) return
  item.value = target.value
  i18n.global.locale = target.value as Language
  localStorage.setItem('lang', target.value)
}

</script>
<template lang="">
    <main>
    <nav>
      <select v-model="selectedItems" @change="onSelectItem">
        <option v-for="item in items" :value="item">{{ item }}</option>
      </select>
    </nav>

    <section>
      <h1>Selected items</h1>
      <ul>
        <li>{{ item }}</li>
      </ul>
    </section>
  </main>
</template>

<style lang="">
    
</style>