<template>
    <section>
        <NavBar />
        <template v-if="isLoading">
            <Spinner />
        </template>
        <Table_With_Pagination :update-func="(user) => updateUser(user, 'api/companies/', 'updateCompanyFromList')"
            :data="companyList" :page-change-func="handlePageChange" :page-data="pageData" :pages="4" />

            <CompanyForm />
    </section>
</template>
<script setup lang="ts">
import Table_With_Pagination from '@/components/Table_With_Pagination.vue';
import Spinner from '@/components/Spinner.vue';
import NavBar from '@/components/NavBar.vue';
import { GetAllCompanies, updateReqAxios } from '@/utils/functions';
import useStoreTyped from '@/store/store';
import { computed, onMounted, ref } from 'vue';
import { ActionKeys, Company, PageWith } from '@/types';
import { Store } from 'vuex';
import CompanyForm from '@/components/FormComponents/CompanyForm.vue';
const store = useStoreTyped()
const isLoading = ref(true)
const pageData = ref<PageWith<Company>>({
    count: 0,
    next: null,
    results: [],
    previous: null
})
const companyList = computed(() => store.state.companyList)
const handlePageChange = async (page: number) => {
    const fetchedData = await GetAllCompanies(page)
    if (fetchedData) {
        await store.dispatch("changeCompanyList", fetchedData.results)
    }
}
// 
// const updateUser = async (user: User) => {
//     const result = await updateReqAxios("api/users/", user.id ?? -1, user)
//     if (result) await store.dispatch("updateUserFromList", user)
// }

const updateUser = async <T extends { id?: number }>(data: T, url: string, action: ActionKeys) => {
    const result = await updateReqAxios(url, data.id ?? -1, data)
    if (result) await store.dispatch(action, data as any)
}
const fetch = async () => {
    const fetchedData = await GetAllCompanies()
    if (!fetchedData) return
    fetchedData?.results.forEach((company) => {
        store.commit('addCompanyToList', company)
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