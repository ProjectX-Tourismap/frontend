<template>
  <v-img :src="!isFall && src ? src : fallSrc" height="300px" @error="isFall = true" class="abcd">
    <slot />
  </v-img>
</template>

<script>
export default {
  props: {
    src: String.required,
    fallSrc: String.required,
  },
  name: 'FallbackImage',
  data() {
    return {
      isFall: false,
    };
  },
};
</script>
