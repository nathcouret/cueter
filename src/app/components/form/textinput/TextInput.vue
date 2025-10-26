<script setup lang="ts">
import {TextInputProps, TextInputValueChange} from "./index";
import {defineEmits, defineProps} from "vue";

const {
  id, title, value, readonly = false, placeholder = ''
} = defineProps<TextInputProps>();

const emit = defineEmits<{
  change: [value: string];
}>()

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('change', {value} as TextInputValueChange)
}
</script>

<template>
  <label for="{{id}}" class="input">
    {{ title }}
    <input class="grow" id="{{id}}" type="text" :value="value" placeholder="{{placeholder}}"
           @input="onChange" :readonly="readonly"/>
  </label>
</template>