<template>
  <v-dialog v-model="_show" scrollable max-width="500">
    <v-card>
      <v-card>
        <fallback-image :src="dialogEntity.picture" :fall-src="dummyImg">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon @click="_show = false">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{dialogEntity.name}}</div>
            </v-card-title>
          </v-layout>
        </fallback-image>

        <v-list two-line v-if="dialogEntity.desc">
          <v-list-tile>
            <v-list-tile-content>
              {{dialogEntity.desc}}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-btn depressed color="primary"
             @click="$emit('goLocation', dialogEntity.geo)">
        Go to location
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import FallbackImage from './FallbackImage.vue';

export default {
  components: {
    FallbackImage,
  },
  name: 'EntityDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    dialogEntity: {
      type: Object,
      default: () => {},
    },
    dummyImg: {
      type: String,
      default: 'dummy.svg',
    },
  },
  computed: {
    _show: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      },
    },
  },
};
</script>
