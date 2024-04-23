
import { useAppStore } from '~/stores/app';
import type { Pagination } from '~/types/general';

export function createPager(identifier: string | number, currentPage: number | string, perPage: number | null = 20)
{
    const store = useAppStore();

    const fragments = { currentPage: Number(currentPage), perPage };

    store.setPager(identifier, { ...fragments, totalPage: 0, totalItem: 0 });

    return fragments;
}

export function updatePager(identifier: string | number, data: Pagination<unknown>)
{
    const store = useAppStore();

    store.setPager(identifier, {
        ...store.pagers[identifier],
        totalPage: data.total,
        currentPage: data.current_page,
        perPage: data.per_page,
        totalItem: data.per_page * data.total,
    });
}

export interface PagerInfo
{
    currentPage: number;
    perPage: number | null;
    totalPage: number;
    totalItem: number;
}
