<template>
    <section class="nav-bar__buttons">
        <header>
            <nav>
                <template v-if="!isAuthenticated">
                    <Sign_Up_Button />
                    <Log_In_Button />
                </template>
                <template v-else>
                    <Log_Out_Button />
                    <div>
                        User Email - {{ user?.email }}
                    </div>
                    <div>
                        {{ user?.nickname }}
                    </div>
                </template>
            </nav>
        </header>
    </section>
</template>
<script setup lang="ts">
import Log_Out_Button from './buttons/Log_Out_Button.vue';
import Log_In_Button from './buttons/Log_In_Button.vue'
import Sign_Up_Button from './buttons/Sign_Up_Button.vue';
import { useAuth0 } from '@auth0/auth0-vue'
const { isAuthenticated, user } = useAuth0()

</script>
<style lang="">
    
</style>