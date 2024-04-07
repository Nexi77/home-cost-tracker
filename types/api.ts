import type { UserData } from "~/stores/auth";
import type { CostTypeModel, Pagination } from "./general";

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
    status_page: number;
    data: { message: string} & (T | ApiError)
}

export interface UserResponse {
    message: string;
    user: UserData;
}

export interface CostTypeResponse {
    cost_types: Pagination<CostTypeModel[]>;
}

