<template>
  <div id="home">
    <div v-if="showLoading" class="overlay">
      <square-spin-loader color="white" size="80px"></square-spin-loader>
    </div>

    <div v-if="showMap" class="main">
      <v-text-field class="searchBox" :class="{xs: $vuetify.breakpoint.xsOnly}"
                    v-model="searchText"
                    solo
                    type="text"
                    label="Search..."
                    clearable
                    append-icon="search"
                    :rules="[(v) => !!v || '']"
                    @click:append="clickSearchButton"
      ></v-text-field>

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
              <v-list-tile @click="openEntityDialog(entity)" avater
                           :key="`${entity.categoryId}:${entity.id}`">
                <v-list-tile-avatar tile>
                  <img :src="entity.picture" alt="thumb" @error="replaceDummyImg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{entity.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{entity.desc}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="i"></v-divider>
            </template>
          </v-list>
          <div class="result-empty" v-else>
            <v-icon size="20vw" color="rgb(180,180,180)">speaker_notes_off</v-icon>
            <div :style="{fontSize: '5rem'}">No results</div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEntity" scrollable max-width="500">
        <v-card>
          <v-card>
            <fallback-image :src="showEntityItem.picture" :fall-src="dummyImg">
              <v-layout column fill-height>
                <v-card-title>
                  <v-btn dark icon @click="showEntity = false">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">{{showEntityItem.name}}</div>
                </v-card-title>
              </v-layout>
            </fallback-image>

            <v-list two-line v-if="showEntityItem.desc">
              <v-list-tile>
                <v-list-tile-content>
                  {{showEntityItem.desc}}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-btn depressed color="primary"
                 @click="goLocation(showEntityItem.geo)">
            Go to location
          </v-btn>
        </v-card>
      </v-dialog>

      <v-navigation-drawer v-model="showEntityDrawer" absolute temporary right>
        <fallback-image :src="showEntityItem.picture" :fall-src="dummyImg" class="pt-0">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon @click="showEntityDrawer = false">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-card-title>
          </v-layout>
        </fallback-image>

        <v-divider></v-divider>

        <v-list dense class="pt-0" v-if="showEntityItem.desc">
          <v-list-tile>
            <v-list-tile-content class="pt-2" :style="{fontSize: '1.4rem'}">
              {{showEntityItem.name}}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>{{showEntityItem.desc}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { MglGeolocateControl, MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
import FallbackImage from '../components/FallbackImage.vue';

export default {
  components: {
    MglMap,
    MglGeolocateControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    FallbackImage,
  },
  name: 'Home',
  data() {
    return {
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
      colors: ['blue', 'orange', 'green', 'yellow', 'red'],
      light: true,
      showMap: false,
      showLoading: true,
      searchText: '',
      showSearchResult: false,
      searchResult: [],
      showEntity: false,
      showEntityItem: {},
      showEntityDrawer: false,
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
          query: `{nearEntitiesInPoint(point:{lat:"${this.mapCenter.lat}" lng:"${this.mapCenter.lng}"} distance:4 limit:100){categoryId id name desc picture geo{lat lng}}}`,
        },
      }).then((response) => {
        this.entities = response.data.data.nearEntitiesInPoint;
      });
    },
    loadMap() {
      this.showLoading = false;
      this.fetchEntities();
    },
    clickSearchButton() {
      if (this.searchText) {
        this.$http({
          params: {
            query: `{searchEntities(name:"${this.searchText}"){categoryId id name desc picture geo{lat lng}}}`,
          },
        }).then((res) => {
          this.searchResult = res.data.data.searchEntities;
          this.showSearchResult = true;
        });
      }
    },
    replaceDummyImg(event) {
      // eslint-disable-next-line
      event.target.src = this.dummyImg;
    },
    openEntityDialog(entity) {
      this.showEntityItem = entity;
      this.showEntity = true;
    },
    openEntityDrawer(entity) {
      this.showEntityItem = entity;
      this.showEntityDrawer = true;
    },
    goLocation(point) {
      this.mapCenter = point;
      this.showEntity = false;
      this.showSearchResult = false;
    },
  },
};
</script>

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

  .result-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(200, 200, 200);
  }
</style>

