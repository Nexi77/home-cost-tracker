import type { PagerInfo } from "~/utils/pager";

export interface IAppState {
    pagers: Record<string, PagerInfo | null>;
}

export interface IAppStore extends IAppState {
    setPager(identifider: string | number, pager: PagerInfo): void;
}

export const useAppStore = defineStore('appStore', {
    state: (): IAppState => ({
        pagers: {},
    }),

    actions: {
        setPager(identifier: string | number, pager: PagerInfo): void
        {
            this.pagers[identifier] = pager;
        },
    }
});


