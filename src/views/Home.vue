<template>
  <div id="home">
    <div v-if="!(showMap && showControl)" class="overlay">
      <ball-beat-loader color="white" size="20px"></ball-beat-loader>
    </div>

    <div v-if="showMap" class="main">
      <map-view
          ref="mapView"
          @openEntityDrawer="openEntityDrawer"
          @clickMap="clickMap"
          @changeLanguage="changeLanguage"
          :show-map.sync="showMap"
          :show-control.sync="showControl"
          :access-token="mapbox.token"
          :colors="colors"
          :map-style="mapStyle"
          :direction-start="directionStartLocation"
          :direction-dest="directionDestLocation"
          :direction-profile="direction.profile"
          :now-category="nowCategory" />

      <div class="status-bar"></div>

      <search-box v-show="showControl"
                  @clickSearchButton="clickSearchButton"
                  :language="language"
                  :search-text.sync="searchText"
                  :direction.sync="direction"
                  :is-direction.sync="isDirection" />

      <category-selector
        :show="showControl"
        :colors="colors"
        @change="(i) => { this.nowCategory = i; }"/>

      <language-selector
          :show="showControl"
          :languages="languages"
          :nowLang="nowLang"/>

      <map-selector
          :show-button="showControl"
          :show.sync="showMapStylePane"
          :type.sync="nowMapType"
          :styles="mapbox.style" />
    </div>

    <search-result-dialog
        @openEntityDialog="openEntityDialog"
        :show.sync="showSearchResult"
        :search-result="searchResult" />

    <v-dialog v-model="showNoResult">
      <v-card>
        <v-card-title>検索結果がありませんでした</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outline @click="showNoResult = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <entity-dialog
        @goLocation="goLocation"
        :show.sync="showEntity"
        :dialog-entity="showDialogEntityItem" />

    <entity-drawer
        @openEntityDialog="openEntityDialog"
        :show.sync="showEntityDrawer"
        :drawer-entity="showDrawerEntityItem" />
  </div>
</template>

<script>
import Vue from 'vue';

import EntityListTile from '../components/EntityListTile.vue';
import EntityDrawer from '../components/EntityDrawer.vue';
import EntityDialog from '../components/EntityDialog.vue';
import MapSelector from '../components/MapSelector.vue';
import LanguageSelector from '../components/LanguageSelector.vue';
import DirectionSearchBox from '../components/DirectionSearchBox.vue';
import SearchBox from '../components/SearchBox.vue';
import MapView from '../components/MapView.vue';
import SearchResultDialog from '../components/SearchResultDialog.vue';
import CategorySelector from '../components/CategorySelector.vue';

