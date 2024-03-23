<script setup lang="ts"></script>

<template>
    <div class="user-profile">
        <NuxtLink to="profile">
            <font-awesome-icon icon="fa-solid fa-user" />
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--clr-neutral-light-gray);
    color: var(--clr-black);
    font-size: 1.4rem;
}
</style>