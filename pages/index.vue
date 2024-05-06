<script setup lang="ts">
</script>

<template>
    <section>
        <UiSectionHeader>
            <h1>Select time period</h1>
        </UiSectionHeader>
        <UiTabs :active-index="1">
            <UiTab title="Daily" :index="0">
                <OrganismStats type="daily" />
            </UiTab>
            <UiTab title="Monthly" :index="1">
                <OrganismStats type="monthly" />
            </UiTab>
            <UiTab title="Quarterly" :index="2">
                <OrganismStats type="quarterly" />
            </UiTab>
            <UiTab title="Yearly" :index="3">
                <OrganismStats type="yearly" />
            </UiTab>
        </UiTabs>
    </section>
</template>