<script setup lang="ts">
import generateRandomId from '~/utils/genRandomId';
interface Props {
    items: any[];
    actionsToHide?: ('edit' | 'delete')[]
}
interface Emits {
    (e: 'delete-row', { index, id } : { index: number, id: number | undefined }): void,
    (e: 'edit-row', { index, id } : { index: number, id: number | undefined }): void
}
defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
    actionsToHide: () => []
});

const hideActions = computed(() => {
    return props.actionsToHide.includes('delete') && props.actionsToHide.includes('edit');
})
</script>

<template>
    <div class="list-wrapper">
        <div class="list-row" v-for="(item, index) in items" :key="item.id || generateRandomId()">
            <slot name="row" :item="item" />
            <div class="actions" v-if="!hideActions">
                <UiAction title="edit entry" @click="$emit('edit-row', { index, id: item?.id })" v-if="!actionsToHide.includes('edit')">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </UiAction>
                <UiAction title="delete entry" variant="error" @click="$emit('delete-row', { index, id: item?.id })" v-if="!actionsToHide.includes('delete')">
                    <font-awesome-icon icon="fa-solid fa-times" />
                </UiAction>
            </div>
        </div>
        <div v-if="items.length === 0">
            No entries yet specified
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list-wrapper {
    display: flex;
    flex-direction: column;
}

.list-row {
    display: flex;
    align-items: center;
    border-top: 1px solid;
    padding: 0.5rem 0.2rem;
    border-color: var(--clr-accent);
    justify-content: space-between;
    gap: 10px;
    &:last-child {
        border-bottom: 1px solid;
    }
}
.actions {
    display: flex;
    margin-left: auto;
    gap: 10px;
    & > * {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 48px;
    }
}
</style>