<script setup lang="ts">
definePageMeta({
    layout: 'logged-out'
});

interface FormData {
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
                    <UiAction type="submit">
                        <span>Sign in</span>
                    </UiAction>
                </FormKit>
            </UiCard>
       </section>
    </main>
</template>