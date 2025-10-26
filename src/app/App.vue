<script setup>
import Layout from "./pages/Layout.vue";
import {onMounted} from "vue";
import {themeChange} from "theme-change";

onMounted(() => {
  themeChange(false)
});
</script>

<template>
  <Layout/>
</template>

<style>
@import "tailwindcss";

@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake, coffee;
}

</style>
