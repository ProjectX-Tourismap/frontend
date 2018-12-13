<template>
  <v-bottom-sheet v-model="s">
    <v-btn dark fab absolute bottom right v-show="showButton"
           class="map-selector" slot="activator">
      <v-icon>layers</v-icon>
    </v-btn>
    <v-card tile class="map-selector-pane">
      <template v-for="name in Object.keys(styles)">
        <v-hover :key="name">
          <v-img slot-scope="{ hover }" :class="`elevation-${hover ? 5 : 2}`" aspect-ratio="1"
                 :src="`img/maps/${name}.png`"
                 @click="changeType(name)"/>
        </v-hover>
      </template>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'MapSelector',
  props: {
    showButton: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'day',
    },
    styles: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    s: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },
  methods: {
    changeType(name) {
      this.$emit('update:type', name);
      this.s = false;
    },
  },
};
</script>

<!--suppress ALL -->
<style lang="scss" scoped>
  .map-selector {
    z-index: 2;
    position: fixed;
    bottom: calc(15px + constant(safe-area-inset-bottom)) !important;
    bottom: calc(15px + env(safe-area-inset-bottom)) !important;
    bottom: 15px;
  }

  .map-selector-pane {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
    padding-bottom: calc(20px + constant(safe-area-inset-bottom));
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    justify-content: space-around;

    > .v-image {
      width: 100px;
      max-width: 100px;
    }
  }
</style>
