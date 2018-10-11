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
                    @click:append="clickSearchButton"
      ></v-text-field>

      <mgl-map
              :accessToken="mapbox.token"
              :mapStyle.sync="mapStyle"
              :center="[initGeo.lng,initGeo.lat]" :zoom="14"
              @load="loadMap"
              class="map-view" ref="mapView">

        <mgl-navigation-control position="top-right"/>

        <mgl-marker :coordinates="[initGeo.lng,initGeo.lat]" color="blue"/>

        <mgl-marker v-for="entity in entities" :key="entity.id"
                    anchor="top"
                    :coordinates="[entity.geo.lng,entity.geo.lat]"
                    :color="colors[entity.category_id]">
          <mgl-popup :closeButton="false">
            <v-card :flat="true">
              <div>{{ entity.id }}</div>
              <div>{{ entity.name }}</div>
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
          <v-list three-line subheader>
            <template v-for="i in [0,1,2,3]">
              <v-list-tile avatar @click="showEntity = true" :key="i + 'test'">
                <v-list-tile-avatar><img src="@/assets/logo.png"></v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>地点名</v-list-tile-title>
                  <v-list-tile-sub-title>ちょっとした説明</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="i"/>
            </template>
          </v-list>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showEntity" scrollable max-width="500">
        <v-card>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px">
              <v-layout column fill-height>
                <v-card-title>
                  <v-btn dark icon @click="showEntity = false">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                </v-card-title>

                <v-spacer></v-spacer>

                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">地点名</div>
                </v-card-title>
              </v-layout>
            </v-img>

            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  Test
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-btn depressed color="primary">Go to location</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { MglGeolocateControl, MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';

export default {
  components: {
    MglMap,
    MglGeolocateControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
  },
  name: 'Home',
  data() {
    return {
      mapbox: {
        token: 'pk.eyJ1Ijoic3l1Y2hhbjEwMDUiLCJhIjoiY2pqMmdlNGkwMHd0aTNxcHF2ZTkwYXh0ZyJ9.Vz7brvQpAt3RbaJ0lqUEyQ',
        style: {
          day: 'mapbox://styles/syuchan1005/cjj2xeu8z2u7k2snbviv748qd',
          night: 'mapbox://styles/syuchan1005/cjj3glju63c7j2sqj7lnpehm5',
        },
      },
      initGeo: {
        lat: undefined,
        lng: undefined,
      },
      entities: [{
        id: 1,
        name: 'test',
        category_id: 1,
        geo: {
          lat: 35.988138,
          lng: 139.707848,
        },
        pref_id: 1,
        city_id: 1,
      }],
      colors: ['blue', 'orange', 'green', 'yellow', 'red'],
      light: true,
      showMap: false,
      showLoading: true,
      searchText: '',
      showSearchResult: false,
      showEntity: false,
      showEntityItem: undefined,
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
  },
  methods: {
    dummy() {},
    setInitGeo(lat, lng) {
      this.initGeo = {
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
          query: `{nearEntitiesInPoint(point:{lat:"${this.initGeo.lat}" lng:"${this.initGeo.lng}"} distance:4 limit:100){id name geo{lat lng} category_id}}`,
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
      this.showSearchResult = true;
      /*
      this.$http({
        params: {
          query: `{searchEntities(name:"${this.searchText}"){id name}}`,
        },
      }).then((res) => {

      });
      console.log(this.searchText);
      */
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
</style>

