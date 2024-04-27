<script setup lang="ts">
import { useAppStore } from '~/stores/app';

interface Props {
    pager: PagerInfo | null;
}

const route = useRoute();
const router = useRouter();
const props = defineProps<Props>();
const pageFromQuery = computed(() => route.query.page as string || null);

const emits = defineEmits(['change']);

const getUrl = (index: number) =>
{
    props.pager!.currentPage = index;
    router.push({ name: route.name as string, params: route.params, query: { page: index } });

    emits('change');
};

const pages = computed((): number[] =>
{
    if (!props.pager) return [];

    const pagesArray = [];

    const min = Math.max(props.pager!.currentPage - 2, 1) + 1;
    const max = Math.min(props.pager!.currentPage + 2, props.pager!.totalPage) - 1;

    for (let i = min; i <= max; i++)
    {
        pagesArray.push(i);
    }

    return pagesArray;
});

watchEffect(() =>
{
    if (pageFromQuery.value)
        props.pager!.currentPage = Number(pageFromQuery.value);
    else props.pager!.currentPage = 1;
});
</script>

<template>
    <nav v-if="pager?.totalPage" class="pagination">
        <ul class="page-list">
            <li class="page-item arrow" :class="{ disabled: pager!.currentPage === 1}">
                <button class="page-link arrow clean" type="button" title="First page" @click="getUrl(1)">
                    <<
                </button>
            </li>
            <li class="page-item arrow" :class="{ disabled: pager!.currentPage === 1}">
                <button class="page-link arrow clean" type="button" title="Previous page" @click="getUrl(pager!.currentPage - 1)">
                    <
                </button>
            </li>
            <li class="page-item">
                <button type="button" class="page-link clean" tabindex="-1" :class="{'page-active': pager.currentPage === 1}" @click="getUrl(1)">
                    {{ 1 }}
                </button>
            </li>

            <template v-if="pages.length">
                <li v-if="pages[0] - 1 > 2" class="page-item">
                    <span class="dots">...</span>
                </li>
                <li v-else-if="pages[0] - 1 === 2" class="page-item">
                    <button type="button" class="page-link clean" :class="{'page-active': pager.currentPage === 2}" tabindex="-1" @click="getUrl(2)">
                        {{ 2 }}
                    </button>
                </li>
            </template>

            <li v-for="i of pages" :key="i" class="page-item">
                <button type="button" class="page-link clean" :class="{'page-active': pager.currentPage === i}" @click="getUrl(i)">
                    {{ i }}
                </button>
            </li>

            <template v-if="pages.length">
                <li v-if="pages[pages.length - 1] + 1 < pager.totalPage - 1" class="page-item">
                    <span class="dots">...</span>
                </li>
                <li v-else-if="pages[pages.length - 1] + 1 === pager.totalPage - 1" class="page-item">
                    <button type="button" class="page-link clean" tabindex="-1" @click="getUrl(2)">
                        {{ pager.totalPage - 1 }}
                    </button>
                </li>
            </template>

            <li v-if="pager.totalPage > 1" class="page-item">
                <button type="button" class="page-link clean" :class="{'page-active': pager.currentPage === pager.totalPage}" @click="getUrl(pager!.totalPage)">
                    {{ pager.totalPage }}
                </button>
            </li>

            <li class="page-item" :class="{ disabled: pager!.currentPage === pager!.totalPage}">
                <button class="page-link arrow clean" type="button" title="Next page" @click="getUrl(pager!.currentPage + 1)">
                    >
                </button>
            </li>
            <li class="page-item arrow" :class="{ disabled: pager!.currentPage === pager!.totalPage}">
                <button type="button" class="page-link arrow clean" title="Last page" @click="getUrl(pager!.totalPage)">
                    >>
                </button>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
    position: relative;
    padding: 40px;
    flex-direction: column;
    box-shadow: 0 10px 20px rgb(48 49 51 / 7%), 0 2px 7px rgb(40 41 42 / 10%);
    border-radius: 7px;
    margin-block: 20px;
    gap: 30px;
}

.page-link.page-active {
    background-color: var(--color-white);
    border: 2px solid var(--clr-primary-green);
    font-weight: 700;
}

.page-list {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
}

.page-link {
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    font-weight: 500;
    border-radius: 7px;
    text-decoration: none;
    border: 1px solid var(--clr-neutral-blue);
}

.page-item {
    list-style: none;
    margin: 0;
}

.page-item.disabled {
    background-color: var(--clr-neutral-light-gray);
    color: var(--clr-font-gray-blu);
    border-radius: 7px;
    pointer-events: none;
}

.page-link.arrow,
.page-item.arrow {
    border: none;
}

.page-item:not(.disabled) .page-link:hover {
    font-weight: 700;
}
</style>
