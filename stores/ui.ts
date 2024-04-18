import { defineStore } from 'pinia';

export interface UIState {
    menuOpened: boolean;
    fullSiteLoad: boolean;
}

export const useUiStore = defineStore('uiStore', {
    state: (): UIState => ({
        menuOpened: false,
        fullSiteLoad: false,
    })
});
