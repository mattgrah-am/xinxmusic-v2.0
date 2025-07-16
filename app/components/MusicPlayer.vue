<template>
  <div
    class="fixed bottom-0 flex min-h-20 w-full flex-col gap-2 bg-neutral-950/85 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:gap-8"
  >
    <ClientOnly>
      <div class="flex shrink-0 items-center gap-2 sm:gap-4">
        <div class="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            :disabled="!hasPrevious || isLoading"
            class="cursor-pointer"
            @click="previousTrack"
          >
            <IconBack
              class="size-5 shrink-0 text-neutral-50 transition-colors hover:text-red-400 sm:size-6"
              :class="{ 'opacity-50': !hasPrevious || isLoading }"
            />
            <span class="sr-only">Previous track</span>
          </button>
          <button
            :disabled="isLoading"
            class="cursor-pointer"
            @click="playPause"
          >
            <IconWaveLoading
              v-if="isLoading"
              class="size-7 shrink-0 text-red-500 sm:size-8"
            />
            <IconPlay
              v-else-if="!isPlaying"
              class="size-7 shrink-0 fill-neutral-50 transition-colors hover:fill-red-400 sm:size-8"
            />
            <IconPause
              v-else
              class="size-7 shrink-0 fill-neutral-50 transition-colors hover:fill-red-400 sm:size-8"
            />
            <span class="sr-only">{{
              isLoading ? "Loading..." : isPlaying ? "Pause" : "Play"
            }}</span>
          </button>
          <button
            type="button"
            :disabled="!hasNext || isLoading"
            class="cursor-pointer"
            @click="nextTrack"
          >
            <IconForward
              class="size-5 shrink-0 text-neutral-50 transition-colors hover:text-red-400 sm:size-6"
              :class="{ 'opacity-50': !hasNext || isLoading }"
            />
            <span class="sr-only">Next track</span>
          </button>
        </div>

        <img
          :src="artwork"
          :alt="`${audioData.title} artwork`"
          height="500"
          width="500"
          class="size-12 shrink-0 rounded-md border-2 border-neutral-900/75 sm:size-16"
        />

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-neutral-50 sm:text-base">
            {{ audioData.title }}
          </p>
          <p class="truncate text-xs text-neutral-200 sm:text-sm">
            {{ audioData.artist }} - {{ audioData.album }}
          </p>
        </div>
      </div>
    </ClientOnly>

    <div class="flex w-full items-center justify-center gap-2 sm:gap-3">
      <p
        class="hidden text-xs text-neutral-300 sm:block"
        :class="{ hidden: waveError || waveLoading }"
      >
        {{ currentTime }}
      </p>
      <div class="relative flex w-full items-center justify-center">
        <div
          ref="waveformRef"
          class="w-full"
          :class="{ 'opacity-0': waveError || waveLoading }"
        />
        <div
          v-if="waveLoading"
          class="absolute inset-0 flex items-center justify-center"
        >
          <IconWaveLoading class="w-4 text-red-600" />
        </div>
        <div
          v-else-if="waveError"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="text-xs text-neutral-300">Error loading waveform.</div>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          :disabled="isLoading"
          class="cursor-pointer transition-colors hover:text-red-400"
          :class="{ 'opacity-50': isLoading }"
          @click="shuffleAndPlay"
        >
          <IconShuffle class="size-5 shrink-0" />
          <span class="sr-only">Play random song</span>
        </button>
        <button
          type="button"
          :disabled="isLoading"
          class="cursor-pointer"
          @click="toggleMute"
        >
          <IconVolumeLow
            v-if="!isMuted"
            class="size-5 shrink-0 text-neutral-50 transition-colors hover:text-red-400"
            :class="{ 'opacity-50': isLoading }"
          />
          <IconMute
            v-else
            class="size-5 shrink-0 text-neutral-50 transition-colors hover:text-red-400"
            :class="{ 'opacity-50': isLoading }"
          />
          <span class="sr-only">{{ isMuted ? "Unmute" : "Mute" }}</span>
        </button>
      </div>
      <p
        class="hidden text-xs text-neutral-300 sm:block"
        :class="{ hidden: waveError || waveLoading }"
      >
        {{ duration }}
      </p>
    </div>

    <div class="hidden items-center gap-4 sm:flex">
      <button
        type="button"
        :disabled="isLoading"
        class="cursor-pointer transition-colors hover:text-red-400"
        :class="{ 'opacity-50': isLoading }"
        @click="shuffleAndPlay"
      >
        <IconShuffle class="size-6 shrink-0" />
        <span class="sr-only">Play random song</span>
      </button>
      <button
        type="button"
        :disabled="isLoading"
        class="cursor-pointer"
        @click="toggleMute"
      >
        <IconVolumeLow
          v-if="!isMuted"
          class="size-6 shrink-0 text-neutral-50 transition-colors hover:text-red-400"
          :class="{ 'opacity-50': isLoading }"
        />
        <IconMute
          v-else
          class="size-6 shrink-0 text-neutral-50 transition-colors hover:text-red-400"
          :class="{ 'opacity-50': isLoading }"
        />
        <span class="sr-only">{{ isMuted ? "Unmute" : "Mute" }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

import { music } from "@/utils/music";
import type { song } from "@/utils/music";

const config = useRuntimeConfig();
const debug = !config.public.production; // Enable debug mode based on environment

const waveformRef = ref<HTMLElement | null>(null);
const wavesurfer = ref<WaveSurfer | null>(null);
const isPlaying = ref(false);
const waveLoading = ref(false);
const waveError = ref(false);
const audioLoading = ref(false);
const artwork = ref("");
const totalTime = ref<number | null>(null);
const duration = ref("0:00");
const timerInterval = ref<ReturnType<typeof setInterval> | null>(null);
const currentTime = ref("0:00");
const isMuted = ref(false);
const currentTrackIndex = ref(0);
const shouldAutoPlay = ref(false);

const props = defineProps<{
  audioData: song;
  waveformOptions?: {
    waveColor?: string;
    progressColor?: string;
    height?: number;
    barHeight?: number;
    barWidth?: number;
    barGap?: number;
    barRadius?: number;
    cursorWidth?: number;
    cursorColor?: string;
    normalize?: boolean;
  };
}>();

const emit = defineEmits(["random-track", "track-change"]);

// Computed properties for navigation
const hasPrevious = computed(() => currentTrackIndex.value > 0);
const hasNext = computed(() => currentTrackIndex.value < music.length - 1);
const isLoading = computed(() => waveLoading.value || audioLoading.value);

// Initialize current track index
onMounted(() => {
  currentTrackIndex.value = music.findIndex(
    (track) => track.id === props.audioData.id,
  );
});

// Update current track index when audio data changes
watch(
  () => props.audioData.id,
  (newId) => {
    currentTrackIndex.value = music.findIndex((track) => track.id === newId);
  },
);

// Update artwork when audio data changes
watch(
  () => props.audioData.artwork,
  (newArtwork) => {
    artwork.value = newArtwork;
    if (debug) console.log("Artwork updated:", newArtwork);
  },
);

const playPause = () => {
  if (debug) console.log("playPause");
  if (wavesurfer.value) {
    wavesurfer.value.playPause();
    isPlaying.value = !isPlaying.value;
  }
};

const previousTrack = () => {
  if (hasPrevious.value) {
    currentTrackIndex.value--;
    const newTrack = music[currentTrackIndex.value];
    emit("track-change", newTrack);
  }
};

const nextTrack = () => {
  if (hasNext.value) {
    currentTrackIndex.value++;
    const newTrack = music[currentTrackIndex.value];
    emit("track-change", newTrack);
  }
};

const shuffleAndPlay = () => {
  // Pick a random song from the music array
  const randomIndex = Math.floor(Math.random() * music.length);
  const randomSong = music[randomIndex];

  // Emit the track change to update the main track
  emit("track-change", randomSong);

  if (debug) console.log("Shuffle selected:", randomSong?.title);
};

const toggleMute = () => {
  if (wavesurfer.value) {
    isMuted.value = !isMuted.value;
    wavesurfer.value.setMuted(isMuted.value);
  }
};

const initializeWaveSurfer = () => {
  if (!waveformRef.value) {
    if (debug) console.error("Waveform container element not found.");
    waveError.value = true;
    return;
  }

  // Start loading states
  waveLoading.value = true;
  audioLoading.value = true;

  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: props.waveformOptions?.waveColor ?? "oklch(0.872 0.01 258.338)",
    progressColor:
      props.waveformOptions?.progressColor ?? "oklch(0.645 0.246 16.439)",
    cursorColor: "oklch(0.872 0.01 258.338)",
    height: props.waveformOptions?.height ?? 28,
    barHeight: props.waveformOptions?.barHeight ?? 1,
    barWidth: props.waveformOptions?.barWidth ?? 2,
    barGap: props.waveformOptions?.barGap ?? 4,
    barRadius: props.waveformOptions?.barRadius ?? 2,
    cursorWidth: props.waveformOptions?.cursorWidth ?? 2,
    normalize: props.waveformOptions?.normalize ?? false,
    plugins: [
      Hover.create({
        lineColor: "oklch(0.645 0.246 16.439)",
        lineWidth: 2,
        labelBackground: "oklch(0.556 0 0)",
        labelColor: "oklch(0.985 0 0)",
        labelSize: "12px",
      }),
    ],
  });

  wavesurfer.value.load(props.audioData.audio);

  // Audio is loading - wait for it to be ready
  wavesurfer.value.on("loading", (percent) => {
    if (debug) console.log("Loading progress:", percent + "%");
    audioLoading.value = true;
  });

  wavesurfer.value.on("ready", () => {
    if (debug) console.log("WaveSurfer is ready.");
    waveLoading.value = false;
    audioLoading.value = false;
    totalTime.value = wavesurfer.value?.getDuration() ?? 0;
    const minutes = Math.floor(totalTime.value / 60);
    const seconds = Math.floor(totalTime.value % 60);
    duration.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    // Auto-play if requested
    if (shouldAutoPlay.value && wavesurfer.value) {
      wavesurfer.value.play();
      shouldAutoPlay.value = false; // Reset flag
    }
  });

  wavesurfer.value.on("play", () => {
    isPlaying.value = true;
    startTimer();
  });

  wavesurfer.value.on("finish", () => {
    isPlaying.value = false;
    stopTimer();
    currentTime.value = "0:00";
  });

  // Handle loading errors
  wavesurfer.value.on("error", (error) => {
    if (debug) console.error("Audio loading error:", error);
    waveError.value = true;
    waveLoading.value = false;
    audioLoading.value = false;
  });
};

onMounted(() => {
  artwork.value = props.audioData.artwork;
  initializeWaveSurfer();
});

watch(
  () => props.audioData.audio,
  (newAudioUrl: string) => {
    if (wavesurfer.value) {
      // Start loading states when changing tracks
      audioLoading.value = true;
      waveLoading.value = true;
      isPlaying.value = false;

      // Set auto-play flag for new tracks
      shouldAutoPlay.value = true;

      wavesurfer.value.load(newAudioUrl);
    }
  },
);

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    const time = wavesurfer.value?.getCurrentTime() || 0;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    currentTime.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 250);
};

const stopTimer = () => {
  if (timerInterval.value !== null) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

onUnmounted(() => {
  if (wavesurfer.value) {
    stopTimer();
    wavesurfer.value.destroy();
  }
});
</script>
