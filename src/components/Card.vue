<template>
    <section class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <p>{{ description }}</p>
            <slot name="slot-title"></slot>

            <div class="card-actions justify-end">
                <slot name="slot-actions">
                    
                </slot>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
import ModalWindow from './ModalWindow.vue';

defineProps({
    title: {
        type: [String],
        default: "",
    },
    titleAppendWord: {
        type: [String]
    },
    description: {
        type: [String],
        default: ""
    }
})


</script>