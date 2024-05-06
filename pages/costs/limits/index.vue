<script setup lang="ts">
import type { ApiResponse, CostLimitResponse } from '~/types/api';
import type { CostLimitModel } from '~/types/general';

const { $api, $toast } = useNuxtApp();
const route = useRoute();
const page = Number(route.query.page) || 1;
const appStore = useAppStore();
const uiStore = useUiStore();
const isLoading = ref(false);
const data = ref<CostLimitModel[]>([]);
const deleteModalOpened = ref(false);
const rowSelectedId = ref<null | number>(null);
const formOpened = ref(false);

createPager(`cost-limits`, page, 15);
createFilter(`cost-limits`, {
    cost_type_name: '',
});

const router = useRouter();
const pager = computed(() => appStore.pagers[`cost-types`]);
const filterObject = computed(() => appStore.filters['cost-limits']);

const fetchParams = computed(() => {
    let params: Record<string, unknown> = {};
    if (filterObject.value.data().cost_type_name)
        params.name = filterObject.value.data().name;
    params.page = pager.value?.currentPage || 1;
    return params;
})


async function fetchCostLimits () {
    isLoading.value = true;
    const response = await $api.get<ApiResponse<CostLimitResponse>>('cost-types-limits', fetchParams.value);
    if(response.status_code === 200 || response.status_page === 200)
    {
        data.value = (response.data as CostLimitResponse).cost_type_limits.data
        updatePager('cost-limits', (response.data as CostLimitResponse).cost_type_limits);
    }
    isLoading.value = false;
}

function handleDeleteClick(id: number) {
    rowSelectedId.value = id;
    deleteModalOpened.value = true;
}

function handleReject() {
    deleteModalOpened.value = false;
    rowSelectedId.value = null;
}

async function handleDeletion() {
    try {
        uiStore.fullSiteLoad = true;
        deleteModalOpened.value = false;
        if (!rowSelectedId.value) {
            return $toast.error('Row ID is not selected, please try again!');
        }
        const response = await $api.delete<ApiResponse<string>>(`cost-types-limits/${rowSelectedId.value}`)
        if(response.status_page >= 400)
            $toast.error('Could not delete given row, please try again!');
        else {
            await fetchCostLimits();
            $toast.success('Sucessfully deleted an entry');
        }
    }
    catch (err) {
        console.error(err);
    }
    finally {
        uiStore.fullSiteLoad = false;
        rowSelectedId.value = null;
    }
}

fetchCostLimits();
</script>

<template>
    <section>
        <UiSectionHeader>
            <h1>Cost type limits</h1>
            <UiAction @click="formOpened = true">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Add new limit
            </UiAction>
        </UiSectionHeader>
        <main>
            <OrganismFilters identifier="cost-types-limits" @changed="fetchCostLimits" :is-loading="isLoading">
                <FormKit
                    v-model="filterObject.name"
                    id="cost_type_name"
                    type="text"
                    label="Cost type name"
                    name="cost_type_name"
                    placeholder="Limit name"
                /> 
            </OrganismFilters>
            <MoleculesList 
                :items="data" 
                class="form-list" 
                @edit-row="($event) => $event.id ? router.push({ name: 'costs-limits-id', params: { id: $event.id }}) : undefined"
                @delete-row="($event) => $event.id ? handleDeleteClick($event.id as number) : undefined"
            >
                <template #row="{ item }">
                    <AtomsListItem :item="item">
                        <template #item="{ entry }">
                            <div class="list-item-entry">
                                <span class="list-item-label">Name:</span>
                                <span>{{ (entry as CostLimitModel).cost_type.name }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Weekly limit ($):</span>
                                <span>{{ (entry as CostLimitModel).weekly_limit }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Monthly limit ($):</span>
                                <span>{{ (entry as CostLimitModel).monthly_limit }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Quarter limit ($):</span>
                                <span>{{ (entry as CostLimitModel).quarter_limit }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Yearly limit ($):</span>
                                <span>{{ (entry as CostLimitModel).yearly_limit }}</span>
                            </div>
                        </template>
                    </AtomsListItem>
                </template>
            </MoleculesList>
        </main>
        <OrganismConfirm v-model="deleteModalOpened" @reject="handleReject" @confirm="handleDeletion"/>
        <CostsCostLimitForm :modal-opened="formOpened" @update:model-value="formOpened = $event" @refetch="fetchCostLimits" />
    </section>
</template>