<script setup lang="ts">
import Label from "./Label.vue";

const {
  id, title, value, change = (___) => {
  }, readonly = false
} = defineProps<{
  id: string,
  title: string,
  value: string
  change?: (e: Event) => {},
  readonly?: boolean
}>()
</script>

<template>
  <label for="{{id}}" class="bg-blue-gray text-cream p-2">
    {{ title }}
  </label>
  <textarea class="bg-white border border-blue-gray min-h-80" id="{{id}}" type="text" :value="value"
            @input="change" :readonly="readonly">
</textarea>
</template>

<style scoped>

</style>