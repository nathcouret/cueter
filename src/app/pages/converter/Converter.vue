<template>
  <section class="w-full relative mx-auto">
    <div class="flex flex-wrap justify-center gap-1 pt-2 s:p-1">
      <div class="w-full md:w-5/12">
        <form class="flex flex-col gap-3">
          <TextareaInput id="cue-input" title="Input" :value="input" :change="updateInput"></TextareaInput>
          <input type="reset" value="Clear" class="w-1/2 p-2 bg-taupe text-cream" @click="clearInput"/>
          <TextInput id="cue-track-template" title="Template" :value="template" :change="updateTemple"></TextInput>
        </form>
      </div>
      <div class="w-full md:w-5/12 flex flex-col gap-3">
        <TextareaInput id="tracklist-result" title="Result" :value="output" readonly></TextareaInput>
        <button @click="copy" class="bg-taupe text-cream w-1/2 p-2">Copy to clipboard</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {TracklistActions} from "../../store/tracklist";
import TextareaInput from "./components/TextareaInput.vue";
import TextInput from "./components/TextInput.vue";

const store = useStore();

const input = ref<string>('');

function updateInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value;
  if (!!value && value !== '') {
    input.value = value;
    store.dispatch(TracklistActions.PARSE_TRACKLIST,
        value
    );
  }
}

const template = computed(() => store.state.tracklistStore.template);

function updateTemplate(e: Event) {
  const newTemplate = (e.target as HTMLInputElement).value;
  store.dispatch(
      TracklistActions.CHANGE_TEMPLATE,
      newTemplate
  );
}

function clearInput(e: Event) {
  e.preventDefault();
  input.value = '';
  store.dispatch(TracklistActions.CLEAR_TRACKLIST);
}

const output = computed<string>(() => {
  return store.state.tracklistStore.output;
});

async function copy() {
  if (store.state.tracklistStore.output !== null) {
    try {
      await navigator.clipboard.writeText(store.state.tracklistStore.output);
      console.log('Copied!');
    } catch (error: Error) {
      console.error(error.message);
    }
  }
}

</script>