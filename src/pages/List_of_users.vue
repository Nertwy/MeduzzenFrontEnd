<template>
    <section>
        <template v-if="isLoading">
            <Spinner />
        </template>
        <template v-else>
            <table class="table table-zebra">
                <thead>
                    <tr>
                        <th v-for="(value, index) in Object.keys(userList[0])" :key="index">{{ value }}</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, index) in  userList " :key="index">
                        <Custom_td :edit="editIndex === index" :data="value" @input="handleInputChange" />
                        <td>
                            <Edit_Button :edit-function="() => updateUser(value)" :edit-index="editIndex"
                                @edit-user="handleEditClick" :index="index" />
                        </td>
                        <td>
                            <ModalWindow :btn-open-text="'Delete'" :title="'Delete user?'"
                                :text="'If you delete user all data will be lost!'">
                                <div class="flex flex-col gap-2">
                                    <label for="confirm_pass_input">Write your password</label>
                                    <input class="input input-accent" name="confirm_pass_input" v-model="userPassword" />
                                    <Delete_Button :delete-function="() => deleteUser(value.id, userPassword)" />
                                </div>

                            </ModalWindow>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination :items-per-page="2" :items="userList" @page-change="handlePageChange" :pagination-data="pageData" />
        </template>
    </section>
</template>
<script setup lang="ts">
import { PageWith, User } from '@/types';
import { GetAllUsers, deleteReqAxios, updateReqAxios } from '@/utils/functions';
import { computed, onMounted, ref } from 'vue';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';
import Delete_Button from '@/components/buttons/Delete_Button.vue';
import useStoreTyped from '@/store/store';
import Edit_Button from '@/components/buttons/Edit_Button.vue';
import Custom_td from '@/components/Custom_td.vue';
import ModalWindow from '@/components/ModalWindow.vue';
const store = useStoreTyped()
const isLoading = ref(true)
const editIndex = ref<number | null>(null)
const pageData = ref<PageWith<User>>({
    count: 0,
    next: null,
    results: [],
    previous: null
})
// const paginatedList = computed(() => userList.value.slice(startIndex.value, endIndex.value));
const userList = computed(() => store.state.usersList)
const userPassword = ref("")
const userData = ref<Record<string, any>>({})
const handleInputChange = (key: string, value: any) => {
    userData.value[key] = value
}
const handlePageChange = async (page: number | string) => {
    if (typeof page === "string") return
    console.log(page);

    const fetchedData = await GetAllUsers(page)
    if (fetchedData) {
        await store.dispatch("changeUserList", fetchedData.results)
    }
}
const deleteUser = async (id: number | undefined, password: string) => {
    if (!id) return
    const result = await deleteReqAxios("api/auth/users/me/", {
        data: {
            current_password: password
        }
    })
    if (result) store.commit("removeUserFromList", id)
}
const updateUser = async (user: User) => {
    const newUser: User = {
        ...user,
        ...userData.value
    }
    if (!user) return
    const result = await updateReqAxios("api/users/", user.id ?? -1, userData.value)
    if (result) await store.dispatch("updateUserFromList", newUser)
}
const handleEditClick = (clickedIndex: number | null) => {
    editIndex.value = clickedIndex;
};
const fetch = async () => {
    const fetchedData = await GetAllUsers()
    if (!fetchedData) return
    fetchedData?.results.forEach((user) => {
        store.commit('addUserToList', user)
        // userList.value.push(user)
    })
    isLoading.value = false
    pageData.value = fetchedData
}
onMounted(() => {
    fetch()
})
</script>
<style lang="">
</style>