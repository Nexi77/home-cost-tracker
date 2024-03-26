import { useAuthStore, type UserData } from "~/stores/auth";
import type { ApiResponse, UserResponse } from "~/types/api";

export default defineNuxtRouteMiddleware(async (to) =>
{
    const authStore = useAuthStore();
    const isUnauthorizedPage = ['login', 'register'].includes((to.name ?? '') as string);

    if(authStore.token && authStore.data === null) {
        const { $api } = useNuxtApp();
        $api.setHeader({Authorization: `Bearer ${authStore.token}`})
        const data = await $api.get<ApiResponse<UserResponse>>('user')
        if (data.status_page >= 400)
            return navigateTo('/login');
        authStore.data = (data.data as UserResponse).user;
    }
    if (authStore.token && isUnauthorizedPage)
        return navigateTo('/');

    if (authStore.token || isUnauthorizedPage)
        return;
    return navigateTo({ name: 'login' });
});
