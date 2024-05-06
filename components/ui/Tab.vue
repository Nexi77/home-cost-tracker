<script setup lang="ts">
    interface Props {
        title: string;
        index: number;
    }
    withDefaults(defineProps<Props>(), {
        title: 'Tab',
    })
    const selectedIndex = inject('selectedIndex');
</script>

<template>
    <div class="tab" v-show="index === selectedIndex">
      <slot></slot>
    </div>
  </template>