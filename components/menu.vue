<script setup lang="ts">
import { useUiStore } from '~/stores/ui';
import type { ApiResponse } from '~/types/api';
const uiStore = useUiStore();
const authStore = useAuthStore();

async function handleLogout() {
    const { $api } = useNuxtApp();
    const { $toast } = useNuxtApp();
    const response = await $api.post<ApiResponse<{ message: string }>>('logout');
    if(response.status_page >= 400) {
        $toast.error('Could not log out, try again');
        return;
    }
    authStore.token = '';
    navigateTo('/login');
}
</script>

<template>
    <nav :class="{'expanded': uiStore.menuOpened}">
        <button type="button" class="menu-toggle" title="Press to close the menu" @click="uiStore.menuOpened = false">
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <NuxtLink to="/">
            <img src="~/assets/images/logo.png" alt="budget boss" class="logo"/>
        </NuxtLink>
        <ul>
            <li>
                <NuxtLink to="/">
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    <span>Costs</span>
                </NuxtLink>
            </li>
        </ul>
        <UiAction class="logout" variant="accent" @click="handleLogout">
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
            Logout
        </UiAction>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    background-color: var(--clr-neutral-light-gray);
    min-width: 250px;
    padding: 1rem;
    display: flex;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    align-items: center;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
    a {
        align-self: center;
    }
    .logo {
        mix-blend-mode: darken;
        max-width: 180px;
        margin-bottom: 5rem;
    }

    &.expanded {
        transform: translateX(0);
    }

    .menu-toggle {
        display: none;
    }

    @media screen and (max-width: 768px) {
        transform: translateX(-100vw);
        position: absolute;
        inset: 0;
        .menu-toggle {
            display: inline-block;
        }
    }
}
.logout {
    margin-top: auto;
    display: flex;
    gap: 10px;
    align-items: center;
}
.menu-toggle {
    border: 0;
    background-color: 0;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 1.3rem;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 30px;
    a {
        color: var(--clr-font-gray-blue);
        display: flex;
        padding: 1rem 1.5rem;
        border-radius: var(--base-radius);
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.2rem;
        gap: 10px;
        img {
            max-width: 50px;
        }

        &.router-link-exact-active {
            background-color: var(--clr-primary-red);
            color: var(--clr-white);
        }
    }
}
</style>