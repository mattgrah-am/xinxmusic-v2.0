<template>
  <div
    class="fixed bottom-0 flex min-h-20 w-full items-center justify-between gap-16 bg-neutral-950/85 px-4 py-2"
  >
    <ClientOnly>
      <div class="flex shrink-0 items-center gap-4">
        <div class="flex items-center gap-3">
          <button type="button">
            <IconBack class="size-6 shrink-0 text-neutral-50" />
          </button>
          <button @click="playPause">
            <IconPlay
              v-if="!isPlaying"
              class="size-8 shrink-0 fill-neutral-50"
            />
            <IconPause v-else class="size-8 shrink-0 fill-neutral-50" />
            <span class="sr-only">{{ isPlaying ? "Pause" : "Play" }}</span>
          </button>
          <button type="button">
            <IconForward class="size-6 shrink-0 text-neutral-50" />
          </button>
        </div>

        <img
          :src="artwork"
          :alt="`${audioData.title} artwork`"
          height="500"
          width="500"
          class="size-16 shrink-0 rounded-md border-2 border-neutral-900/75"
        />

        <div class="">
          <p class="text-base text-neutral-50">
            {{ audioData.title }}
          </p>
          <p class="text-sm text-neutral-200">
            {{ audioData.artist }} - {{ audioData.album }}
          </p>
        </div>
      </div>
    </ClientOnly>

    <div class="flex w-full items-center justify-center gap-3">
      <p
        class="text-xs text-neutral-300"
        :class="{ hidden: waveError || waveLoading }"
      >
        {{ currentTime }}
      </p>
      <IconWaveLoading v-if="waveLoading" class="w-4 text-red-600" />
      <div v-else-if="waveError" class="text-xs text-neutral-300">
        Error loading waveform.
      </div>
      <div
        ref="waveformRef"
        class="w-full"
        :class="{ hidden: waveError || waveLoading }"
      />
      <p
        class="text-xs text-neutral-300"
        :class="{ hidden: waveError || waveLoading }"
      >
        {{ duration }}
      </p>
    </div>

    <div class="flex items-center gap-4">
      <button type="button">
        <IconShuffle class="size-6 shrink-0 text-neutral-50" />
      </button>
      <button type="button">
        <IconRepeat class="size-6 shrink-0 text-neutral-50" />
      </button>
      <button type="button">
        <IconVolumeLow class="size-6 shrink-0 text-neutral-50" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

const waveformRef = ref<HTMLElement | null>(null);
const wavesurfer = ref<WaveSurfer | null>(null);
const isPlaying = ref(false);
const waveLoading = ref(false);
const waveError = ref(false);
const artwork = ref("");
const totalTime = ref<number | null>(null);
const duration = ref("0:00");
const timerInterval = ref<number | null>(null);
const currentTime = ref("0:00");

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

const emit = defineEmits(["random-track"]);

onMounted(() => {
  artwork.value = props.audioData.artwork;
});

const playPause = () => {
  console.log("playPause");
  if (wavesurfer.value) {
    wavesurfer.value.playPause();
    isPlaying.value = !isPlaying.value;
  }
};

onMounted(() => {
  if (!waveformRef.value) {
    console.error("Waveform container element not found.");
    waveError.value = true;
    return;
  }
  waveLoading.value = true;
  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: props.waveformOptions?.waveColor ?? "oklch(0.872 0.01 258.338)",
    progressColor:
      props.waveformOptions?.progressColor ?? "oklch(0.645 0.246 16.439)",
    cursorColor: "oklch(0.872 0.01 258.338)",
    height: props.waveformOptions?.height ?? 36,
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

  wavesurfer.value.on("ready", () => {
    console.log("WaveSurfer is ready.");
    waveLoading.value = false;
    totalTime.value = wavesurfer.value?.getDuration() ?? 0;
    const minutes = Math.floor(totalTime.value / 60);
    const seconds = Math.floor(totalTime.value % 60);
    duration.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
});

watch(
  () => props.audioData.audio,
  (newAudioUrl: string) => {
    if (wavesurfer.value) {
      wavesurfer.value.load(newAudioUrl);
      isPlaying.value = !isPlaying.value;
    }
  },
);

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    const time = wavesurfer.value?.getCurrentTime() || 0;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    currentTime.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 100); // Update every 100ms (adjust as needed)
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
