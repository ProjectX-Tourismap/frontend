<template>
  <mgl-map
      :accessToken="accessToken"
      :mapStyle="mapStyle" @click="(e) => $emit('clickMap', e)"
      :center.sync="mapCenter" :zoom.sync="mapZoom"
      @load="loadMap" @moveend="() => {
                this.fetchEntities();
                this.mapBounds = $refs.mapView.map.getBounds();
              }"
      class="map-view" ref="mapView">

    <mgl-navigation-control @added="$emit('update:showControl', true)" position="top-right"/>
    <mgl-directions-control :accessToken="accessToken" :interactive="false"
                            :origin="directionStart" :destination="directionDest"
                            :profile="directionProfile"
                            :controls="{
                                  inputs: false,
                                  instructions: false,
                                  profileSwitcher: false,
                                }" position="bottom-left"/>
    <mgl-geolocate-control/>

    <mgl-marker v-for="entity in filterEntities" :key="`${entity.categoryId}:${entity.id}`"
                anchor="top" :coordinates="[entity.geo.lng,entity.geo.lat]">
      <template slot="marker">
        <div style="{max-width:30px;width:30px;height:30px;background:#000;border-radius:50%;}"
             :style="{
                 background:colors[parseInt(entity.genreCode.substr(0, 2), 10)].color || '#3FB1CE'
               }" :data-categoryid="entity.categoryId" :data-id="entity.id">
        </div>
      </template>
      <template>
        <mgl-popup :closeButton="false">
          <v-card flat>
            <div>{{ entity.name }}</div>
            <v-btn block flat small color="primary" @click="$emit('openEntityDrawer', entity)">
              ...more
            </v-btn>
          </v-card>
        </mgl-popup>
      </template>
    </mgl-marker>
  </mgl-map>
</template>

<script>
import {
  MglGeolocateControl, MglMap, MglMarker, MglNavigationControl, MglPopup,
} from 'vue-mapbox';
import MglDirectionsControl from './MglDirectionsControl';

export default {
  components: {
    MglMap,
    MglGeolocateControl,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    MglDirectionsControl,
  },
  name: 'MapView',
  props: {
    colors: {
      type: Array,
      default: () => [],
    },
    accessToken: {
      type: String,
      default: '',
    },
    mapStyle: {
      type: String,
      default: '',
    },
    showControl: {
      type: Boolean,
      default: false,
    },
    showMap: {
      type: Boolean,
      default: false,
    },
    directionStart: {
      type: Object,
      default: undefined,
    },
    directionDest: {
      type: Object,
      default: undefined,
    },
    directionProfile: {
      type: String,
      default: 'mapbox/driving',
    },
    nowCategory: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      mapBounds: undefined,
      mapZoom: 16,
      entities: [],
      mapCenter: {
        lat: 35.689138,
        lng: 139.700848,
      },
      fetchLocations: [],
    };
  },
  computed: {
    map: {
      get() {
        return this.$refs.mapView.map;
      },
    },
    filterEntities() {
      if (this.mapZoom < 11) return [];
      const es = this.entities.filter(this.inMapBounds);
      if (this.nowCategory === -1) return es;
      const genre = `00${this.nowCategory}`.slice(-2);
      return es.filter(e => e.genreCode.startsWith(genre));
    },
  },
  watch: {
    mapStyle() {
      this.$refs.mapView.map.setStyle(this.mapStyle);
    },
  },
  methods: {
    loadMap() {
      this.fetchEntities();
      const { map } = this.$refs.mapView;
      map.on('styledata', () => this.$emit('changeLanguage'));
      this.mapBounds = map.getBounds();
    },
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
    inMapBounds(entity) {
      if (!this.mapBounds) return false;
      /* eslint-disable no-underscore-dangle, max-len */
      return (this.mapBounds._ne.lat >= entity.geo.lat && entity.geo.lat >= this.mapBounds._sw.lat)
        && (this.mapBounds._ne.lng >= entity.geo.lng && entity.geo.lng >= this.mapBounds._sw.lng);
    },
  },
};
</script>

<style lang="scss">
  .map-view {
    width: 100%;
    height: 100%;

    .mapboxgl-map {
      width: 100%;
      height: 100%;
    }
  }
</style>
