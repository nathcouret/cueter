<script setup>
import Banner from "./components/banner/Banner.vue";
import Converter from "./pages/converter/Converter.vue";
</script>

<template>
  <Banner></Banner>
  <main>
    <Converter></Converter>
  </main>
</template>

<style>
@import "tailwindcss";

@theme {
  --color-blue-gray: #99b0b0;
  --color-taupe: #b5b2b0;
  --color-cream: #fcfaf0;
  --color-slate: #8a9ea0;
}
</style>
