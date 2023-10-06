<template>
    <section>
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th v-for="(value, index) in keys" :key="index">{{ value }}</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in  props.data" :key="index">
                    <Custom_td :edit="editIndex === index" :data="value" @input="handleInputChange" />
                    <td>
                        <Edit_Button :edit-function="() => updateFunc(value)" :edit-index="editIndex"
                            @edit-user="handleEditClick" :index="index" />
                    </td>
                    <td>
                        <ModalWindow :btn-open-text="'Delete'" :title="'Delete user?'"
                            :text="'If you delete user all data will be lost!'">
                            <div class="flex flex-col gap-2">
                                <label for="confirm_pass_input">Write your password</label>
                                <input class="input input-accent" name="confirm_pass_input" v-model="userPassword" />
                                <Delete_Button :delete-function="() => deleteFunc(value.id ?? -1, userPassword)" />
                            </div>

                        </ModalWindow>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :items-per-page="2" :items="props.data" @page-change="handlePageChange" :pagination-data="pageData" :total-pages="pages"/>
    </section>
</template>
<script setup lang='ts' generic="T extends {id?:number}">
import { onMounted, ref, watchEffect } from 'vue';
import Custom_td from './Custom_td.vue';
import Delete_Button from './buttons/Delete_Button.vue';
import Edit_Button from './buttons/Edit_Button.vue';
import ModalWindow from './ModalWindow.vue';
import Pagination from './Pagination.vue';
import { PageWith } from '@/types';
import { key } from '@/store/store';
type Props = {
    pages:number,
    deleteFunc: (id: number, password: string) => Promise<void>
    updateFunc: (data: T) => Promise<void>
    data: T[]
    pageChangeFunc: (page:number) => Promise<void>
}
const props = defineProps<Props>()
const keys = ref<string[]>([])
const editIndex = ref<number | null>(null)
const handleDataRef = ref<Record<string, any>>({})
const userPassword = ref("")
const pageData = ref<PageWith<T>>({
    count: 0,
    next: null,
    results: [],
    previous: null
})

const handleInputChange = (key: string, value: any) => {
    handleDataRef.value[key] = value
}
const handleEditClick = (clickedIndex: number | null) => {
    editIndex.value = clickedIndex;
};
const handlePageChange = async (page:number) => {
    await props.pageChangeFunc(page)
}
watchEffect(() => {
    keys.value = Object.keys(props.data[0] ?? {})
})
</script>
<style lang='scss'></style>