<template>
  <v-card class="directions-card">
    <v-text-field class="start-text" readonly
                  :value="_start && (_start.name ? _start.name : `${_start.lat}, ${_start.lng}`)"
                  :placeholder="language.keys.start" prepend-icon="my_location" clearable
                  @click:clear="_start = undefined"/>
    <v-text-field class="dest-text" readonly
                  :value="_dest && (_dest.name ? _dest.name : `${_dest.lat}, ${_dest.lng}`)"
                  :placeholder="language.keys.dest" prepend-icon="location_on" clearable
                  @click:clear="_dest = undefined"/>

    <v-btn flat icon class="reverse-btn" @click="directionReverse">
      <v-icon medium style="transform:rotate(90deg)">compare_arrows</v-icon>
    </v-btn>

    <v-btn-toggle v-model="_profile" :mandatory="true"
                  class="profiles" :class="{xs: $vuetify.breakpoint.xsOnly}">
      <v-btn flat value="mapbox/driving-traffic"><v-icon>directions_car</v-icon></v-btn>
      <v-btn flat value="mapbox/driving"><v-icon>directions_car</v-icon>(highway)</v-btn>
      <v-btn flat value="mapbox/cycling"><v-icon>directions_bike</v-icon></v-btn>
      <v-btn flat value="mapbox/walking"><v-icon>directions_walk</v-icon></v-btn>
    </v-btn-toggle>
  </v-card>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

export default {
  name: 'DirectionSearchBox',
  props: {
    profile: {
      type: String,
      default: 'mapbox/driving',
    },
    start: {
      type: Object,
      default: undefined,
    },
    dest: {
      type: Object,
      default: undefined,
    },
    language: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    _profile: {
      get() {
        return this.profile;
      },
      set(val) {
        this.$emit('update:profile', val);
      },
    },
    _start: {
      get() {
        return this.start;
      },
      set(val) {
        this.$emit('update:start', val);
      },
    },
    _dest: {
      get() {
        return this.dest;
      },
      set(val) {
        this.$emit('update:dest', val);
      },
    },
  },
  methods: {
    directionReverse() {
      const start = this._start;
      this._start = this._dest;
      this._dest = start;
    },
  },
};
</script>

<style lang="scss" scoped>
  .directions-card {
    width: 100%;
    padding-left: 10px;
    display: grid;
    grid-template-rows: 64px 64px 40px;
    grid-template-columns: 1fr 40px;

    .start-text {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    .dest-text {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    .reverse-btn {
      margin: auto;
      grid-row: 1 / 3;
      grid-column: 2 / 3;
    }

    .profiles {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      box-shadow: none;
      justify-content: space-around;

      &.xs {
        grid-column: 1 / 3;
      }
    }
  }
</style>
