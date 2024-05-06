<script setup lang="ts">
import type { ApiResponse, StatsModel } from '~/types/api';
import { getCurrentDate, getFirstDayOfMonth, getFirstDayOfQuarter, getFirstDayOfYear } from '~/utils/getProperDate';
interface Props {
    type: "daily" | "monthly" | "quarterly" | "yearly";
}

const props = defineProps<Props>();
const { $api, $toast } = useNuxtApp();
const selectedDate = ref<string>('');
const data = ref<StatsModel[]>([]);

const defaultDate = computed(() => {
    const currentDate = new Date();
    switch(props.type){
        case 'daily':
            return getCurrentDate();
        case 'monthly':
            return getFirstDayOfMonth(currentDate);
        case 'quarterly': 
            return getFirstDayOfQuarter(currentDate);
        case 'yearly':
            return getFirstDayOfYear(currentDate);
        default:
            return '';
    }
})

selectedDate.value = defaultDate.value;

async function fetchStats() {
    const response = await $api.get<ApiResponse<StatsModel[]>>(`${props.type}/costs/stats?date=${selectedDate.value}`);
    if(response.status_page === 200)
    {
        data.value = (response.data as StatsModel[]);
    }
    if(response.status_page >= 400)
        $toast.error('We could not retrive stats for this period, please try again by navigating back and forth');
}

await fetchStats();
</script>

<template>
    <section>
        <UiSectionHeader>
            <h2>Your expenses stats</h2>
        </UiSectionHeader>
        <main>
            <div class="filters">
                <FormKit
                    name="date"
                    type="date"
                    label="Date"
                    v-model="selectedDate"
                    @update:model-value="fetchStats"
                />
            </div>
        </main>
    </section>
</template>

<style lang="scss" scoped>
.filters {
    max-width: 400px;
}
</style>