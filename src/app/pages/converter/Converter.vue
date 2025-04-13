<template>
  <section class="w-full relative mx-auto">
    <div class="flex flex-wrap justify-center gap-1 pt-2 s:p-1">
      <div class="w-full md:w-5/12">
        <form class="flex flex-col gap-3">
          <TextAreaInput id="cue-input" title="Input" :value="input" @change="updateInput"></TextAreaInput>
          <input type="reset" value="Clear" class="w-1/2 p-2 bg-taupe text-cream" @click="clearInput"/>
          <ToggleButton id="artist-toggle" :init-checked="includeArtistName"
                        @toggle="toggleIncludeArtistName">Include artist name
          </ToggleButton>
        </form>
      </div>
      <div class="w-full md:w-5/12 flex flex-col gap-3">
        <TextAreaInput id="tracklist-result" title="Result" :value="output" readonly></TextAreaInput>
        <button @click="copy" class="bg-taupe text-cream w-1/2 p-2">Copy to clipboard</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {CLEAR_TRACKLIST, COPY_TO_CLIPBOARD, PARSE_TRACKLIST, SET_INCLUDE_ARTIST_NAME, storeKey,} from "../../store";
import {isEmpty} from "../../utils";
import {TextAreaInput, TextAreaValueChange, ToggleButton, ToggleButtonEvent} from "../../components/form";

const store = useStore(storeKey);

const input = ref<string>('');
const output = computed<string>(() => store.state.output || "");
const includeArtistName = computed<boolean>(() => store.state.includeArtistName);

function updateInput({value}: TextAreaValueChange) {
  if (!isEmpty(value)) {
    input.value = value;
    store.dispatch(PARSE_TRACKLIST,
        value
    );
  }
}

function clearInput(e: Event) {
  e.preventDefault();
  input.value = '';
  store.dispatch(CLEAR_TRACKLIST);
}

function toggleIncludeArtistName({value}: ToggleButtonEvent) {
  store.dispatch(SET_INCLUDE_ARTIST_NAME, value);
}

function copy() {
  store.dispatch(COPY_TO_CLIPBOARD);
}

</script>