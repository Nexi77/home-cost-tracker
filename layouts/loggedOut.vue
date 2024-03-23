<template>
    <div class="layout logged-out-layout">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.logged-out-layout {
    color: var(--clr-white);
    min-height: 100vh;
    background-color: var(--clr-primary-red);
    padding-inline: 1rem;
    background-image: url('../assets/images/bg-intro-mobile.png');
    padding-block: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 1440px) {
        background-image: url('../assets/images/bg-intro-desktop.png');
        justify-content: center;
    }
}
</style>