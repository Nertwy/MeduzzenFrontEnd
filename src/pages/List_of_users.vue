<template>
    <section>
        <template v-if="isLoading">
            <Spinner />
        </template>
        <Table_With_Pagination :delete-func="deleteUser" :update-func="updateUser" :data="userList"
            :page-change-func="handlePageChange" :page-data="pageData" :pages="4" />
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
import Table_With_Pagination from '@/components/Table_With_Pagination.vue';
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
const handlePageChange = async (page: number) => {
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