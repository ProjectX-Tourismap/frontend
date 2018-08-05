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
        method: 'get',
        baseURL: 'http://backend.syuchan.work/',
        url: '/api',
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
      console.log(this.searchText);
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

