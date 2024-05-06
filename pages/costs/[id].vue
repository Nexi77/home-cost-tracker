<script lang="ts" setup>
import type { ApiResponse } from '~/types/api';
import type { CostsModel } from '~/types/general';

const { $api, $toast } = useNuxtApp();
const id = useRoute().params.id;
// TODO: use fetched data to fill the form and than update
const costData = ref<CostsModel | null>(null);

async function fetchCost() {
    if(id) {
        const response = await $api.get<ApiResponse<{cost: CostsModel }>>(`costs/${id}`)
        if(response.status_page >= 400)
            $toast.error('Could not retrive cost with given ID, refresh the page');
        else
            costData.value = (response.data as { cost: CostsModel}).cost
    }
}

await fetchCost();
</script>

<template>
    <main v-if="costData">
        <UiSectionHeader>
        <h1>cost - edit</h1>
        <UiAction variant="accent" href="/costs" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    </main>
</template>