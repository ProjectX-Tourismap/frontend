<template>
  <v-img :src="!isFall && src ? src : fallSrc" @error="isFall = true" :height="height">
    <img alt="dummy" style="display:none" :src="src" @error="isFall = true" />
    <slot />
  </v-img>
</template>

<script>
export default {
  props: {
    src: String.required,
    fallSrc: String.required,
    height: {
      type: [Number, String],
      default: 300,
    },
  },
  name: 'FallbackImage',
  data() {
    return {
      isFall: true,
    };
  },
  watch: {
    src: {
      handler(val) {
        this.isFall = true;
        if (val) {
          const image = new Image();
          image.onload = () => { this.isFall = false; };
          image.src = val;
        }
      },
      immediate: true,
    },
  },
};
</script>
