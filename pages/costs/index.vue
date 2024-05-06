<script setup lang="ts">
import type { ApiResponse, CostsResponse } from '~/types/api';
import type { CostsModel } from '~/types/general';
const { $api, $toast } = useNuxtApp();
const route = useRoute();
const page = Number(route.query.page) || 1;
const appStore = useAppStore();
const uiStore = useUiStore();
const isLoading = ref(false);
const data = ref<CostsModel[]>([]);
const deleteModalOpened = ref(false);
const rowSelectedId = ref<null | number>(null);
const formOpened = ref(false); 

createPager(`costs`, page, 15);
createFilter(`costs`, {
    cost_type_name: '',
    start_date: null,
    end_date: null,
});

const pager = computed(() => appStore.pagers[`costs`]);
const filterObject = computed(() => appStore.filters['costs']);
const router = useRouter();

const fetchParams = computed(() => {
    let params: Record<string, unknown> = {};
    if (filterObject.value.data().cost_type_name)
        params.cost_type_name = filterObject.value.data().cost_type_name;
    if (filterObject.value.data().start_date)
        params.start_date = filterObject.value.data().start_date;
    if (filterObject.value.data().end_date)
        params.end_date = filterObject.value.data().end_date;
    params.page = pager.value?.currentPage || 1;
    return params;
});

async function fetchCosts () {
    isLoading.value = true;
    const response = await $api.get<ApiResponse<CostsResponse>>('costs', fetchParams.value);
    if(response.status_page === 200)
    {
        data.value = (response.data as CostsResponse).costs.data;
        updatePager('costs', (response.data as CostsResponse).costs);
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
        const response = await $api.delete<ApiResponse<string>>(`costs/${rowSelectedId.value}`)
        if(response.status_page >= 400)
            $toast.error('Could not delete given row, please try again!');
        else {
            await fetchCosts();
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

await fetchCosts();
</script>

<template>
    <section>
        <UiSectionHeader>
            <h1>Costs</h1>
            <UiAction @click="formOpened = true">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Add new cost
            </UiAction>
        </UiSectionHeader>
    </section>
    <main>
        <OrganismFilters identifier="costs" @changed="fetchCosts" :is-loading="isLoading">
            <FormKit
                v-model="filterObject.cost_type_name"
                id="cost_type_name"
                type="text"
                label="Cost type name"
                name="cost_type_name"
                placeholder="Limit name"
            />
            <FormKit
                v-model="filterObject.start_date"
                id="start_date"
                type="date"
                label="Start date"
                name="start_date"
                placeholder="Start date"
            />
            <FormKit
                v-model="filterObject.end_date"
                id="end_date"
                type="date"
                label="End date"
                name="end_date"
                placeholder="End date"
            />
        </OrganismFilters>
        <MoleculesList 
                :items="data" 
                class="form-list" 
                @edit-row="($event) => $event.id ? router.push({ name: 'costs-id', params: { id: $event.id }}) : undefined"
                @delete-row="($event) => $event.id ? handleDeleteClick($event.id as number) : undefined"
            >
                <template #row="{ item }">
                    <AtomsListItem :item="item">
                        <template #item="{ entry }">
                            <div class="list-item-entry">
                                <span class="list-item-label">Name:</span>
                                <span>{{ (entry as CostsModel).cost_type.name }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Price ($):</span>
                                <span>{{ (entry as CostsModel).price }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Description:</span>
                                <span>{{ (entry as CostsModel).desc }}</span>
                            </div>
                            <div class="list-item-entry">
                                <span class="list-item-label">Date:</span>
                                <span>{{ (entry as CostsModel).date }}</span>
                            </div>
                        </template>
                    </AtomsListItem>
                </template>
            </MoleculesList>
    </main>
    <OrganismConfirm v-model="deleteModalOpened" @reject="handleReject" @confirm="handleDeletion"/>
    <CostsForm :modal-opened="formOpened" @update:model-value="formOpened = $event" @refetch="fetchCosts" />
</template>