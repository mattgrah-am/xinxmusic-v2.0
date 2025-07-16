<template>
  <div>
    <main
      class="mx-auto h-full max-w-screen-lg rounded border-x border-neutral-950 bg-neutral-950/25 pt-4 pb-24 shadow"
    >
      <header class="mt-4 flex items-end justify-between px-6">
        <p class="tracking-widest uppercase">Music archive</p>
        <a
          :href="emailHref"
          class="mb-1 flex items-center gap-2 fill-neutral-100 text-sm tracking-widest uppercase transition-colors hover:text-neutral-300"
        >
          Contact <IconMail class="size-5 text-neutral-100" />
        </a>
      </header>

      <section
        class="mx-1 mb-8 flex max-w-screen-lg flex-col items-center justify-center rounded-3xl border-4 border-neutral-900/75 bg-neutral-950 p-6 shadow-lg"
      >
        <img
          src="/logo.webp"
          alt="Xinx Music - Underground Electronic Music Producer and DJ Logo"
          width="768"
          height="321"
          class=""
          loading="eager"
        />
        <h1 class="mt-4 text-center text-2xl font-bold text-neutral-50">
          Xinx Music Archive
        </h1>
        <p class="mt-2 text-center text-sm text-neutral-300">
          Electronic Music Producer & DJ - Dubstep, Experimental & Underground
          Sounds
        </p>
      </section>
      <section v-for="(item, idx) in ep" :key="idx" class="px-4">
        <header
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <span
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 shadow"
          >
            EP
          </span>
          <h2 class="text-neutral-200 uppercase">
            {{ item[0]?.album }}
          </h2>
        </header>

        <article
          class="mb-8 flex flex-col items-stretch gap-6 border-b border-neutral-800 pb-8 shadow sm:flex-row"
        >
          <img
            :src="item[0]?.artwork"
            :alt="`${item[0]?.album} EP cover art by Xinx - Electronic music album artwork`"
            width="500"
            height="500"
            class="size-full rounded-xl border border-neutral-900 shadow sm:size-64"
            loading="lazy"
          />
          <div class="flex w-full flex-col justify-between gap-2">
            <button
              v-for="epSong in item"
              :key="epSong.id"
              class="w-full cursor-pointer text-left transition-colors hover:text-red-400"
              :class="{ 'font-bold text-red-500': isCurrentSong(epSong) }"
              :aria-label="`Play ${epSong.title} by ${epSong.artist}`"
              @click="selectSong(epSong)"
            >
              <h3>{{ epSong.title }}</h3>
            </button>
          </div>
        </article>
      </section>
      <section class="mb-8 border-b border-neutral-800 px-4 pb-8 shadow">
        <header
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <span
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 uppercase shadow"
          >
            Single
          </span>
          <h2 class="sr-only">Single Tracks</h2>
        </header>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="singleSong in single"
            :key="singleSong.id"
            class="flex cursor-pointer items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5 text-left transition-colors hover:bg-neutral-800/50"
            :class="{
              'border-red-500 bg-red-900/25 ring-1 ring-red-500':
                isCurrentSong(singleSong),
            }"
            :aria-label="`Play ${singleSong.title} by ${singleSong.artist}`"
            @click="selectSong(singleSong)"
          >
            <img
              :src="singleSong.artwork"
              :alt="`${singleSong.title} single cover art by Xinx - Electronic music track artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
              loading="lazy"
            />
            <h3
              :class="{ 'font-bold text-red-400': isCurrentSong(singleSong) }"
            >
              {{ singleSong.title }}
            </h3>
          </button>
        </div>
      </section>
      <section class="mb-6 border-b border-neutral-800 px-4 pb-8 shadow">
        <header
          class="mb-4 flex items-center gap-6 rounded-xl border border-red-900/15 bg-red-900/15"
        >
          <span
            class="rounded-xl border border-red-900 bg-red-700 px-3 py-1 text-neutral-50 uppercase shadow"
          >
            Remix
          </span>
          <h2 class="sr-only">Remix Tracks</h2>
        </header>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="remixSong in remix"
            :key="remixSong.id"
            class="flex cursor-pointer items-center gap-4 rounded-md border border-neutral-800/50 bg-neutral-800/25 p-0.5 text-left transition-colors hover:bg-neutral-800/50"
            :class="{
              'border-red-500 bg-red-900/25 ring-1 ring-red-500':
                isCurrentSong(remixSong),
            }"
            :aria-label="`Play ${remixSong.title} by ${remixSong.artist}`"
            @click="selectSong(remixSong)"
          >
            <img
              :src="remixSong.artwork"
              :alt="`${remixSong.title} remix cover art by Xinx - Electronic music remix artwork`"
              width="500"
              height="500"
              class="size-16 shrink-0 rounded-md border-2 border-neutral-950/75"
              loading="lazy"
            />
            <h3 :class="{ 'text-red-400': isCurrentSong(remixSong) }">
              {{ remixSong.title }}
            </h3>
          </button>
        </div>
      </section>
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
    </main>

    <MusicPlayer
      v-if="track"
      :audio-data="track"
      @track-change="handleTrackChange"
    />
  </div>
</template>

<script setup lang="ts">
import { music } from "@/utils/music";
import type { song } from "@/utils/music";

const track = ref(music[0]); // Start with first song to avoid hydration mismatch
const isClient = ref(false);

// Set random song and enable highlighting only on client
onMounted(() => {
  track.value = music[Math.floor(Math.random() * music.length)];
  isClient.value = true;
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

// Dynamic structured data for current playing track
watchEffect(() => {
  if (track.value) {
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicRecording",
            name: track.value.title,
            byArtist: {
              "@type": "MusicGroup",
              name: track.value.artist,
              url: "https://xinxmusic.com",
            },
            inAlbum: {
              "@type": "MusicAlbum",
              name: track.value.album,
              byArtist: {
                "@type": "MusicGroup",
                name: track.value.artist,
              },
            },
            url: track.value.audio,
            image: track.value.artwork,
            genre: ["Electronic", "Dubstep", "Experimental"],
            recordingOf: {
              "@type": "MusicComposition",
              name: track.value.title,
              composer: {
                "@type": "Person",
                name: track.value.artist,
              },
            },
          }),
        },
      ],
    });
  }
});
</script>
