<template>
  <v-list-tile @click="$emit('click')" avater>
    <v-list-tile-avatar tile>
      <img :src="entity.picture" alt="thumb" @error="replaceDummyImg(entity)">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{entity.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{entity.desc}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'EntityListTile',
  props: {
    entity: Object.required,
    failImg: String.required,
  },
  methods: {
    replaceDummyImg(entity) {
      // eslint-disable-next-line
      entity.picture = this.failImg;
    },
  },
};
</script>

<style scoped>

</style>
