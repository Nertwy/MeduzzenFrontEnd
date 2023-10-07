<template lang="">
    <section>
        <h1>this is About page (Settings)</h1>
    </section>
</template>
<script lang="ts">
import { onMounted } from 'vue';
import useStoreTyped from '../store/store';
import { deleteReqAxios, postReqAxios } from '@/utils/functions';
const handleChangePass = async (current_password: string, new_password: string) => {
    const result = await postReqAxios('api/auth/users/set_password/', {
        data: {
            current_password,
            new_password
        }
    })
    if (result) return true
    return false
}
const deleteUser = async (password: string) => {
    const result = await deleteReqAxios("api/auth/users/me/", {
        data: {
            current_password: password
        }
    })
    if (result) return "User deleted Successfully"

    return "User was not deleted!"
}
</script>
<style lang="">
    
</style>