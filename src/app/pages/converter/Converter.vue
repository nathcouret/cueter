<template>
  <main class="md:container md:mx-auto">
    <div class="flex flex-row p-2">
      <div class="basis-1/2 mr-2">
        <form class="flex flex-col gap-3">
          <fieldset class="flex flex-row gap-1">
            <input type="submit" value="Convert" class="p-2 bg-emerald-900 text-slate-200"/>
            <input type="reset" value="Reset" class="p2 bg-emerald-600 text-slate-200"/>
          </fieldset>
          <label for="cue-input" class="bg-emerald-900 text-slate-200">Cue text</label>
          <textarea id="cue-input" type="text" v-model="input">
</textarea>
          <label for="cue-track-template" class="bg-emerald-900 text-slate-200">Template</label>
          <input id="cue-track-template" type="text" v-model="template"
                 class="border-solid border-2" readonly aria-readonly="true"/>
        </form>
      </div>
      <div class="basis-1/2 flex flex-col gap-3">
        <h2 class="bg-emerald-900 text-slate-200 p-2 mb-3">Result</h2>
        <textarea id="tracklist-result" class="bg-slate-50" readonly aria-readonly="true">{{output}}</textarea>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {Tracklist} from "../../model/tracklist";
import {cueParserService} from "../../service/cueparser/cueparser.service";
import {
  TracklistDisplayService,
  tracklistDisplayService
} from "../../service/tracklist-display/tracklist-display.service";

const input = ref<string>('');
const template = ref<string>(TracklistDisplayService.DEFAULT_TRACK_TEMPLATE);
const tracklist = computed<Tracklist | null>(() => {
  if (!!input.value && input.value !== '') {
    const parsed = cueParserService.parse(input.value);
    if (parsed != null) {
      return parsed;
    }
  }
  return null;
})
const output = computed<string>(() => {
  const data = tracklist.value;
  if (data === null) {
    return '';
  }
  return tracklistDisplayService.transformTracklist(data, template.value);
});

</script>