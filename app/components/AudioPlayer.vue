<template>
  <audio :id="trackId" ref="player" controls class="hidden">
    <source :src="trackUrl" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>

  <div
    class="flex items-center justify-between border-y border-neutral-300 bg-neutral-100 px-4 py-2"
  >
    <div class="item-center flex gap-2">
      <button type="button">
        <IconBack class="size-6 shrink-0 fill-neutral-900" />
      </button>
      <button @click="toggleAudio">
        <IconPlay class="size-6 shrink-0 fill-neutral-900" />
        <!-- <IconPause v-if="!playStatus" /> -->
      </button>
      <button type="button">
        <IconForward class="size-6 shrink-0 fill-neutral-900" />
      </button>
      <button type="button">
        <IconShuffle class="size-6 shrink-0 fill-neutral-900" />
      </button>
      <button type="button">
        <IconRepeat class="size-6 shrink-0 fill-neutral-900" />
      </button>
    </div>
    <div class="flex items-center">
      <button class="pr-2" @click="muteAudio">
        <IconVolumeLow
          v-if="volumeStatus"
          class="size-6 shrink-0 fill-neutral-900"
        />
        <IconMute
          v-if="!volumeStatus"
          class="size-8 shrink-0 fill-neutral-900"
        />
      </button>
      <input
        v-model="volume"
        type="range"
        min="1"
        max="100"
        class="m-2 h-1 w-24 rotate-90 appearance-none rounded-full bg-neutral-900"
        @change="volumeAdjust"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  trackTitle: string;
  trackUrl: string;
  trackId: string;
  music: Music;
}>();

const playStatus = ref(true);
const volumeStatus = ref(true);
const volume = ref(80);
const player = ref<HTMLAudioElement | null>(null);
let currentVolume = 0;

const toggleAudio = () => {
  if (player.value?.paused) {
    player.value?.play();
    playStatus.value = true;
  } else {
    player.value?.pause();
    playStatus.value = false;
  }
};

const volumeAdjust = () => {
  const audio = document.getElementById(props.trackId) as HTMLAudioElement;
  audio.volume = volume.value / 100;
};

const muteAudio = () => {
  volumeStatus.value = !volumeStatus.value;
  if (volume.value > 0) {
    currentVolume = volume.value;
  }
  const audio = document.getElementById(props.trackId) as HTMLAudioElement;
  audio.muted = !volumeStatus.value;
  if (!volumeStatus.value) {
    volume.value = 0;
  } else {
    volume.value = currentVolume;
  }
};

const trackUrl = computed(() => props.trackUrl);
watch(trackUrl, (newVal) => {
  if (newVal) {
    player.value?.load();
    toggleAudio();
  }
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background-color: rgb(245 245 244);
  border: rgb(115 115 115) 1px solid;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
