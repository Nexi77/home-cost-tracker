<script setup lang="ts">
interface Props {
    modelValue: boolean;
}

interface Emits {
    (e: 'confirm'): void;
    (e: 'reject'): void;
    (e: 'update:modelValue', value: boolean): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>()
</script>

<template>
      <UiDialog :model-value="modelValue" width="400px" @update:model-value="($event) => emits('update:modelValue', $event)">
            <template #header>
                Are you sure you want to delete this record?
            </template>
            <div class="confirm-actions">
                <UiAction variant="primary" @click="emits('confirm')">
                    Yes
                </UiAction>
                <UiAction variant="error" @click="emits('reject')">
                    No
                </UiAction>
            </div>
        </UiDialog>
</template>

<style lang="scss" scoped>
.confirm-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>