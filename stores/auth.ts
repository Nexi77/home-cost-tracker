import { defineStore } from 'pinia';

export interface AuthState {
    token: string;
}

export const useAuthStore = defineStore('authStore', {
    state: (): AuthState => ({
        token: ''
    })
});
