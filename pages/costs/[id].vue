<script lang="ts" setup>
import type { ApiError, ApiResponse } from '~/types/api';
import type { CostsModel } from '~/types/general';

const { $api, $toast } = useNuxtApp();
const id = useRoute().params.id;
const isLoading = ref(false);
const costData = ref<CostsModel | null>(null);

interface FormData {
    price: string;
    desc: string;
}

async function fetchCost() {
    if(id) {
        const response = await $api.get<ApiResponse<{cost: CostsModel }>>(`costs/${id}`)
        if(response.status_page >= 400)
            $toast.error('Could not retrive cost with given ID, refresh the page');
        else
            costData.value = (response.data as { cost: CostsModel}).cost
    }
}

async function updateCost(data: FormData) {
    try {
        if(!id) throw new Error('No id specified');
        isLoading.value = true;
        const updateData = { ...costData.value, ...data }
        const response = await $api.put<ApiResponse<CostsModel>>(`costs/${id}`, updateData);
        if(response.status_page >= 400) {
            const resData = response.data as ApiError;
            const { message } = resData;
            $toast.error(message);
            return;
        }
        $toast.success('Cost sucessfully updated')
        navigateTo({ name: 'costs' });
    }
    catch(err) {
        $toast.error('Could not update the cost, please try again')
    }
    finally {
        isLoading.value = false;
    }
}

await fetchCost();
</script>

<template>
    <main v-if="costData">
        <UiSectionHeader>
        <h1>{{ costData.date }} - {{ costData.cost_type.name}} cost - edit</h1>
        <UiAction variant="accent" href="/costs" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    <FormKit type="form" :actions="false" form-class="column-flow" @submit="updateCost">
        <FormKit type="text" :model-value="costData.price" name="price" label="Price($)" />
        <FormKit type="text" :model-value="costData.desc" name="desc" label="Description of a cost" />
        <UiAction type="submit" :is-loading="isLoading">
            Update cost
        </UiAction>
    </FormKit>
    </main>
</template>