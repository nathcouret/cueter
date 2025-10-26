<script setup lang="ts">

</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-overlay" v-if="$slots.overlay">
      <slot name="overlay"></slot>
    </div>
    <div class="hero-content text-center" v-if="$slots.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>