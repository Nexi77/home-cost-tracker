<script setup lang="ts">
definePageMeta({
    layout: 'logged-out'
});

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

function handleSubmit (data: FormData) {
    console.log(data);
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
                        id="first_name"
                        type="text"
                        name="first_name"
                        :validation-messages="{ required: 'First name is required'}"
                        placeholder="First Name"
                        validation="required"
                        validation-visibility="blur"
                    /> 
                    <FormKit
                        id="last_name"
                        type="text"
                        name="last_name"
                        :validation-messages="{ required: 'Last name is required'}"
                        placeholder="Last Name"
                        validation="required"
                        validation-visibility="blur"
                    /> 
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
                    <UiAction type="submit">
                        <span>Create account</span>
                    </UiAction>
                </FormKit>
            </UiCard>
       </section>
    </main>
</template>