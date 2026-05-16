<script setup lang="ts">
import {TextAreaProps} from "./index";

const {
  id, title, value, readonly = false,
  rows = 15
} = defineProps<TextAreaProps>()

const emit = defineEmits<{
  change: [value: string];
}>()

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('change', {value});
}
</script>

<template>
  <fieldset class="fieldset flex flex-col gap-1">
    <legend class="fieldset-legend">
      {{ title }}
    </legend>
    <textarea class="textarea textarea-xl textarea-primary bg-base-300" :id="id" type="text" :value="value"
              @input="onChange" :readonly="readonly" :rows="rows">
</textarea>
  </fieldset>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
  resize: vertical;
}
</style>