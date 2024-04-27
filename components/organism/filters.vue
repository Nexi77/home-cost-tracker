<script lang="ts" setup>
interface Props {
    identifier: string;
    isLoading?: boolean;
}
interface Emits {
    (e: 'changed', value: Record<string, unknown>): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const appStore = useAppStore();
const filterObject = computed(() => appStore.filters[props.identifier]);
function filter (data: Record<string, unknown>) {
    appStore.updateFilter(props.identifier, data);
    emits('changed', filterObject.value.data())
}
</script>

<template>
    <UiCollapse>
        <template #header>
            Filters
        </template>
        <FormKit type="form" :actions="false" @submit="filter">
            <div class="inputs">
                <slot />
            </div>
            <div class="filter-actions">
                <UiAction type="submit" :is-loading="isLoading">
                    Filter
                </UiAction>
                <UiAction variant="accent" type="submit" @click="filterObject.reset()">
                    Reset
                </UiAction>
            </div>
        </FormKit>
    </UiCollapse>
</template>

<style lang="scss" scoped>
.inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 1rem;

    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(auto-fit, 300px);
    }
}

.filter-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}
</style>