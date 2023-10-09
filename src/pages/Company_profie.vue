<template>
    <template v-if="companyExists">
        <NavBar />
        <section class="h-screen flex flex-col items-center justify-center">
            <Card :title="company.name" :title-append-word="'Company'" :description="company.description">
                <template #slot-title>
                </template>
                <template #slot-actions>
                    <ModalWindow :btn-open-text="'Delete Company'" :title="'Delete Company?'">
                        <div class="flex flex-col gap-2">
                            <BaseInput v-model:model-value="pass" :label="pass" :type="'pass'"
                                :class="'input input-secondary'" />
                            <Delete_Button :delete-function="() => deleteFunc(company.id, pass)" />
                        </div>
                    </ModalWindow>
                </template>
            </Card>
        </section>
    </template>
    <template v-else>
        <p>Company with id {{ router.currentRoute.value.params.id }} Does not exists Or hidden</p>
    </template>
</template>
<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue';
import Card from '@/components/Card.vue';
import Delete_Button from '@/components/buttons/Delete_Button.vue';
import useStoreTyped from '@/store/store';
import { Company } from '@/types';
import { axiosRequest, deleteReqAxios } from '@/utils/functions';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/Inputs/BaseInput.vue';
import NavBar from '@/components/NavBar.vue';
const router = useRouter()
const store = useStoreTyped()
const pass = ref("")
const company = ref<Company>({
    id: -1,
    description: "",
    is_visible: false,
    members: [],
    name: "",
    owner: null
})
const companyExists = ref(true)
const fetch = async () => {
    const id = router.currentRoute.value.params.id
    try {
        const result = await axiosRequest<Company>(`api/companies/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('access')}`
            }
        })
        company.value = result
        store.dispatch("setSelectedCompany", result)
    } catch (error) {
        companyExists.value = false
        console.error(error);
    }
}
const deleteFunc = async (id: number | undefined, pass: string) => {
    if (!id) return
    const result = await deleteReqAxios(`api/companies/${id}`, {
        data: {
            current_password: pass
        }
    })
    if (result) store.commit("removeUserFromList", id)
}
onMounted(() => {
    fetch()
})
</script>
