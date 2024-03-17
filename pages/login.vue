<script setup lang="ts">
definePageMeta({
    layout: 'logged-out'
});
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
                <form class="column-flow">
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <UiAction type="submit">
                        <span>Sign in</span>
                    </UiAction>
                </form>
            </UiCard>
       </section>
    </main>
</template>