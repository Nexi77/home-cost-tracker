<script setup lang="ts">
interface Props {
    activeIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
    activeIndex: 0,
})

const slots = useSlots();
const children = computed(() => slots.default ? slots.default() : []);
const tabTitles = computed(() => children.value.map(child => child.props?.title));
const selectedIndex = ref(props.activeIndex);

const setSelectedIndex = (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    const index = button?.dataset.index;
    if (index)
        selectedIndex.value = Number(index);
};

provide('selectedIndex', selectedIndex);
</script>

<template>
   <div class="tabs">
        <ul class="tabs-header" @click="setSelectedIndex">
            <li v-for="(title, index) in tabTitles" :key="index">
                <button class="clean tab-header" :class="{'active': index === selectedIndex}" :data-index="index">
                    {{ title }}
                </button>
            </li>
        </ul>
        <slot />
   </div>
</template>

<style lang="scss" scoped>
.tabs-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media screen and (min-width: 680px) {
        flex-direction: row;
    }
    margin-bottom: 1rem;
    .tab-header {
        padding: 1rem;
        text-align: center;
        font-weight: bold;
        border: 1px solid var(--clr-accent);
        border-radius: var(--base-radius);
        background-color: var(--clr-accent-alpha);

        &.active {
            background-color: var(--clr-accent);
            color: var(--clr-white);
        }
    }
}
</style>