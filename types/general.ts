export interface CostTypeModel {
    name: string;
    desc: string;
    id: number | null;
    user_id: number | null;
}

export interface Pagination<T> {
    current_page: number;
    data: T;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface CostLimitModel {
    id: number;
    cost_type_id: number;
    user_id: number;
    weekly_limit: string;
    monthly_limit: string;
    quarter_limit: string;
    yearly_limit: string;
    created_at: string;
    updated_at: string;
    cost_type: CostTypeModel;
}

export interface CostsModel {
    id: number;
    date: string;
    cost_type_id: string;
    user_id: string;
    desc: string;
    price: string;
    created_at: string;
    updated_at: string;
    cost_type: CostTypeModel;
}

export interface Tab {
    title: string;
}