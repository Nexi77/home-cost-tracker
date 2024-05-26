<script setup lang="ts">
import type { ChartData, ChartDataset } from 'chart.js';
import type { ApiResponse, StatsModel } from '~/types/api';
import { getRandomColor } from '~/utils/genRandomColor';
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
    const response = await $api.get<ApiResponse<{ data: StatsModel[] }>>(`${props.type}/costs/stats?date=${selectedDate.value}`);
    if(response.status_page === 200)
    {
        data.value = ((response.data) as { data: StatsModel[] }).data;
    }
    if(response.status_page >= 400)
        $toast.error('We could not retrive stats for this period, please try again by navigating back and forth');
}


const summedPrices = computed(() => {
    const accumulator: { [key: string]: number[] } = {};
    data.value.forEach(entry => {
        if (!accumulator[entry.cost_type_name]) {
        accumulator[entry.cost_type_name] = [];
        }
        accumulator[entry.cost_type_name].push(Number(entry.price));
    });
    const result: { [key: string]: number } = {};
    for (const label in accumulator) {
        if (accumulator.hasOwnProperty(label)) {
        result[label] = accumulator[label].reduce((total, price) => total + price, 0);
        }
    }
    return result;
});


const chartData = computed<ChartData<"bar">>(() => {
    const labels = Object.keys(summedPrices.value);
    const prices = Object.values(summedPrices.value);

    const datasets: ChartDataset<"bar">[] = labels.map((label, index) => ({
      label,
      data: [prices[index]],
      backgroundColor: getRandomColor(),
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1
    }));

    return {
        labels: ['Costs'],
        datasets,
    };
});
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
            <MoleculesStatsChart :chart-data="chartData" />
        </main>
    </section>
</template>

<style lang="scss" scoped>
.filters {
    max-width: 400px;
}

section {
    width: 100%;
    max-width: 1200px;
}
</style>