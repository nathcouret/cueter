<script setup lang="ts">

import Hero from "../../components/layout/Hero.vue";
</script>

<template>
  <section class="flex w-full flex-col lg:flex-row justify-between">
    <Hero>
      <template v-slot:content>
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Coming soon...</h1>
        </div>
      </template>
    </Hero>
  </section>
</template>