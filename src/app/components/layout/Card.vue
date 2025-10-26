<script setup lang="ts">
</script>

<template>
  <div class="card lg:card-side bg-base-300 rounded-box grid h-32 grow place-items-center">
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>