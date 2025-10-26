<script setup lang="ts">

import {computed, ref} from "vue";

interface Theme {
  name: string;
  value: string;
}

const themeValues = ref(["light", "dark", "coffee", "cupcake"]);

const themes = computed<Theme[]>(() => {
  return themeValues.value.map(value => {
    const name = value.charAt(0).toUpperCase() + value.slice(1);
    return ({
      value: value,
      name: name
    })
  });
});
</script>

<template>
  <div class="dropdown lg:dropdown-end lg:p-0">
    <div tabindex="0" role="button" class="btn btn-ghost justify-self-center">
      Theme
      <svg
          width="12px"
          height="12px"
          class="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
      </svg>
    </div>
    <ul tabindex="-1" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-0 shadow-sm">
      <li v-for="{name, value} in themes">
        <button :data-set-theme="value">
          <div :data-theme="value" class="bg-base-content status status-md" aria-label=""></div>
          <div class="w-32 truncate">{{ name }}</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>