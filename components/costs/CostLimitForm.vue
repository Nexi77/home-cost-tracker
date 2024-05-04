<script setup lang="ts">
import type { ApiError, ApiResponse, CostTypeResponse } from '~/types/api';
import type { CostTypeModel } from '~/types/general';

interface Props {
    modalOpened: boolean;
}
interface Emits {
    (e: 'update:model-value', value: boolean): void;
    (e: 'refetch'): void;
}

interface FormData {
    cost_type_id: number;
    weekly_limit: string;
    monthly_limit: string;
    quarter_limit: string;
    yearly_limit: string;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
const isLoading = ref(false);
const { $api, $toast } = useNuxtApp();
const authStore = useAuthStore();

const costTypes = ref<CostTypeModel[]>([]);
const costTypesOptions = computed(() => {
    return costTypes.value.map(type => ({ label: type.name, value: type.id }))
})

async function fetchCostTypes () {
    isLoading.value = true;
    const response = await $api.get<ApiResponse<CostTypeResponse>>('cost-types');
    if(response.status_page === 200)
    {
        costTypes.value = (response.data as CostTypeResponse).cost_types.data;
    }
    isLoading.value = false;
}

async function saveNewLimit(data: FormData){
    try {
        isLoading.value = true;
        const limitData = { ...data, user_id: authStore.data?.id };
        const response = await $api.post<ApiResponse<CostTypeModel>>('cost-types-limits', limitData);
        if(response.status_page >= 400) {
            const resData = response.data as ApiError;
            const { message } = resData;
            $toast.error(message);
            return;
        }
        $toast.success(response.data.message);
        emits('update:model-value', false);
        emits('refetch');
    }
    catch(err) {
        console.error(err);
    }
    finally {
        isLoading.value = false;
    }
}

await fetchCostTypes();
</script>


<template>
    <UiDialog :model-value="modalOpened" width="600px" @update:model-value="emits('update:model-value', $event)">
            <template #header>
                Add cost type limit
            </template>
            <div>
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="saveNewLimit">
                    <FormKit
                        id="cost_type"
                        type="select"
                        label="Cost type"
                        name="cost_type_id"
                        :options="costTypesOptions"
                        :validation-messages="{ required: 'Cost type is required'}"
                        placeholder="Cost type"
                        validation="required"
                        validation-visibility="blur"
                    /> 
                    <FormKit
                        id="weekly_limit"
                        type="text"
                        label="Weekly limit ($)"
                        name="weekly_limit"
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
                        :validation-messages="{ required: 'Yearly limit is required'}"
                        placeholder="Yearly limit"
                        validation="required"
                        validation-visibility="blur"
                    /> 
                    <UiAction class="add-to-list" :is-loading="isLoading">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Create
                    </UiAction>
                </FormKit>
            </div>
        </UiDialog>
</template>