<script lang="ts" setup>
import type { ApiResponse } from '~/types/api';
import type { CostLimitModel } from '~/types/general';

const { $api, $toast } = useNuxtApp();
const id = useRoute().params.id;
// TODO: use fetched data to fill the form and than update
const limitCostData = ref<CostLimitModel | null>(null);

async function fetchCostLimit() {
    if(id) {
        const response = await $api.get<ApiResponse<{cost_type_limit: CostLimitModel }>>(`cost-types-limits/${id}`)
        if(response.status_page >= 400)
            $toast.error('Could not retrive limit with given ID, refresh the page');
        else
            limitCostData.value = (response.data as { cost_type_limit: CostLimitModel}).cost_type_limit
    }
}

await fetchCostLimit();
console.log(limitCostData.value)
</script>

<template>
    <main v-if="limitCostData">
        <UiSectionHeader>
        <h1>(limit) - edit</h1>
        <UiAction variant="accent" href="/costs/limits" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    </main>
</template>