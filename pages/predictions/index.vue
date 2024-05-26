<script setup lang="ts">
import type { ChartData } from 'chart.js';
import type { ApiResponse, PredictionModel, PredictionsResponse } from '~/types/api';
import type { CostTypeModel } from '~/types/general';
import { getRandomColor } from '~/utils/genRandomColor';

const { $api, $toast } = useNuxtApp();
const isLoading = ref(false);
const predictions = ref<Record<string, PredictionModel[]> | null>(null);
const costTypes = ref<CostTypeModel[]>([]);

async function getTypesWithoutPagination() {
    try {
        const response = await $api.get<ApiResponse<{ cost_types: CostTypeModel[] }>>(`cost-types-without-pagination`)
        if(response.status_page >= 400)
            return;
        else {
            costTypes.value = (response.data as { cost_types: CostTypeModel[]}).cost_types;
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function fetchPredictions () {
    isLoading.value = true;
    const response = await $api.get<ApiResponse<PredictionsResponse>>('predictions');
    if(response.status_page === 200)
    {
        predictions.value = (response.data as PredictionsResponse).predictions;
    }
    else {
        $toast.error('Could not fetch any predictions for current month')
    }
    isLoading.value = false;
}

// Create a mapping from id to name
const idToName = computed(() => {
    const mapping: { [key: number]: string } = {};
    costTypes.value.forEach(category => {
        mapping[category.id] = category.name;
    });
    return mapping;
});


const datasets = computed(() => {
    if(!predictions.value) return [];
    return Object.entries(predictions.value).map(([key, value]) => ({
        label: idToName.value[Number(key)] || `Series ${key}`,
        data: value.map(item => item.predicted_price),
        borderColor: getRandomColor(),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
    }));
});

const allDates = computed(() => {
    if(!predictions.value) return [];
    const dates = new Set();
    Object.values(predictions.value).forEach(array => {
        array.forEach(item => {
            dates.add(item.date);
        });
    });
    return Array.from(dates).sort();
});

const chartData = computed<ChartData<"line">>(() => {
    return {
        labels: allDates.value, // Ensure dates are sorted
        datasets: datasets.value
    } as ChartData<"line">;
});

await getTypesWithoutPagination();
await fetchPredictions();
</script>

<template>
    <section>
        <UiSectionHeader>
            <h1>Predictions</h1>
        </UiSectionHeader>
        <main>
            <MoleculesPredictionsChart :chart-data="chartData" />
        </main>
    </section>
</template>