<template>
  <v-img :src="!isFall && src ? src : fallSrc" height="300px" @error="isFall = true">
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
  watch: {
    src() {
      this.isFall = false;
    },
  },
  data() {
    return {
      isFall: false,
    };
  },
};
</script>
