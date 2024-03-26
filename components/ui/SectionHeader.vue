<template>
    <div class="section-header">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;

    @media screen and (min-width: 400px) {
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>