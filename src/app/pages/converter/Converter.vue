<template>
  <section class="w-full relative mx-auto">
    <div class="flex flex-wrap justify-center gap-1 pt-2 s:p-1">
      <div class="w-full md:w-5/12">
        <form class="flex flex-col gap-3">
          <input type="reset" value="Clear" class="flex-1 p-2 bg-emerald-600 text-slate-200" @click="clearInput"/>
          <textarea class="bg-slate-50 min-h-80" id="cue-input" type="text" :value="input" @input="updateInput">
</textarea>
          <label for="cue-track-template" class="bg-emerald-900 text-slate-200 p-2">Template</label>
          <input id="cue-track-template" type="text" :value="template" @input="updateTemplate"
                 class="bg-slate-50 pl-1 mb-3" readonly aria-readonly="true"/>
        </form>
      </div>
      <div class="w-full md:w-5/12">
        <h2 class="bg-emerald-900 text-slate-200 p-2 mb-3">Result</h2>
        <textarea id="tracklist-result" class="w-full bg-slate-50  min-h-80" readonly aria-readonly="true"
                  :value="output"></textarea>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {TracklistActions} from "../../store/tracklist";

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

</script>