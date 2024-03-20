export interface UserModel {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface RegisterResponse {
    message: string;
    user: UserModel;
}

export interface LoginResponse {
    token: string;
}

export interface ApiError {
    message: string;
    errors: Record<string, string[]>
}

export interface ApiResponse<T> {
    status: number;
    data: T | ApiError
}