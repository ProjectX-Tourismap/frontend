<template>
  <v-navigation-drawer v-model="show" absolute right stateless touchless>
    <fallback-image :src="drawerEntity.picture" :fall-src="dummyImg" class="pt-0">
      <v-layout column fill-height>
        <v-card-title>
          <v-btn fab icon dark small color="primary" @click="$emit('update:show', false)">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-card-title>
      </v-layout>
    </fallback-image>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile>
        <v-list-tile-content class="pt-2" :style="{fontSize: '1.4rem'}">
          {{drawerEntity.name}}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="drawerEntity.desc">
        <v-list-tile-content>{{drawerEntity.desc}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content class="pt-4" :style="{fontSize: '1.3rem'}"
                             v-if="nearEntities.length !== 0">
          近くの施設
        </v-list-tile-content>
        <v-list-tile-content class="pt-4 d-flex" :style="{alignItems: 'center'}" v-else>
          <v-btn depressed round color="primary" @click="fetchNearEntities(drawerEntity)">
            近くの施設を読み込む
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="near-entities" v-if="nearEntities.length !== 0">
        <v-list>
          <template v-for="(entity, i) in nearEntities">
            <entity-list-tile @click="$emit('openEntityDialog', entity)"
                              :entity="entity" :fail-img="dummyImg"
                              :key="`${entity.categoryId}:${entity.id}`"/>
            <v-divider :key="i"></v-divider>
          </template>
        </v-list>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import EntityListTile from './EntityListTile.vue';
import FallbackImage from './FallbackImage.vue';

export default {
  components: {
    EntityListTile,
    FallbackImage,
  },
  name: 'EntityDrawer',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    drawerEntity: {
      type: Object,
      default: () => {},
    },
    dummyImg: {
      type: String,
      default: 'dummy.svg',
    },
  },
  data() {
    return {
      nearEntities: [],
    };
  },
  watch: {
    show() {
      this.nearEntities = [];
    },
  },
  methods: {
    fetchNearEntities(entity) {
      this.$http({
        params: {
          query: `{nearEntitiesInPoint(point:{lat:${entity.geo.lat} lng:${entity.geo.lng}}distance:5limit:100){categoryId id name desc picture geo{lat lng}}}`,
        },
      }).then((response) => {
        this.nearEntities = response.data.data.nearEntitiesInPoint.slice(1);
      });
    },
  },
};
</script>

<style scoped>

</style>
