<script setup lang="ts">
import type { ApiResponse } from '~/types/api';
import type { CostTypeModel } from '~/types/general';

interface FormData {
    name: string;
    desc: string;
}


const id = useRoute().params.id;
const { $api, $toast } = useNuxtApp();
const costTypeData = ref<CostTypeModel>({
    desc: '',
    id: null,
    name: '',
    user_id: null
});

if(id) {
    const response = await $api.get<ApiResponse<{cost_type: CostTypeModel }>>(`cost-types/${id}`)
    console.log(response)
    if(response.status_page >= 400)
        $toast.error('Could not retrive cost with given ID, refresh the page');
    else
        costTypeData.value = (response.data as { cost_type: CostTypeModel}).cost_type
}

async function updateCostType(data: FormData) {
    
}
</script>

<template>
    <UiSectionHeader>
        <h1>{{ costTypeData.name }} (cost type) - edit</h1>
        <UiAction variant="accent" href="/costs/types" kind="link">
            <font-awesome-icon icon="fa-solid fa-backward" />
            Go Back
        </UiAction>
    </UiSectionHeader>
    <FormKit type="form" :actions="false" form-class="column-flow" @submit="updateCostType">
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

        <UiAction class="add-to-list">
            <font-awesome-icon icon="fa-solid fa-pen-nib" />
            Update
        </UiAction>
    </FormKit>
</template>