<script setup lang="ts">
import {TextAreaProps} from "./index";
import {defineEmits, defineProps} from "vue";

const {
  id, title, value, readonly = false
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
    <textarea class="textarea textarea-xl textarea-primary" id="{{id}}" type="text" :value="value"
              @input="onChange" :readonly="readonly" rows="20">
</textarea>
  </fieldset>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
  resize: vertical;
}
</style>