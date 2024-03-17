<script setup lang="ts">
definePageMeta({
    layout: 'logged-out'
});
</script>

<template>
    <main class="login-site">
       <section class="intro">
            <h1>Take control of your budget.</h1>
            <p>Welcome to the budget management platform, where financial control is simple and effective. With our tools, track expenses, plan savings, and build a stable financial foundation. Join our community and start managing your budget today.</p>
       </section>
       <section class="form">
            <!-- <UiAction variant="accent" kind="link" href="login">Have an account? Signin</UiAction> -->
            <UiCard>
                <form class="column-flow">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <!-- <UiAction type="submit">
                        <span>Create account</span>
                    </UiAction> -->
                </form>
            </UiCard>
       </section>
    </main>
</template>

<style lang="scss" scoped>
.login-site {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;

    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        letter-spacing: 0.5px;
        max-width: 400px;
    
        @media screen and (max-width: 1440px){
            text-align: center;
            p {
                text-align: center;
            }
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        button {
            margin-top: 10px;
        }
    }

    @media screen and (min-width: 1440px) {
        grid-template-columns: auto minmax(500px, 1fr);
        gap: 80px;
    }
}
</style>