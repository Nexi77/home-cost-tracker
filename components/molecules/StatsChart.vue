<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, type ChartData } from 'chart.js'

interface Props {
    chartData: ChartData<"bar">
}

defineProps<Props>();
const chartOptions = ref({
    plugins: {
        title: {
            display: true,
            text: 'Expenses chart',
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<template>
    <section>
        <h2>Expenses over time</h2>
        <div class="wrapper-wrapper">
            <div class="chart-wrapper">
                <Bar
                    ref="chart"
                    :options="chartOptions"
                    :data="chartData"
                />
            </div>
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
</style>