<template>
    <span class="loader"></span>
</template>

<style lang="scss" scoped>
.loader {
    width: 35px;
    aspect-ratio: 1;
    border: 5px solid #FFF;
    border-bottom-color: var(--clr-primary-red);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>