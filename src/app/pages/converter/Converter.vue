<template>
  <section class="flex w-full flex-col lg:flex-row justify-between">
    <div class="grow p-4">
      <form class="flex flex-col gap-4">
        <TextAreaInput id="cue-input" title="Input" :value="input" @change="updateInput"></TextAreaInput>
        <fieldset class="fieldset">
          <button class="btn btn-secondary btn-outline" @click="clearInput">Clear input</button>
          <ToggleButton id="artist-toggle-v2" :init-checked="includeArtistName"
                        @toggle="toggleIncludeArtistName">Include artist name
          </ToggleButton>
        </fieldset>
      </form>
    </div>
    <div class="divider lg:divider-horizontal divider-secondary">></div>
    <div class="grow p-4 flex flex-col gap-3">
      <div class="flex flex-col">
        <TextAreaInput id="tracklist-result" title="Result" :value="output" readonly></TextAreaInput>
      </div>
      <button @click="copy" class="btn btn-primary">Copy to clipboard</button>
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