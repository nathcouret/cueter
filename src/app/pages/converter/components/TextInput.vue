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
  <input class="bg-white border border-blue-gray" id="{{id}}" type="text" :value="value"
         @input="change" :readonly="readonly"/>
  >

</template>

<style scoped>

</style>