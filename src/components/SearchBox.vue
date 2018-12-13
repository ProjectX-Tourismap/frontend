<template>
  <div class="search-box" :class="{xs: $vuetify.breakpoint.xsOnly}">
    <v-text-field v-model="_text"
                  solo
                  type="text"
                  :label="language.keys.search"
                  clearable
                  append-icon="search"
                  :rules="[(v) => !!v || '']"
                  @click:append="$emit('clickSearchButton')"
                  @keyup.native.enter="$emit('clickSearchButton')"
                  v-if="!isDirection"
    ></v-text-field>

    <direction-search-box v-else
                          :profile.sync="direction.profile"
                          :start.sync="direction.start"
                          :dest.sync="direction.dest"
                          :language="language"/>

    <v-btn fab large @click="toggleBox" color="white" class="directions-button">
      <v-icon :color="isDirection ? '#000' : '#4285F4'">
        {{isDirection ? 'clear' : 'directions'}}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import DirectionSearchBox from './DirectionSearchBox.vue';

export default {
  components: {
    DirectionSearchBox,
  },
  name: 'SearchBox',
  props: {
    language: {
      type: Object,
      default: () => {},
    },
    searchText: {
      type: String,
      default: '',
    },
    direction: {
      type: Object,
      default: () => {},
    },
    isDirection: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _text: {
      get() {
        return this.searchText;
      },
      set(val) {
        this.$emit('update:searchText', val);
      },
    },
  },
  methods: {
    toggleBox() {
      this.$emit('update:isDirection', !this.isDirection);
    },
  },
};
</script>

<!--suppress ALL -->
<style lang="scss" scoped>
  .search-box {
    display: flex;
    z-index: 1;
    max-width: 350vw;
    min-width: 500px;
    position: fixed;
    top: calc(20px + constant(safe-area-inset-top));
    top: calc(20px + env(safe-area-inset-top));
    left: 20px;
    pointer-events: none;

    & > * {
      pointer-events: auto;
    }

    &.xs {
      max-width: calc(100% - 25px);
      min-width: calc(100% - 25px);
      width: calc(100% - 25px);
    }

    .directions-button {
      margin-top: 4px;
      width: 44px;
      height: 44px;
    }
  }
</style>
