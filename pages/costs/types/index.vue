<script setup lang="ts">
import type { ApiError, ApiResponse, CostTypeResponse, UserResponse } from '~/types/api';
import type {  CostTypeModel } from '~/types/general';

interface FormData {
    name: string;
    desc: string;
}

const route = useRoute();
const page = Number(route.query.page) || 1;
const { $api, $toast } = useNuxtApp();
const authStore = useAuthStore();
const appStore = useAppStore();
const modalOpened = ref(false);
const isLoading = ref(false);
const uiStore = useUiStore();
const deleteModalOpened = ref(false);
const rowSelectedId = ref<null | number>(null);
const data = ref<CostTypeModel[]>([]);
const suggestion = ref('Food and Dining');
const suggestionList = ref([
    { name: 'Food and Dining', desc: 'Keep track of your grocery shopping and dining-out expenses.'},
    { name: 'Housing and Utilities', desc: 'Track your rent, electricity, water, and other home-related bills.'},
    { name: 'Healthcare', desc: 'Stay informed about your medical expenses, including doctor visits and prescriptions.'},
    { name: 'Clothing and Footwear', desc: 'Stay stylish while tracking your clothing purchases and shoe expenses.'},
    { name: 'Technology and Electronics', desc: 'Stay up-to-date on your tech purchases, from phones to gadgets.'},
]);
const radioOptions = computed(() => {
    return suggestionList.value.map(suggestion => ({ label: suggestion.name, value: suggestion.name, help: suggestion.desc }));
});
const selectedSuggestionObject = computed(() => suggestionList.value.find(sug => sug.name === suggestion.value));
createPager(`cost-types`, page, 15);
createFilter(`cost-types`, {
    name: ''
});

const pager = computed(() => appStore.pagers[`cost-types`]);
const filterObject = computed(() => appStore.filters['cost-types']);

const fetchParams = computed(() => {
    let params: Record<string, unknown> = {};
    if (filterObject.value.data().name)
        params.name = filterObject.value.data().name;
    params.page = pager.value?.currentPage || 1;
    return params;
})

async function fetchCostTypes () {
    isLoading.value = true;
    const response = await $api.get<ApiResponse<CostTypeResponse>>('cost-types', fetchParams.value);
    if(response.status_page === 200)
    {
        data.value = (response.data as CostTypeResponse).cost_types.data
        updatePager('cost-types', (response.data as CostTypeResponse).cost_types);
    }
    isLoading.value = false;
}

function handleModal () {
    modalOpened.value = true;
}

async function saveNewCost(data: FormData){
    try {
        isLoading.value = true;
        const response = await $api.post<ApiResponse<CostTypeModel>>('cost-types', data);
        if(response.status_page >= 400) {
            const resData = response.data as ApiError;
            const { message } = resData;
            $toast.error(message);
            return;
        }
        $toast.success(response.data.message);
        await $api.patch('user/config');
        const userData = await $api.get<ApiResponse<UserResponse>>('user');
        if(userData.status_page <= 299)
            authStore.data = (userData.data as UserResponse).user;
        await fetchCostTypes();
        modalOpened.value = false;
    }
    catch(err) {
        console.error(err);
    }
    finally {
        isLoading.value = false;
    }
}

function handleReject() {
    deleteModalOpened.value = false;
    rowSelectedId.value = null;
}

function handleDeleteClick(id: number) {
    rowSelectedId.value = id;
    deleteModalOpened.value = true;
}

async function handleDeletion() {
    try {
        uiStore.fullSiteLoad = true;
        deleteModalOpened.value = false;
        if (!rowSelectedId.value) {
            return $toast.error('Row ID is not selected, please try again!');
        }
        const response = await $api.delete<ApiResponse<string>>(`cost-types/${rowSelectedId.value}`)
        if(response.status_page >= 500) {
            $toast.error('You cannot delete cost type that is connected with existing cost');
            return;
        }
        if(response.status_page >= 400)
            $toast.error('Could not delete given row, please try again!');
        else {
            await fetchCostTypes();
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

await fetchCostTypes();
</script>

<template>
    <section>
        <UiSectionHeader>
            <h1>Cost types</h1>
            <UiAction @click="handleModal">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Add new type
            </UiAction>
        </UiSectionHeader>
        <main>
            <template v-if="authStore.data?.is_first_config">
                <div class="new-user-message">
                    <img src="~/assets/images/salesman.webp" />
                    <div class="content">
                        <h2>Looks like it's the first time you're here.</h2>
                        <p>To start using yours best <span class="italic">"Budget Boss"</span>, please <button class="create-button" @click="handleModal">create</button> at least one type of costs, you're going to add in the future.</p>
                    </div>
                </div>
            </template>
                <OrganismFilters identifier="cost-types" @changed="fetchCostTypes" :is-loading="isLoading">
                    <FormKit
                        v-model="filterObject.name"
                        id="filter-name"
                        type="text"
                        label="Name"
                        name="name"
                        placeholder="Name"
                    /> 
                </OrganismFilters>
                <MoleculesList 
                    :items="data" 
                    class="form-list" 
                    @edit-row="($event) => $event.id ? navigateTo({ name: 'costs-types-id', params: { id: $event.id }}) : undefined"
                    @delete-row="($event) => $event.id ? handleDeleteClick($event.id as number) : undefined"
                >
                    <template #row="{ item }">
                        <AtomsListItem :item="item">
                            <template #item="{ entry }">
                                <div class="list-item-entry">
                                    <span class="list-item-label">Name:</span>
                                    <span>{{ (entry as FormData).name }}</span>
                                </div>
                                <div class="list-item-entry">
                                    <span class="list-item-label">Description:</span>
                                    <span> {{ (entry as FormData).desc }}</span>
                                </div>
                            </template>
                        </AtomsListItem>
                    </template>
                </MoleculesList>
                <MoleculesPagination :pager="pager" @change="fetchCostTypes" />
        </main>
        <OrganismConfirm v-model="deleteModalOpened" @reject="handleReject" @confirm="handleDeletion()"/>
        <UiDialog :model-value="modalOpened" width="1200px" @update:model-value="modalOpened = $event">
            <template #header>
                Add cost type
            </template>
            <div>
                <UiAlert variant="accent">
                    <p>You can select type from our suggestions or create one on your own, you can make multiple types at once, the will be listed under the form, when you're ready, submit the list.</p>
                </UiAlert>
                <div class="suggestion-list">
                    <FormKit
                        v-model="suggestion"
                        type="radio"
                        label="Types to choose from"
                        :options="radioOptions"
                    />
                </div>
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="saveNewCost">
                        <FormKit
                            id="name"
                            type="text"
                            label="Name"
                            name="name"
                            :validation-messages="{ required: 'Name is required'}"
                            :model-value="selectedSuggestionObject?.name"
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
                            :model-value="selectedSuggestionObject?.desc"
                            placeholder="Description"
                            validation-visibility="blur"
                        />

                        <UiAction class="add-to-list" :is-loading="isLoading">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                            Add
                        </UiAction>
                </FormKit>
            </div>
        </UiDialog>
    </section>
</template>

<style lang="scss" scoped>
.italic {
    font-style: italic;
}

.create-button {
    background-color: transparent;
    border: 0;
    color: var(--clr-primary-green);
    text-decoration: underline;
}

.form-list {
    margin-top: 0.5rem;
}

.new-user-message {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    align-items: center;

    .content {
        min-width: 200px;
    }
}

.suggestion-list {
    margin-bottom: 1rem;
}

.final {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    button {
        width: 100%;
    }
}
</style>