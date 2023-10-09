<template>
    <section>
        <NavBar />
        <template v-if="isLoading">
            <Spinner />
        </template>
        <input class="checkbox" type="checkbox" v-model="your_companies" />
        <Table_With_Pagination :update-func="(user) => updateUser(user, 'api/companies/', 'updateCompanyFromList')"
            :data="companyList" :page-change-func="handlePageChange" :page-data="pageData" :pages="4" :delete-func="deleteFunc"
            :delete-title="'Delete company?'" :delete-text="'All data about company will be lost!'" />
        <CompanyForm />
    </section>
</template>
<script setup lang="ts">
import Table_With_Pagination from '@/components/Table_With_Pagination.vue';
import Spinner from '@/components/Spinner.vue';
import NavBar from '@/components/NavBar.vue';
import { GetAllCompanies, deleteReqAxios, updateReqAxios } from '@/utils/functions';
import useStoreTyped from '@/store/store';
import { computed, onMounted, ref, watch } from 'vue';
import { ActionKeys, Company, PageWith } from '@/types';
import { Store } from 'vuex';
import CompanyForm from '@/components/FormComponents/CompanyForm.vue';
import BaseInput from '@/components/Inputs/BaseInput.vue';
type TableCompany = {
    id: number,
    name: string,
    description: string,
    members: number,
    is_visible: boolean
}
const your_companies = ref(false)

const store = useStoreTyped()
const isLoading = ref(true)
const pageData = ref<PageWith<Company>>({
    count: 0,
    next: null,
    results: [],
    previous: null
})

const companyList = computed<TableCompany[]>(() => store.state.companyList.filter((company) => {
    if (your_companies.value) return company.owner === store.state.user?.id
    return true
}).map(company => ({
    id: company.id,
    name: company.name,
    description: company.description,
    members: company.members.length,
    is_visible: company.is_visible
})))
const handlePageChange = async (page: number) => {
    const fetchedData = await GetAllCompanies(page)
    if (fetchedData) {
        await store.dispatch("changeCompanyList", fetchedData.results)
    }
}
const deleteFunc = async (id: number | undefined, password: string) => {
    if (!id) return
    const result = await deleteReqAxios(`api/companies/${id}`, {
        data: {
            current_password: password
        }
    })
    if (result) store.commit("removeUserFromList", id)
}

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

watch(your_companies, (newValue) => {
    console.log("Change");

    your_companies.value = newValue
})
onMounted(() => {
    fetch()
})
</script>
