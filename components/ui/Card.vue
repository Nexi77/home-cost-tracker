<template>
    <div class="card">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.card {
    background-color: var(--clr-white);
    padding: 1rem;
    border-radius: var(--base-radius);
    box-shadow: 4px 18px 14px -17px rgb(0, 0, 0);
    @media screen and (min-width: 768px){
        padding: 2.5rem;
    }
}
</style>