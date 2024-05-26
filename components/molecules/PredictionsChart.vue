<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, type ChartData } from 'chart.js'

interface Props {
    chartData: ChartData<"line">
}

defineProps<Props>();
const chartOptions = ref({
    plugins: {
        title: {
            display: true,
            text: 'Predicted Prices Over Time',
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            ticks: {
                callback: function(value: string | number) {
                    return `${value} ($)`;
                }
            }
        }
    },
})

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
</script>

<template>
    <section>
        <h2>Predicted Prices Over Time</h2>
        <div class="wrapper-wrapper">
            <div class="chart-wrapper" v-if="chartData.datasets.length">
                <Line
                    ref="chart"
                    :options="chartOptions"
                    :data="chartData"
                />
            </div>
            <div v-else class="no-prediction">No enough costs added for current month to make a prediction</div>
        </div>
    </section>
</template>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
    }
    .wrapper-wrapper {
        flex-grow: 1;
        overflow: auto;
        max-width: calc(100vw - 100px);

        @media screen and (min-width: 768px){
            max-width: calc(100vw - 400px);
        }
    }
    .chart-wrapper {
        position: relative;
        min-width: 600px;
        min-height: 600px;
    }

    .no-prediction {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--clr-accent);
        color: var(--clr-white);
        border-radius: var(--base-radius);
    }
</style>
