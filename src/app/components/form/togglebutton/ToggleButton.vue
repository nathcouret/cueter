<template>
  <label :for="id" class="label">
    <input :id="id" type="checkbox" @change="doToggle" class="toggle peer toggle-primary toggle-lg" :checked="checked">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, ref} from "vue";
import {ToggleButtonProps} from "./index";

const {
  initChecked = false
} = defineProps<ToggleButtonProps>()

const emit = defineEmits<{
  toggle: [value: boolean]
}>();

const checked = ref<boolean>(initChecked);

function doToggle() {
  checked.value = !checked.value;
  emit('toggle', {value: checked.value});
}
</script>