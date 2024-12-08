<template>
    <div class="rounded-xl border-2 border-[#ffffff1a] px-4 py-3 mb-2.5 text-md font-bold flex items-center justify-between">
        <div class="text-white">{{ categoryName }}</div>
        <div style="color: var(--primary-color);">${{ amount }}</div>
    </div>
</template>
<script>
export default {
    props: {
        categoryName: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: false,
            default: 0
        }
    }
}
</script>
<style lang="">

</style>