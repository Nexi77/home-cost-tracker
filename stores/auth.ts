import { defineStore } from 'pinia';

export interface UserData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_first_config: boolean;
}
export interface AuthState {
    token: string;
    data: UserData | null;
}

export const useAuthStore = defineStore('authStore', {
    state: (): AuthState => ({
        token: '',
        data: null,
    })
});
