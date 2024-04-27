import type { PagerInfo } from "~/utils/pager";
import type { Filter } from '~~/utils/filter';

export interface IAppState {
    pagers: Record<string, PagerInfo | null>;
    filters: Record<string, Filter<Record<string, any>>>
}

export interface IAppStore extends IAppState {
    setPager(identifider: string | number, pager: PagerInfo): void;
    setFilter(identifider: string | number, filter: Filter<Record<string, any>>): void;
    updateFilter(identifider: string | number, data: Record<string, any>): void;
}

export const useAppStore = defineStore('appStore', {
    state: (): IAppState => ({
        pagers: {},
        filters: {}
    }),

    actions: {
        setPager(identifier: string | number, pager: PagerInfo): void
        {
            this.pagers[identifier] = pager;
        },
        setFilter(identifier: string | number, filter: Filter<Record<string, unknown>>): void
        {
            this.filters[identifier] = filter;
        },
        updateFilter(identifier: string | number, data: Record<string, unknown>)
        {
            const filter = this.filters[identifier];

            filter.withData(data);

            return filter;
        }
    }
});


