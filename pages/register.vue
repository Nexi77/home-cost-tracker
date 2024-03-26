<script setup lang="ts">
import type { ApiError, ApiResponse, RegisterResponse } from '~/types/api';
import type { FormKitNode } from '@formkit/core'
definePageMeta({
    layout: 'logged-out'
});

interface FormData {
    name: string;
    email: string;
    password: string;
}

const isLoading = ref(false);
const { $api, $toast } = useNuxtApp();


async function handleSubmit (formData: FormData, node: FormKitNode) {
    isLoading.value = true;
    const response = await $api.post<ApiResponse<RegisterResponse>>('register', formData);
    isLoading.value = false;
    if (response.status_page >= 400) {
        const resData = response.data as ApiError;
        const { message, errors } = resData;
        $toast.error(message);
        node.setErrors([], errors)
        return;
    }
    $toast.success('Your registration is complete, you can now log in');
    navigateTo('/login')
}
</script>

<template>
    <main class="login-site">
       <section class="intro">
            <h1>Take control of your budget.</h1>
            <p>Welcome to the budget management platform, where financial control is simple and effective. With our tools, track expenses, plan savings, and build a stable financial foundation. Join our community and start managing your budget today.</p>
       </section>
       <section class="form">
            <UiAction variant="accent" kind="link" href="login">Have an account? Signin</UiAction>
            <UiCard>
                <FormKit type="form" :actions="false" form-class="column-flow" @submit="handleSubmit">
                    <FormKit
                        id="name"
                        type="text"
                        name="name"
                        :validation-messages="{ required: 'Name is required'}"
                        placeholder="Name"
                        validation="required"
                        validation-visibility="blur"
                    /> 
                    <FormKit
                        id="email"
                        type="email"
                        name="email"
                        validation="required|email"
                        placeholder="Email Address"
                        validation-visibility="blur"
                    />
                    <FormKit
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        validation="required|length:8"
                        validation-visibility="blur"
                    />
                    <UiAction type="submit" :is-loading="isLoading">
                        <span>Create account</span>
                    </UiAction>
                </FormKit>
            </UiCard>
       </section>
    </main>
</template>