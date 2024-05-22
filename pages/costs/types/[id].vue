<script setup lang="ts">
import type { ApiResponse } from '~/types/api';
import type { CostTypeModel } from '~/types/general';

interface FormData {
    name: string;
    desc: string;
}


const id = useRoute().params.id;
const { $api, $toast } = useNuxtApp();
const isLoading = ref(false);
const costTypeData = ref<CostTypeModel>({
    desc: '',
    id: null,
    name: '',
    user_id: null
});

async function fetchCostType() {
    if(id) {
        const response = await $api.get<ApiResponse<{cost_type: CostTypeModel }>>(`cost-types/${id}`)
        if(response.status_page >= 400)
            $toast.error('Could not retrive cost with given ID, refresh the page');
        else
            costTypeData.value = (response.data as { cost_type: CostTypeModel}).cost_type
    }
}

async function updateCostType(data: FormData) {
    try {
        isLoading.value = true;
        const response = await $api.put<ApiResponse<{ cost_type: CostTypeModel }>>(`cost-types/${id}`, data);
        if(response.status_page >= 400)
            $toast.error('Could not update cost with given ID, refresh the page');
        else
            await fetchCostType();
        $toast.success(`Sucessfully updated ${costTypeData.value.name}`);
        navigateTo({ name: 'costs-types'})
        }
    catch(err) {
        console.error(err)
    }
    finally {
        isLoading.value = false;
    }
}

await fetchCostType();
</script>

<template>
    <UiSectionHeader>
        <h1>{{ costTypeData.name }} (cost type) - edit</h1>
        <UiAction variant="accent" href="/costs/types" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    <main>
        <FormKit type="form" :actions="false" form-class="column-flow maxed-form" @submit="updateCostType">
            <FormKit
                id="name"
                type="text"
                label="Name"
                name="name"
                :validation-messages="{ required: 'Name is required'}"
                :model-value="costTypeData.name"
                placeholder="Name"
                validation="required"
                validation-visibility="blur"
            /> 
            <FormKit
                id="desc"
                type="textarea"
                label="Description"
                name="desc"
                auto-height
                :validation-messages="{ required: 'Description is required'}"
                validation="required"
                :model-value="costTypeData.desc"
                placeholder="Description"
                validation-visibility="blur"
            />

            <UiAction class="add-to-list" :is-loading="isLoading">
                <font-awesome-icon icon="fa-solid fa-pen-nib" />
                Update
            </UiAction>
        </FormKit>
    </main>
</template>