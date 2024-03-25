<script setup lang="ts">
import type { FormKitNode } from '@formkit/core';
import type { ApiError, ApiResponse, LoginResponse } from '~/types/api';
import { useAuthStore } from '~/stores/auth'


definePageMeta({
    layout: 'logged-out'
});

interface FormData {
    email: string;
    password: string;
}

const isLoading = ref(false);
const authStore = useAuthStore()

async function handleSubmit (formData: FormData, node: FormKitNode) {
    const { $api } = useNuxtApp();
    const { $toast } = useNuxtApp()
    isLoading.value = true;
    const response = await $api.post<ApiResponse<LoginResponse>>('login', formData);
    isLoading.value = false;
    if (response.status_page >= 400) {
        const resData = response.data as ApiError;
        const { message, errors } = resData;
        $toast.error(message);
        node.setErrors([], errors)
        return;
    }
    const token = (response.data as LoginResponse).token;
    authStore.token = token;
    navigateTo('/')
}
</script>

<template>
    <main class="login-site">
       <section class="intro">
            <h1>Welcome!</h1>
            <p>You can use the form here, to log in and take control of your finances easily, don't waste more time, as time is money.</p>
       </section>
       <section class="form">
            <UiAction variant="accent" kind="link" href="register">Wanna join? Sign up</UiAction>
            <UiCard>
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="handleSubmit">
                    <FormKit
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        validation="required|email"
                        validation-visibility="blur"
                    />
                    <FormKit
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        validation="required"
                        validation-visibility="blur"
                    />
                    <UiAction type="submit" :is-loading="isLoading">
                        <span>Sign in</span>
                    </UiAction>
                </FormKit>
            </UiCard>
       </section>
    </main>
</template>