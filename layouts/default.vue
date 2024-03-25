<template>
    <div class="layout default-layout">
        <Menu />
        <div class="content-wrapper">
            <Header />
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.default-layout {
    min-height: 100vh;
    display: flex;
    color: var(--clr-black);
}
.content-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
}

main {
    padding: 2rem min(4rem, 5vw);
}
</style>