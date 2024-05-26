<script setup lang="ts">
import { useUiStore } from '~/stores/ui';
import type { ApiResponse } from '~/types/api';
const uiStore = useUiStore();
const authStore = useAuthStore();
const { $api, $toast } = useNuxtApp();
const router = useRouter();

async function handleLogout() {
    const response = await $api.post<ApiResponse<{ message: string }>>('logout');
    if(response.status_page >= 400) {
        $toast.error('Could not log out, try again');
        return;
    }
    authStore.token = '';
    navigateTo('/login');
}

const isPartOfRoute = (parentPath: string, exact = false) => {
    if (exact)
        return router.currentRoute.value.fullPath === parentPath || router.currentRoute.value.matched.some(match => match.path.includes(`${parentPath}/:id()`));
    return router.currentRoute.value.fullPath.startsWith(parentPath);
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
                <NuxtLink to="/costs" :class="{ 'router-link-active': isPartOfRoute('/costs', true)}">
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    <span>Costs</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/costs/types" :class="{ 'router-link-active': isPartOfRoute('/costs/types')}">
                    <font-awesome-icon icon="fa-solid fa-calculator" />
                    <span>Cost types</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/costs/limits" :class="{ 'router-link-active': isPartOfRoute('/costs/limits')}">
                    <font-awesome-icon icon="fa-solid fa-shop" />
                    <span>Cost limits</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/predictions" :class="{ 'router-link-active': isPartOfRoute('/predictions')}">
                    <font-awesome-icon icon="fa-solid fa-brain" />
                    <span>Predictions</span>
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
        justify-content: center;
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

        &.router-link-active {
            background-color: var(--clr-primary-red);
            color: var(--clr-white);
        }
    }
}
</style>