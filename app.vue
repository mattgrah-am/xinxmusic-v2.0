<template>
  <div>
    <div
      class="mx-auto h-full max-w-screen-lg rounded border-x border-neutral-950 bg-neutral-950/25 pb-24 pt-4 shadow"
    >
      <div class="mt-4 flex items-end justify-between px-6">
        <p class="uppercase tracking-widest">Music archive</p>
        <p
          class="mb-1 flex items-center gap-2 fill-neutral-100 text-sm uppercase tracking-widest"
        >
          Contact <IconMail class="size-5 text-neutral-100" />
        </p>
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
          <h3 class="uppercase text-neutral-200">
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
              <h4>{{ song.title }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8 border-b border-neutral-800 px-4 pb-8 shadow">
        <div
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <h2
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 uppercase text-neutral-50 shadow"
          >
            Single
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="song in single"
            :key="song.id"
            class="flex items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5"
          >
            <img
              :src="song.artwork"
              :alt="`${song.title} artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
            />
            <p>{{ song.title }}</p>
          </div>
        </div>
      </div>
      <div class="mb-6 border-b border-neutral-800 px-4 pb-8 shadow">
        <div
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <h2
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 uppercase text-neutral-50 shadow"
          >
            Remix
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="song in remix"
            :key="song.id"
            class="flex items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5"
          >
            <img
              :src="song.artwork"
              :alt="`${song.title} artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
            />
            <p>{{ song.title }}</p>
          </div>
        </div>
      </div>
      <footer class="text-center">
        <p>
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

    <MusicPlayer :audio-data="track" />
  </div>
</template>

<script setup lang="ts">
import { music } from "@/utils/music";

const track = ref(music[Math.floor(Math.random() * music.length)]);

const endOfTime = ref(music.filter((track) => track.album === "End of Time"));
const closeYourEyesAndListen = ref(
  music.filter((track) => track.album === "Close Your Eyes and Listen"),
);
const ep = [endOfTime.value, closeYourEyesAndListen.value];

const single = ref(music.filter((track) => track.album === "single"));
const remix = ref(music.filter((track) => track.album === "remix"));
</script>
