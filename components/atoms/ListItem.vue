<script setup lang="ts">
interface Props {
    item: unknown;
}

defineProps<Props>();
</script>

<template>
    <div class="list-item">
        <slot name="item" :entry="item" />
    </div>
</template>

<style lang="scss" scoped>
.list-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}
</style>