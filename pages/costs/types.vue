<script setup lang="ts">
import type { ApiResponse, CostTypeResponse } from '~/types/api';

const { $api } = useNuxtApp();
const authStore = useAuthStore();
const modalOpened = ref(false);
const { data } = await $api.get<ApiResponse<CostTypeResponse>>('cost-types');

function handleModal () {
    modalOpened.value = true;
}
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
                        <p>To start using yours best <span class="italic">"Budget Boss"</span>, please <button class="create-button">create</button> at least one type of costs, you're going to add in the future.</p>
                    </div>
                </div>
            </template>
        </main>
        <UiDialog :model-value="modalOpened" width="600px" @update:model-value="modalOpened = $event">
            <template #header>
                Add cost type
            </template>
            <div>
                <UiAlert variant="accent">
                    <p>You can select type from our suggestions or create one on your own, you can make multiple types at once, the will be listed under the form, when you're ready, submit the list.</p>
                </UiAlert>
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
</style>