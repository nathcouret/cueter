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
  <label for="{{id}}" class="bg-blue-gray text-cream p-2">
    {{ title }}
  </label>
  <textarea class="bg-white border border-blue-gray min-h-80" id="{{id}}" type="text" :value="value"
            @input="onChange" :readonly="readonly">
</textarea>
</template>