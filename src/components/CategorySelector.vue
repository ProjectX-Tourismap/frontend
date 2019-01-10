<template>
  <v-menu class="category-selector" v-model="showCategoryMenu" absolute v-if="show">
    <v-btn :color="(colors[category] || { color: 'white' }).color"
           slot="activator">カテゴリー</v-btn>
    <v-list>
      <v-list-tile @click="clickTile(-1)">
        <v-list-tile-avatar>
          <div style="width: 30px;height: 30px;"></div>
        </v-list-tile-avatar>
        <v-list-tile-title>全て</v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-for="(color, i) in colors" :key="color.name" @click="clickTile(i)">
        <v-list-tile-avatar>
          <div style="width: 30px;height: 30px;border-radius: 50%"
               :style="{backgroundColor:color.color}"></div>
        </v-list-tile-avatar>
        <v-list-tile-title>
          {{ color.name }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'CategorySelector',
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showCategoryMenu: false,
      category: -1,
    };
  },
  methods: {
    clickTile(i) {
      this.category = i;
      this.$emit('change', i);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-selector {
  z-index: 3;
  position: absolute;
  top: 15px;
  right: 210px;
}

@media (max-width: 850px) {
  .category-selector {
    top: auto;
    right: auto;
    left: 15px;
    bottom: calc(15px + constant(safe-area-inset-bottom)) !important;
    bottom: calc(15px + env(safe-area-inset-bottom)) !important;
    bottom: 15px;
  }
}
</style>
