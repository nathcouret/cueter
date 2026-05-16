<script setup lang="ts">

import {ref, useTemplateRef} from "vue";
import Converter from "./converter/Converter.vue";
import ThemeDropdown from "../components/ThemeDropdown.vue";
import Rekordbox from "./rekordbox/Rekordbox.vue";

const howToId = "howto";
const howToDialog = useTemplateRef(howToId);

function openHowToDialog() {
  howToDialog.value.showModal();
}

enum ACTIVE_TAB {
  CONVERTER = "converter",
  REKORDBOX = "rekordbox",
};

const activeTab = ref<ACTIVE_TAB>(ACTIVE_TAB.CONVERTER);

function setActiveTab(newTab: ACTIVE_TAB) {
  activeTab.value = newTab;
}

</script>

<template>
  <div class="drawer">
    <input id="cueter-drawer-toggle" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <header class="navbar bg-base-300 w-full sticky top-0 shadow-md inset-shadow-xs">
        <div class="flex-none lg:hidden">
          <label for="cueter-drawer-toggle" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">Cueter</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <li><a class="btn btn-ghost" role="button" href="#converter"
                   @click.prevent="setActiveTab(ACTIVE_TAB.CONVERTER)">Converter</a></li>
            <li><a class="btn btn-ghost" role="button" href="#rekordbox"
                   @click.prevent="setActiveTab(ACTIVE_TAB.REKORDBOX)">Rekordbox</a></li>
            <li>
              <button class="btn btn-ghost" @click.prevent="openHowToDialog">?</button>
            </li>
            <li>
              <ThemeDropdown/>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <Converter v-if="activeTab === ACTIVE_TAB.CONVERTER" id="converter"></Converter>
        <Rekordbox v-else-if="activeTab === ACTIVE_TAB.REKORDBOX" id="rekordbox"></Rekordbox>
        <dialog :id="howToId" class="modal modal-bottom sm:modal-middle" :ref="howToId">
          <div class="modal-box">
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
      <footer class="bg-base-300 w-full py-2 px-4 inset-shadow-md">
        &#169; Nathanaël COURET - 2026
      </footer>
    </div>
    <div class="drawer-side">
      <label for="cueter-drawer-toggle" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <li><a class="btn btn-ghost" role="button" href="#converter"
               @click.prevent="setActiveTab(ACTIVE_TAB.CONVERTER)">Converter</a>
        </li>
        <li><a class="btn btn-ghost" role="button" href="#rekordbox"
               @click.prevent="setActiveTab(ACTIVE_TAB.REKORDBOX)">Rekordbox</a>
        </li>
        <li>
          <ThemeDropdown/>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>