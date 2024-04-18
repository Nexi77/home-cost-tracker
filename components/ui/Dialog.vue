<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: boolean;
    width?: string;
    keepAlive?: boolean;
}>(), {
    keepAlive: false
});

const dialogElement = ref<HTMLDialogElement | null>(null);
const alreadyClosing = ref(false);
const containerVisible = ref(false);

const emits = defineEmits(['update:modelValue', 'dialogClosed']);

onMounted(() =>
{
    dialogElement.value?.addEventListener('close', listenCloseDialog);
    dialogElement.value?.addEventListener('mousedown', listenMouseDownDialog);
});

onUnmounted(() =>
{
    dialogElement.value?.removeEventListener('close', listenCloseDialog);
    dialogElement.value?.removeEventListener('close', listenMouseDownDialog);
});

watch(
    () => props.modelValue,
    status => status ? showModal() : closeDialog()
);

function showModal()
{
    alreadyClosing.value = false;
    containerVisible.value = true;
    dialogElement.value?.showModal();
    dialogElement.value?.removeAttribute('inert');
}

function listenCloseDialog()
{
    alreadyClosing.value = true;
    emits('update:modelValue', false);
    emits('dialogClosed');
}

function handleDialogHide()
{
    dialogElement.value?.classList.remove('hide');
    dialogElement.value?.close('dismiss');
    dialogElement.value?.setAttribute('inert', '');
    containerVisible.value = false;
}

function listenMouseDownDialog(event: Event)
{
    const dialog = event.target as HTMLDialogElement;

    if (dialog.nodeName === 'DIALOG')
    {
        dialogElement.value?.classList.add('hide');
        dialogElement.value?.addEventListener('webkitAnimationEnd', function caller()
        {
            handleDialogHide();
            dialogElement.value?.removeEventListener('webkitAnimationEnd', caller, false);
        });
    }
}

function closeDialog()
{
    if (!alreadyClosing.value)
    {
        dialogElement.value?.classList.add('hide');
        dialogElement.value?.addEventListener('webkitAnimationEnd', function caller()
        {
            handleDialogHide();
            dialogElement.value?.removeEventListener('webkitAnimationEnd', caller, false);
        });
    }
}
</script>

<template>
    <dialog ref="dialogElement" class="dialog hidden-scroll" :class="{specified: width?.length}" :style="width && { '--dialog-width': width }">
        <div class="wrapper">
            <header class="header">
                <div class="title">
                    <slot name="header" />
                </div>
                <button class="clean close" type="button" @click="closeDialog">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </button>
            </header>
            <div class="inner">
                <slot v-if="keepAlive ? true : containerVisible" :cancel="closeDialog" />
            </div>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
.dialog {
    padding: 0;
    border: none;
    box-shadow: 0 10px 20px rgb(48 49 51 / 7%), 0 2px 7px rgb(40 41 42 / 10%);
    color: inherit;
    border-radius: 16px;
    background-color: #fff;
}

dialog[open] {
    animation: show 0.5s ease-in-out normal;
}

@keyframes show {
    from {
        transform: translateY(100vh);
    }

    to {
        transform: translateY(0);
    }
}

dialog.hide {
    animation: hide 0.5s ease-in-out normal;
}

@keyframes hide {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100vh);
    }
}

.dialog[open]::backdrop {
    animation: show-backdrop 0.5s ease-in-out normal;
}

.dialog.hide::backdrop {
    animation: hide-backdrop 0.5s ease-in-out normal;
}

@keyframes show-backdrop {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes hide-backdrop {
    to {
        opacity: 0;
    }
}

.dialog.specified {
    max-width: var(--dialog-width);
    width: calc(100% - 30px);
}

.dialog::backdrop {
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: saturate(0);
}

.wrapper {
    --padding-top: 10px;
    --padding-inline: 12px;
    --padding-bottom: 10px;

    padding: var(--padding-top) var(--padding-inline) var(--padding-bottom);
    display: grid;
    gap: 15px;
}

.inner {
    min-height: 50px;
}

.inner:deep(ul) {
    margin: 0;
}

.close {
    display: none;
    position: absolute;
    right: 10px;
    top: 10px;
}

@media screen and (min-width: 600px) {
    .wrapper { --padding-inline: 15px; }

    .close {
        display: flex;
    }
}

.title {
    font-size: 1.5rem;
    font-weight: 700;

    &:deep(h2) {
        font-size: inherit;
        margin-top: 0;
        text-align: center;

        @media screen and (min-width: 600px) {
            text-align: left;
        }
    }
}

.header {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr auto;
}
</style>
