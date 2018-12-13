<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="$emit('update:show', false)">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Search Results</v-toolbar-title>
      </v-toolbar>
      <v-list three-line subheader v-if="searchResult.length !== 0">
        <template v-for="(entity, i) in searchResult">
          <entity-list-tile @click="$emit('openEntityDialog', entity)"
                            :entity="entity" :fail-img="dummyImg"
                            :key="`${entity.categoryId}:${entity.id}`"/>
          <v-divider :key="i"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import EntityListTile from '../components/EntityListTile.vue';

export default {
  components: {
    EntityListTile,
  },
  name: 'SearchResultDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    searchResult: {
      type: Array,
      default: () => [],
    },
    dummyImg: {
      type: String,
      default: 'dummy.svg',
    },
  },
};
</script>

<style scoped>

</style>
