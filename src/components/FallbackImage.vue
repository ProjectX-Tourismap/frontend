<template>
  <v-img :src="isFall ? fallSrc : src" height="300px" @error="isFall = true">
    <slot />
  </v-img>
</template>

<script>
export default {
  props: {
    src: String,
    fallSrc: String,
  },
  name: 'FallbackImage',
  data() {
    return {
      isFall: false,
    };
  },
};
</script>

<style scoped>

</style>
