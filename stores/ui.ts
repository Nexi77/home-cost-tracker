import { defineStore } from 'pinia';

export interface UIState {
    menuOpened: boolean;
}

export const useUiStore = defineStore('uiStore', {
    state: (): UIState => ({
        menuOpened: false
    })
});
