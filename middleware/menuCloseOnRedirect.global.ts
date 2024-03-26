export default defineNuxtRouteMiddleware(async (to, from) =>
{
   const uiStore = useUiStore();
   if(to.name !== from.name)
        uiStore.menuOpened = false;
    return;
});
