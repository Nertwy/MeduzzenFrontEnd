<template >
    <section>
        <form @submit="handleSubmit">
            <InputWithValidation :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" :type="'email'" v-model="data.email" />
            <button type="submit">{{ data.email }}</button>
        </form>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputWithValidation from '../components/InputWithValidation.vue';
type Props = {
    email: string,
    password: string,
    userName: string
}
const data = ref<Props>({
    email: "",
    password: "",
    userName: ""
})
const handleSubmit = (e: Event) => {

}
</script>
<style lang="">
    
</style>