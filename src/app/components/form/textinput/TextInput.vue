<script setup lang="ts">
import {TextInputProps} from "./index";
import {defineEmits, defineProps} from "vue";

const {
  id, title, value, readonly = false
} = defineProps<TextInputProps>();

const emit = defineEmits<{
  change: [value: string];
}>()

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('change', {value})
}
</script>

<template>
  <label for="{{id}}" class="bg-blue-gray text-cream p-2">
    {{ title }}
  </label>
  <input class="bg-white border border-blue-gray" id="{{id}}" type="text" :value="value"
         @input="onChange" :readonly="readonly"/>
</template>