<template>
  <component
    :is="revealed ? 'a' : 'button'"
    :href="revealed ? emailHref : undefined"
    @click="handleClick"
    class="mb-1 flex items-center gap-2 fill-neutral-100 text-sm tracking-widest uppercase hover:text-neutral-300 transition-colors"
    :class="{ 'cursor-pointer': !revealed }"
  >
    {{ revealed ? 'Contact' : 'Reveal Contact' }}
    <IconMail class="size-5 text-neutral-100" />
  </component>
</template>

<script setup lang="ts">
// Email obfuscation techniques
const revealed = ref(false);
const emailParts = ref({
  user: '',
  domain: '',
  tld: ''
});

// ROT13 encoding for basic obfuscation
const rot13 = (str: string): string => {
  return str.replace(/[A-Za-z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
};

// Base64 encoding with custom offset
const obfuscateEmail = (email: string): string => {
  return btoa(email).split('').reverse().join('');
};

const deobfuscateEmail = (obfuscated: string): string => {
  return atob(obfuscated.split('').reverse().join(''));
};

// Multiple encoding layers
const encodedEmail = 'bWFpbHRvOmNvbnRhY3RAeGlueG11c2ljLmNvbQ=='; // base64 encoded
const obfuscatedEmail = obfuscateEmail('contact@xinxmusic.com');

const emailHref = computed(() => {
  if (!revealed.value) return '';
  
  // Decode email at runtime
  const decodedEmail = deobfuscateEmail(obfuscatedEmail);
  return `mailto:${decodedEmail}`;
});

// Anti-bot measures
const clickCount = ref(0);
const lastClickTime = ref(0);

const handleClick = (event: Event) => {
  if (revealed.value) return;
  
  event.preventDefault();
  
  // Rate limiting
  const now = Date.now();
  if (now - lastClickTime.value < 1000) {
    console.warn('Rate limited');
    return;
  }
  lastClickTime.value = now;
  
  // Human verification (simple)
  clickCount.value++;
  if (clickCount.value >= 2) {
    revealed.value = true;
    
    // Additional security: delay execution
    setTimeout(() => {
      if (revealed.value) {
        // Construct email parts separately
        emailParts.value = {
          user: rot13('pbagnpg'), // 'contact' in ROT13
          domain: 'xinxmusic',
          tld: 'com'
        };
      }
    }, 100);
  }
};

// Honeypot for bots
const honeypot = ref('');
watch(honeypot, (newVal) => {
  if (newVal) {
    console.warn('Bot detected');
    revealed.value = false;
  }
});

// Clean up on unmount
onUnmounted(() => {
  revealed.value = false;
  clickCount.value = 0;
});
</script>

<style scoped>
/* Hide from screen readers when not revealed */
a[href=""] {
  pointer-events: none;
}

/* Honeypot input (hidden) */
input[type="text"].honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}
</style>