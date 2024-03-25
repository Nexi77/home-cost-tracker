<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
    <div class="user-profile">
        <NuxtLink to="profile">
            <div class="user-crud" v-if="authStore.data">
                <span class="name">{{ authStore.data.name }}</span>
                <span>My profile</span>
            </div>
            <div class="user-avatar">
                <font-awesome-icon icon="fa-solid fa-user" />
            </div>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
}
a {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--clr-black);

    &:hover {
        color: var(--clr-accent)
    }
}

.user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--clr-neutral-light-gray);
    color: var(--clr-black);
    font-size: 1.3rem;
}

.user-crud {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    .name {
        font-weight: bold;
    }
}
</style>