<script setup lang="ts">
const authStore = useAuthStore();
const isEmailVerified = computed(() => !!authStore.data?.email_verified_at ? 'Yes': 'No');
</script>
<template>
    <h1>My profile</h1>
    <div class="label-box">
        <div class="label-pair-wrapper">
            <label>Name:</label>
            <span>{{ authStore.data?.name }}</span>
        </div>
        <div class="label-pair-wrapper">
            <label>Email:</label>
            <span>{{ authStore.data?.email }}</span>
        </div>
        <div class="label-pair-wrapper">
            <label>Email is verified:</label>
            <span>{{ isEmailVerified }}</span>
        </div>
    </div>
</template>