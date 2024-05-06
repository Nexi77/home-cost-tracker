<script setup lang="ts">
import type { ApiError, ApiResponse, CostTypeResponse } from '~/types/api';
import type { CostTypeModel, CostsModel } from '~/types/general';
import { getCurrentDate } from '~/utils/getProperDate';

interface Props {
    modalOpened: boolean;
}
interface Emits {
    (e: 'update:model-value', value: boolean): void;
    (e: 'refetch'): void;
}

interface FormData {
    cost_type_id: number;
    desc: string;
    price: string;
    date?: string;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
const isLoading = ref(false);
const { $api, $toast } = useNuxtApp();

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

async function saveNewCost(data: FormData){
    try {
        isLoading.value = true;
        const limitData = { ...data, date: data.date ? data.date : getCurrentDate() };
        const response = await $api.post<ApiResponse<CostsModel>>('costs', limitData);
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
                Add cost
            </template>
            <div>
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="saveNewCost">
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
                        id="desc"
                        type="text"
                        label="Description of cost"
                        name="desc"
                        :validation-messages="{ required: 'Description is required'}"
                        placeholder="Description"
                        validation="required"
                        validation-visibility="blur"
                    /> 
                    <FormKit
                        id="price"
                        type="text"
                        label="Price"
                        name="price"
                        :validation-messages="{ required: 'Price is required'}"
                        placeholder="Price"
                        validation="required"
                        validation-visibility="blur"
                    />
                    <FormKit
                        id="date"
                        type="date"
                        label="Date"
                        name="date"
                        help="If you do not provide date, than the current one will be used"
                        placeholder="Date"
                    /> 
                    <UiAction class="add-to-list" :is-loading="isLoading">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Create
                    </UiAction>
                </FormKit>
            </div>
        </UiDialog>
</template>