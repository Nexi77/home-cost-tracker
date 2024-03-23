import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) =>
{
    // const authStore = useAuthStore();
    // const isUnauthorizedPage = ['login', 'register'].includes((to.name ?? '') as string);

    // if (authStore.token && isUnauthorizedPage)
    //     return navigateTo('/');

    // if (authStore.token || isUnauthorizedPage)
    //     return;

    // return navigateTo({ name: 'login' });
});
