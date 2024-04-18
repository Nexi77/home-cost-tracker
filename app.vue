<script lang="ts" setup>
const uiStore = useUiStore();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="full-site-loader" v-if="uiStore.fullSiteLoad">
    <AtomsLoader />
  </div>
</template>

<style lang="scss" scoped>

.full-site-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.75);
  pointer-events: none;
}
</style>
