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