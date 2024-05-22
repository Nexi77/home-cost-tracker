<script lang="ts" setup>
import type { ApiError, ApiResponse } from '~/types/api';
import type { CostLimitModel } from '~/types/general';

const { $api, $toast } = useNuxtApp();
const id = useRoute().params.id;
const isLoading = ref(false);
const limitCostData = ref<CostLimitModel | null>(null);
const authStore = useAuthStore();

interface FormData {
    weekly_limit: string;
    monthly_limit: string;
    quarter_limit: string;
    yearly_limit: string;
}

async function fetchCostLimit() {
    if(id) {
        const response = await $api.get<ApiResponse<{cost_type_limit: CostLimitModel }>>(`cost-types-limits/${id}`)
        if(response.status_page >= 400)
            $toast.error('Could not retrive limit with given ID, refresh the page');
        else
            limitCostData.value = (response.data as { cost_type_limit: CostLimitModel}).cost_type_limit
    }
}

async function updateCostLimit(data: FormData) {
    try {
        if(!id) throw new Error('No id specified');
        isLoading.value = true;
        const updateData = { cost_type_id: id, user_id: authStore.data?.id, ...data }
        const response = await $api.put<ApiResponse<CostLimitModel>>(`cost-types-limits/${id}`, updateData);
        if(response.status_page >= 400) {
            const resData = response.data as ApiError;
            const { message } = resData;
            $toast.error(message);
            return;
        }
        $toast.success('Limit sucessfully updated')
        navigateTo({ name: 'costs-limits' });
    }
    catch(err) {
        $toast.error('Could not update the cost, please try again')
    }
    finally {
        isLoading.value = false;
    }
}


await fetchCostLimit();
</script>

<template>
    <main v-if="limitCostData">
        <UiSectionHeader>
        <h1>{{ limitCostData.cost_type?.name}} (limit) - edit</h1>
        <UiAction variant="accent" href="/costs/limits" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    <FormKit type="form" :actions="false" form-class="column-flow" @submit="updateCostLimit">
        <FormKit
            id="weekly_limit"
            type="text"
            label="Weekly limit ($)"
            name="weekly_limit"
            :model-value="limitCostData.weekly_limit"
            :validation-messages="{ required: 'Weekly limit is required'}"
            placeholder="Weekly limit"
            validation="required"
            validation-visibility="blur"
        /> 
        <FormKit
            id="monthly_limit"
            type="text"
            label="Monthly limit ($)"
            name="monthly_limit"
            :model-value="limitCostData.monthly_limit"
            :validation-messages="{ required: 'Monthly limit is required'}"
            placeholder="Monthly limit"
            validation="required"
            validation-visibility="blur"
        /> 
        <FormKit
            id="quarter_limit"
            type="text"
            label="Quarter limit ($)"
            name="quarter_limit"
            :model-value="limitCostData.quarter_limit"
            :validation-messages="{ required: 'Quarter limit is required'}"
            placeholder="Quarter limit"
            validation="required"
            validation-visibility="blur"
        /> 
        <FormKit
            id="yearly_limit"
            type="text"
            label="Yearly limit ($)"
            name="yearly_limit"
            :model-value="limitCostData.yearly_limit"
            :validation-messages="{ required: 'Yearly limit is required'}"
            placeholder="Yearly limit"
            validation="required"
            validation-visibility="blur"
        /> 
        <UiAction type="submit" :is-loading="isLoading">
            Update limit
        </UiAction>
    </FormKit>
    </main>
</template>