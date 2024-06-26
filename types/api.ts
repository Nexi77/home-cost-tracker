import type { UserData } from "~/stores/auth";
import type { CostLimitModel, CostTypeModel, CostsModel, Pagination } from "./general";

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
    status_code?: number;
    data: { message: string} & (T | ApiError)
}

export interface UserResponse {
    message: string;
    user: UserData;
}

export interface CostTypeResponse {
    cost_types: Pagination<CostTypeModel[]>;
}

export interface CostLimitResponse {
    cost_type_limits: Pagination<CostLimitModel[]>
}

export interface CostsResponse {
    costs: Pagination<CostsModel[]>;
}

export interface StatsModel {
    cost_type_name: string;
    cost_type_id: number;
    price: number;
}

export interface PredictionModel {
    date: string;
    predicted_price: number;
}

export interface PredictionsResponse {
    predictions: Record<string, PredictionModel[]>;
}

