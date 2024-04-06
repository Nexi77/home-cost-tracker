<script setup lang="ts">
import type { ApiResponse, CostTypeResponse } from '~/types/api';
import type {  CostTypeModel } from '~/types/general';

interface FormData {
    name: string;
    desc: string;
}

const listOfTypesToCreate = ref<CostTypeModel[]>([]);
const { $api } = useNuxtApp();
const authStore = useAuthStore();
const modalOpened = ref(false);
const data = ref<CostTypeResponse | null>(null);
const suggestion = ref('Food and Dining')
const suggestionList = ref([
    { name: 'Food and Dining', desc: 'Keep track of your grocery shopping and dining-out expenses.'},
    { name: 'Housing and Utilities', desc: 'Track your rent, electricity, water, and other home-related bills.'},
    { name: 'Healthcare', desc: 'Stay informed about your medical expenses, including doctor visits and prescriptions.'},
    { name: 'Clothing and Footwear', desc: 'Stay stylish while tracking your clothing purchases and shoe expenses.'},
    { name: 'Technology and Electronics', desc: 'Stay up-to-date on your tech purchases, from phones to gadgets.'},
]);
const radioOptions = computed(() => {
    return suggestionList.value.map(suggestion => ({ label: suggestion.name, value: suggestion.name, help: suggestion.desc }))
})
const selectedSuggestionObject = computed(() => suggestionList.value.find(sug => sug.name === suggestion.value))

async function fetchCostTypes () {
    const response = await $api.get<ApiResponse<CostTypeResponse>>('cost-types');
    if(response.status_page === 200)
        data.value = response.data as CostTypeResponse;
}

function handleModal () {
    modalOpened.value = true;
}

async function handleAdd(data: FormData){
    listOfTypesToCreate.value.push(data);
}

function handleRowDelete(index: number) {
    listOfTypesToCreate.value.splice(index, 1);
}

fetchCostTypes();
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
        </main>
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
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="handleAdd">
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

                        <UiAction class="add-to-list">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                            Add
                        </UiAction>
                </FormKit>
                <h3>Selected types:</h3>
                <MoleculesList 
                    :items="listOfTypesToCreate" 
                    class="form-list" 
                    @delete-row="handleRowDelete"
                    :actions-to-hide="['edit']"
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
</style>