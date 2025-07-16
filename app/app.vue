<template>
  <div>
    <div
      class="mx-auto h-full max-w-screen-lg rounded border-x border-neutral-950 bg-neutral-950/25 pt-4 pb-24 shadow"
    >
      <div class="mt-4 flex items-end justify-between px-6">
        <p class="tracking-widest uppercase">Music archive</p>
        <a
          :href="emailHref"
          class="mb-1 flex items-center gap-2 fill-neutral-100 text-sm tracking-widest uppercase transition-colors hover:text-neutral-300"
        >
          Contact <IconMail class="size-5 text-neutral-100" />
        </a>
      </div>

      <div
        class="mx-1 mb-8 flex max-w-screen-lg flex-col items-center justify-center rounded-3xl border-4 border-neutral-900/75 bg-neutral-950 p-6 shadow-lg"
      >
        <img
          src="/logo.webp"
          alt="Xinx Music Logo"
          width="768"
          height="321"
          class=""
        />
        <h1 class="sr-only">Xinx Music Archive</h1>
      </div>
      <div v-for="(item, idx) in ep" :key="idx" class="px-4">
        <div
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <h2
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 shadow"
          >
            EP
          </h2>
          <h3 class="text-neutral-200 uppercase">
            {{ item[0].album }}
          </h3>
        </div>

        <div
          class="mb-8 flex items-stretch gap-6 border-b border-neutral-800 pb-8 shadow"
        >
          <img
            :src="item[0].artwork"
            :alt="`${item[0].album} artwork`"
            width="500"
            height="500"
            class="size-64 rounded-xl border border-neutral-900 shadow"
          />
          <div class="flex w-full flex-col justify-between py-1">
            <div v-for="song in item" :key="song.id">
              <button
                @click="selectSong(song)"
                class="w-full cursor-pointer text-left transition-colors hover:text-red-400"
                :class="{ 'font-bold text-red-500': isCurrentSong(song) }"
              >
                <h4>{{ song.title }}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8 border-b border-neutral-800 px-4 pb-8 shadow">
        <div
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <h2
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 uppercase shadow"
          >
            Single
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="song in single"
            :key="song.id"
            @click="selectSong(song)"
            class="flex cursor-pointer items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5 text-left transition-colors hover:bg-neutral-800/50"
            :class="{
              'border-red-500 bg-red-900/25 ring-1 ring-red-500':
                isCurrentSong(song),
            }"
          >
            <img
              :src="song.artwork"
              :alt="`${song.title} artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
            />
            <p :class="{ 'font-bold text-red-400': isCurrentSong(song) }">
              {{ song.title }}
            </p>
          </button>
        </div>
      </div>
      <div class="mb-6 border-b border-neutral-800 px-4 pb-8 shadow">
        <div
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <h2
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 uppercase shadow"
          >
            Remix
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="song in remix"
            :key="song.id"
            @click="selectSong(song)"
            class="flex cursor-pointer items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5 text-left transition-colors hover:bg-neutral-800/50"
            :class="{
              'border-red-500 bg-red-900/25 ring-1 ring-red-500':
                isCurrentSong(song),
            }"
          >
            <img
              :src="song.artwork"
              :alt="`${song.title} artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
            />
            <p :class="{ 'font-bold text-red-400': isCurrentSong(song) }">
              {{ song.title }}
            </p>
          </button>
        </div>
      </div>
      <footer class="text-center">
        <p class="text-sm text-neutral-400">
          Created with 🖤 by
          <NuxtLink
            to="https://matg.dev"
            external
            target="_blank"
            class="text-neutral-300 hover:text-neutral-400"
            >matg.dev</NuxtLink
          >
        </p>
      </footer>
    </div>

    <MusicPlayer :audio-data="track" @track-change="handleTrackChange" />
  </div>
</template>

<script setup lang="ts">
import { music } from "@/utils/music";
import type { song } from "@/utils/music";

const config = useRuntimeConfig();
const debug = !config.public.production; // Enable debug mode based on environment

const track = ref(music[0]); // Start with first song to avoid hydration mismatch
const isClient = ref(false);

// Debug: Log the selected track on initialization
if (debug)
  console.log(
    "Initial track selected:",
    track.value.title,
    "ID:",
    track.value.id,
  );

// Set random song and enable highlighting only on client
onMounted(() => {
  track.value = music[Math.floor(Math.random() * music.length)];
  isClient.value = true;
  if (debug)
    console.log(
      "Client-side track selected:",
      track.value.title,
      "ID:",
      track.value.id,
    );
});

const endOfTime = ref(music.filter((track) => track.album === "End of Time"));
const closeYourEyesAndListen = ref(
  music.filter((track) => track.album === "Close Your Eyes and Listen"),
);

const ep = [endOfTime.value, closeYourEyesAndListen.value];
const single = ref(music.filter((track) => track.album === "single"));
const remix = ref(music.filter((track) => track.album === "remix"));

const handleTrackChange = (newTrack: song) => {
  track.value = newTrack;
};

// Song selection functionality
const selectSong = (song: song) => {
  track.value = song;
};

const isCurrentSong = (song: song) => {
  return isClient.value && track.value && track.value.id === song.id;
};

// Simple email obfuscation - base64 encoded
const obfuscatedEmail = "Y29udGFjdEB4aW54bXVzaWMuY29t"; // base64: contact@xinxmusic.com
const emailHref = computed(
  () => `mailto:${atob(obfuscatedEmail)}?subject=Mail from xinxmusic.com`,
);
</script>
