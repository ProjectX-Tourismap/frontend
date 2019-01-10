<template>
  <v-menu class="language-selector"
          :class="{xs: $vuetify.breakpoint.width <= 720}" v-show="show">
    <v-btn color="white" slot="activator">
      <v-icon left dark>language</v-icon>
      {{languages[nowLang][($vuetify.breakpoint.width > 500) ? 'name' : 'code']}}
    </v-btn>
    <v-list>
      <v-list-tile v-for="(lang, index) in languages" :key="index"
                   @click="$emit('update:nowLang', index)">
        <v-list-tile-title>{{ lang.name }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'LanguageSelector',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: Array,
      default: () => [],
    },
    nowLang: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<!--suppress ALL -->
<style lang="scss" scoped>
  .language-selector {
    z-index: 4;
    max-width: 155px;
    max-height: 48px;
    position: fixed;
    top: 15px;
    right: 45px;

    &.xs {
      top: auto;
      right: auto;
      left: 135px;
      bottom: calc(15px + constant(safe-area-inset-bottom)) !important;
      bottom: calc(15px + env(safe-area-inset-bottom)) !important;
      bottom: 15px;
    }
  }
</style>
