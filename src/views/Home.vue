<template>
  <div id="home">
    <div v-if="showLoading" class="overlay">
      <square-spin-loader color="white" size="80px"></square-spin-loader>
    </div>

    <div v-if="showMap" class="main">
      <mgl-map
              :accessToken="mapbox.token"
              :mapStyle.sync="mapStyle"
              :center="[mapCenter.lng,mapCenter.lat]" :zoom="14"
              @load="loadMap"
              class="map-view" ref="mapView">

        <mgl-navigation-control position="top-right"/>

        <mgl-marker v-for="entity in entities" :key="entity.id"
                    anchor="top"
                    :coordinates="[entity.geo.lng,entity.geo.lat]"
                    :color="colors[entity.categoryId]">
          <mgl-popup :closeButton="false">
            <v-card :flat="true">
              <div>{{ entity.name }}</div>
              <v-btn block flat small color="primary" @click="openEntityDrawer(entity)">
                ...more
              </v-btn>
            </v-card>
          </mgl-popup>
        </mgl-marker>
      </mgl-map>

      <v-text-field class="searchBox" :class="{xs: $vuetify.breakpoint.xsOnly}"
                    v-model="searchText"
                    solo
                    type="text"
                    :label="language.keys.search"
                    clearable
                    append-icon="search"
                    :rules="[(v) => !!v || '']"
                    @click:append="clickSearchButton"
      ></v-text-field>

      <v-menu :style="{position:'absolute', top: '15px', right: '45px'}">
        <v-btn color="white" slot="activator">
          <v-icon left dark>language</v-icon>{{language.name}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="(lang, index) in languages" :key="index" @click="nowLang = index">
            <v-list-tile-title>{{ lang.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn absolute :dark="light" fab bottom right
             :color="(light ? 'black' : 'white')" @click="toggleLight" class="fab-btn">
        <v-icon>{{ light?'cloud':'wb_sunny' }}</v-icon>
      </v-btn>

      <v-dialog v-model="showSearchResult"
                fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="showSearchResult = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Search Results</v-toolbar-title>
          </v-toolbar>
          <v-list three-line subheader v-if="searchResult.length !== 0">
            <template v-for="(entity, i) in searchResult">
              <entity-list-tile @click="openEntityDialog(entity)"
                                :entity="entity" :fail-img="dummyImg"
                                :key="`${entity.categoryId}:${entity.id}`"/>
              <v-divider :key="i"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showNoResult">
        <v-card>
          <v-card-title>検索結果がありませんでした</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline @click="showNoResult = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEntity" scrollable max-width="500">
        <v-card>
          <v-card>
            <fallback-image :src="showDialogEntityItem.picture" :fall-src="dummyImg">
              <v-layout column fill-height>
                <v-card-title>
                  <v-btn dark icon @click="showEntity = false">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">{{showDialogEntityItem.name}}</div>
                </v-card-title>
              </v-layout>
            </fallback-image>

            <v-list two-line v-if="showDialogEntityItem.desc">
              <v-list-tile>
                <v-list-tile-content>
                  {{showDialogEntityItem.desc}}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-btn depressed color="primary"
                 @click="goLocation(showDialogEntityItem.geo)">
            Go to location
          </v-btn>
        </v-card>
      </v-dialog>

      <v-navigation-drawer v-model="showEntityDrawer" absolute right>
        <fallback-image :src="showDrawerEntityItem.picture" :fall-src="dummyImg" class="pt-0">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn fab icon dark small color="primary" @click="showEntityDrawer = false">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-card-title>
          </v-layout>
        </fallback-image>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
          <v-list-tile>
            <v-list-tile-content class="pt-2" :style="{fontSize: '1.4rem'}">
              {{showDrawerEntityItem.name}}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="showDrawerEntityItem.desc">
            <v-list-tile-content>{{showDrawerEntityItem.desc}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="pt-4" :style="{fontSize: '1.3rem'}"
                                 v-if="nearEntities.length !== 0">
              近くの施設
            </v-list-tile-content>
            <v-list-tile-content class="pt-4 d-flex" :style="{alignItems: 'center'}" v-else>
              <v-btn depressed round color="primary"
                     @click="fetchNearEntities(showDrawerEntityItem)">
                近くの施設を読み込む
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="near-entities" v-if="nearEntities.length !== 0">
            <v-list>
              <template v-for="(entity, i) in nearEntities">
                <entity-list-tile @click="openEntityDialog(entity)"
                                  :entity="entity" :fail-img="dummyImg"
                                  :key="`${entity.categoryId}:${entity.id}`"/>
                <v-divider :key="i"></v-divider>
              </template>
            </v-list>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { MglGeolocateControl, MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
import FallbackImage from '../components/FallbackImage.vue';
import EntityListTile from '../components/EntityListTile.vue';

const textFields = ['country-label-lg', 'country-label-md', 'country-label-sm',
  'state-label-lg', 'state-label-md', 'state-label-sm',
  'place-city-lg-n', 'place-city-lg-s', 'place-city-md-n', 'place-city-md-s', 'place-city-sm',
  'place-island', 'place-town', 'place-village', 'place-hamlet', 'place-suburb',
  'place-neighbourhood', 'place-islet-archipelago-aboriginal',
  'airport-label', 'poi-scalerank1', 'poi-scalerank2', 'poi-scalerank3',
  'rail-label-major', 'rail-label-minor',
  'road-label-large', 'road-label-medium', 'road-label-small'];

export default {
  components: {
    MglMap,
    MglGeolocateControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    FallbackImage,
    EntityListTile,
  },
  name: 'Home',
  data() {
    return {
      nowLang: 0,
      languages: [
        {
          code: 'ja',
          name: 'Japanese',
          keys: {
            search: '検索...',
          },
        }, {
          code: 'en',
          name: 'English',
          keys: {
            search: 'Search...',
          },
        }
      ],
      dummyImg: '/dummy.png',
      mapbox: {
        token: 'pk.eyJ1Ijoic3l1Y2hhbjEwMDUiLCJhIjoiY2pqMmdlNGkwMHd0aTNxcHF2ZTkwYXh0ZyJ9.Vz7brvQpAt3RbaJ0lqUEyQ',
        style: {
          day: 'mapbox://styles/syuchan1005/cjj2xeu8z2u7k2snbviv748qd',
          night: 'mapbox://styles/syuchan1005/cjj3glju63c7j2sqj7lnpehm5',
        },
      },
      mapCenter: {
        lat: undefined,
        lng: undefined,
      },
      entities: [],
      colors: ['blue'],
      light: true,
      showMap: false,
      showLoading: true,
      searchText: '',
      showSearchResult: false,
      searchResult: [],
      showEntity: false,
      showDialogEntityItem: {},
      showDrawerEntityItem: {},
      showEntityDrawer: false,
      nearEntities: [],
      showNoResult: false,
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geo) => {
        this.setInitGeo(geo.coords.latitude, geo.coords.longitude);
      }, () => {
        this.setInitGeo();
      });
    } else {
      this.setInitGeo();
    }
  },
  computed: {
    mapStyle() {
      return this.light ? this.mapbox.style.day : this.mapbox.style.night;
    },
    language() {
      return this.languages[this.nowLang];
    },
  },
  watch: {
    mapStyle() {
      this.$refs.mapView.map.setStyle(this.mapStyle);
    },
    mapCenter: {
      handler() {
        this.fetchEntities();
      },
      deep: true,
    },
    nowLang(val) {
      textFields.forEach((v) => {
        this.$refs.mapView.map.setLayoutProperty(v, 'text-field', ['get', `name_${this.languages[val].code}`]);
      });
    },
    showEntityDrawer(val) {
      if (!val) this.nearEntities = [];
    },
  },
  methods: {
    setInitGeo(lat, lng) {
      this.mapCenter = {
        lat: lat || 35.689138,
        lng: lng || 139.700848,
      };
      this.showMap = true;
    },
    toggleLight() {
      this.light = !this.light;
    },
    fetchEntities() {
      this.$http({
        params: {
          query: `{nearEntitiesInPoint(point:{lat:${this.mapCenter.lat} lng:${this.mapCenter.lng}} distance:4 limit:100){categoryId id name desc picture geo{lat lng}}}`,
        },
      }).then((response) => {
        this.entities = response.data.data.nearEntitiesInPoint;
      });
    },
    loadMap() {
      this.fetchEntities();
      this.showLoading = false;
    },
    clickSearchButton() {
      if (this.searchText) {
        this.$http({
          params: {
            query: `{searchEntities(name:"${this.searchText}"){categoryId id name desc picture geo{lat lng}}}`,
          },
        }).then((res) => {
          this.searchResult = res.data.data.searchEntities;
          if (this.searchResult.length !== 0) {
            this.showSearchResult = true;
          } else {
            this.showNoResult = true;
          }
        });
      }
    },
    openEntityDialog(entity) {
      this.showDialogEntityItem = entity;
      this.showEntity = true;
    },
    openEntityDrawer(entity) {
      this.showDrawerEntityItem = entity;
      this.showEntityDrawer = true;
    },
    goLocation(point) {
      this.mapCenter = point;
      this.showEntity = false;
      this.showSearchResult = false;
    },
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

<style>
  .v-list__tile {
    height: auto !important;
  }

  .v-list__tile__avatar {
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .near-entities .v-list__tile {
    padding: 0 3px !important;
  }
</style>

<style lang="stylus">
  @import "~vuetify/src/stylus/settings/_variables";

  @media $display-breakpoints.xs-only {
    .mapboxgl-ctrl-top-right {
      margin-top: 65px;
      margin-right: 10px;
    }
  }
</style>

<style lang="scss" scoped>
  #home {
    width: 100%;
    height: 100%;
  }

  button.fab-btn {
    bottom: 16px;
  }

  .map-view {
    width: 100%;
    height: 100%;
  }

  .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    width: 100%;
    height: 100%;
  }

  .searchBox {
    z-index: 1;
    max-width: 300vw;
    min-width: 450px;
    position: fixed;
    top: 20px;
    left: 20px;

    &.xs {
      max-width: calc(100% - 40px);
      min-width: calc(100% - 40px);
      width: calc(100% - 40px);
    }
  }
</style>