export default {
  components: {
    SearchResultDialog,
    MapView,
    SearchBox,
    DirectionSearchBox,
    LanguageSelector,
    MapSelector,
    EntityDialog,
    EntityDrawer,
    EntityListTile,
    CategorySelector,
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
            start: '地図をクリック', // 出発地を入力するか
            dest: '目的地を入力...',
          },
        }, {
          code: 'en',
          name: 'English',
          keys: {
            search: 'Search...',
            start: 'click on the map...', // Choose starting point, or
            dest: 'Choose destination',
          },
        },
      ],
      dummyImg: '/dummy.svg',
      mapbox: {
        token: 'pk.eyJ1Ijoic3l1Y2hhbjEwMDUiLCJhIjoiY2pqMmdlNGkwMHd0aTNxcHF2ZTkwYXh0ZyJ9.Vz7brvQpAt3RbaJ0lqUEyQ',
        style: {
          day: 'mapbox://styles/syuchan1005/cjj2xeu8z2u7k2snbviv748qd',
          night: 'mapbox://styles/syuchan1005/cjj3glju63c7j2sqj7lnpehm5',
          aerial: 'mapbox://styles/syuchan1005/cjnedhbo933d82rsf6hd6nwdx',
        },
      },
      mapBounds: undefined,
      mapZoom: 14,
      mapCenter: {
        lat: 35.689138,
        lng: 139.700848,
      },
      fetchLocations: [],
      entities: [],
      colors: [
        {
          color: 'lightgray',
          name: 'マンホール',
        },
        {
          color: 'red',
          name: 'グルメ',
        },
        {
          color: 'lightgreen',
          name: 'ショッピング',
        },
        {
          color: 'lightblue',
          name: 'レジャー,エンタメ',
        },
        {
          color: 'orange',
          name: '暮らし,レジャー',
        },
      ],
      nowMapType: 'day',
      showMap: false,
      showControl: false,
      searchText: '',
      showSearchResult: false,
      searchResult: [],
      showEntity: false,
      showDialogEntityItem: {},
      showDrawerEntityItem: {},
      showEntityDrawer: false,
      nearEntities: [],
      showNoResult: false,
      changeLanguageCB: undefined,
      showMapStylePane: false,
      isDirection: false,
      direction: {
        start: undefined,
        dest: undefined,
        profile: 'mapbox/driving',
      },
      nowCategory: -1,
    };
  },
  computed: {
    mapStyle() {
      return this.mapbox.style[this.nowMapType];
    },
    language() {
      return this.languages[this.nowLang];
    },
    directionStartLocation() {
      if (this.isDirection && this.direction.start) {
        return this.direction.start.geo || this.direction.start;
      }
      return undefined;
    },
    directionDestLocation() {
      if (this.isDirection && this.direction.dest) {
        return this.direction.dest.geo || this.direction.dest;
      }
      return undefined;
    },
  },
  watch: {
    nowLang(val) {
      this.changeLanguage(val);
    },
    showEntityDrawer(val) {
      if (!val) this.nearEntities = [];
    },
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
  methods: {
    hubenyDistance(lat2, lng2) {
      /* eslint-disable no-mixed-operators */
      const radLat1 = this.mapCenter.lat * Math.PI / 180;
      const radLat2 = lat2 * Math.PI / 180;
      const latAvg = (radLat1 + radLat2) / 2.0;
      const sinLat = Math.sin(latAvg);
      const W2 = 1.0 - 0.00669438002301188 * (sinLat * sinLat);
      const t1 = 6335439.32708317 / (Math.sqrt(W2) * W2) * (radLat1 - radLat2);
      const t2 = 6378137.0 / Math.sqrt(W2) * Math.cos(latAvg)
        * ((this.mapCenter.lng * Math.PI / 180) - (lng2 * Math.PI / 180));
      return Math.sqrt((t1 * t1) + (t2 * t2));
    },
    setInitGeo(lat, lng) {
      this.mapCenter = {
        lat: lat || this.mapCenter.lat,
        lng: lng || this.mapCenter.lng,
      };
      this.showMap = true;
    },
    fetchEntities() {
      if (this.mapZoom < 14 || this.fetchLocations
        .some(({ lat, lng }) => Math.abs(this.hubenyDistance(lat, lng)) <= 1000)) return;
      this.fetchLocations.push({ ...this.mapCenter });
      const query = `{nearEntitiesInPoint(point:{lat:${this.mapCenter.lat}lng:${this.mapCenter.lng}}distance:4 limit:100){genreCode categoryId id name desc picture geo{lat lng}}}`;
      this.$http({
        params: { query },
      }).then((res) => {
        const nearEntities = res.data.data.nearEntitiesInPoint
          .filter(v => !this.entities.some(c => c.categoryId === v.categoryId && c.id === v.id));
        this.entities.push(...nearEntities);
      });
    },
    changeLanguage() {
      Vue.nextTick(() => {
        const text = this.language.code ? `{name_${this.language.code}}` : '{name}';
        this.$refs.mapView.map.getStyle().layers
          .filter(v => v.layout &&
            Object.prototype.hasOwnProperty.call(v.layout, 'text-field') && v.layout['text-field'] !== '{ref}')
          .forEach((v) => {
            if (typeof v.layout['text-field'] === 'string') {
              this.$refs.mapView.map.setLayoutProperty(v.id, 'text-field', text);
            } else if (v.layout['text-field'].stops) {
              const stops = [...v.layout['text-field'].stops].map((s) => {
                // eslint-disable-next-line no-param-reassign
                if (s[1].match(/{name(_\w{2})?}/)) s[1] = text;
                return s;
              });
              this.$refs.mapView.map.setLayoutProperty(v.id, 'text-field', { ...v.layout['text-field'], stops });
            }
          });
      });
    },
    clickSearchButton() {
      if (this.searchText) {
        this.$http({
          params: {
            query: `{searchEntities(name:"${this.searchText}"){genreCode categoryId id name desc picture geo{lat lng}}}`,
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
      this.nearEntities = [];
      this.showDrawerEntityItem = entity;
      this.showEntityDrawer = true;
    },
    goLocation(point) {
      this.showEntity = false;
      this.showSearchResult = false;
      this.$refs.mapView.map.flyTo({
        center: point,
        zoom: 14,
        speed: 1.5,
      });
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
    getEntity(categoryId, id) {
      return (categoryId && id) ?
        this.entities.find(e => e.categoryId === categoryId && e.id === id) : undefined;
    },
    clickMap(event) {
      if (this.isDirection) {
        let element = document.elementFromPoint(event.point.x, event.point.y);
        element = this.getEntity(element.dataset.categoryid, element.dataset.id);
        if (!this.direction.start) {
          this.direction.start = element || event.lngLat;
        } else if (!this.direction.dest) {
          this.direction.dest = element || event.lngLat;
        } else {
          return;
        }
        event.preventDefault();
      }
    },
    inMapBounds(entity) {
      if (!this.mapBounds) return false;
      /* eslint-disable no-underscore-dangle, max-len */
      return (this.mapBounds._ne.lat >= entity.geo.lat && entity.geo.lat >= this.mapBounds._sw.lat) &&
        (this.mapBounds._ne.lng >= entity.geo.lng && entity.geo.lng >= this.mapBounds._sw.lng);
    },
  },
};
</script>

<!--suppress CssUnusedSymbol -->
<style>
  .mapboxgl-ctrl-attrib, .mapboxgl-ctrl-logo {
    pointer-events: none;
  }

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

<!--suppress ALL -->
<style lang="stylus">
  @import "~vuetify/src/stylus/settings/_variables";

  .mapboxgl-ctrl-top-right {
    top: 10px;
  }

  @media $display-breakpoints.xs-only {
    .mapboxgl-ctrl-top-right {
      position fixed;
      top: calc(65px + constant(safe-area-inset-top));
      top: calc(65px + env(safe-area-inset-top));
      right: 10px;
    }
  }
</style>

<!--suppress ALL -->
<style lang="scss" scoped>
  #home {
    width: 100%;
    height: 100%;
  }

  button.fab-btn {
    bottom: 16px;
  }

  .overlay {
    z-index: 1000;
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

  .status-bar {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    width: 100%;
    height: constant(safe-area-inset-top);
    height: env(safe-area-inset-top);
  }
</style>

