<template>
  <label :for="id" class="inline-flex items-center cursor-pointer">
    <input :id="id" type="checkbox" @change="doToggle" class="sr-only peer" :checked="checked">
    <div class="relative
    w-11
    h-6
    bg-taupe
    rounded-full
    peer
    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-gray
    peer-checked:bg-blue-gray peer-checked:after:translate-x-full peer-checked:after:border-cream
    rtl:peer-checked:after:-translate-x-full
    after:rounded-full
    after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-cream after:border-taupe
    after:h-5 after:w-5 after:transition-all
"></div>
    <span class="ms-3 text-sm text-taupe font-medium peer peer-checked:text-blue-gray"><slot></slot></span>
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