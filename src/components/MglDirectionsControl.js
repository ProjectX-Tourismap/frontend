import baseMixin from 'vue-mapbox/src/lib/mixin';
import controlMixin from 'vue-mapbox/src/lib/controlMixin';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default {
  name: 'DirectionControl',
  mixins: [baseMixin, controlMixin],
  props: {
    position: {
      type: String,
      default: 'top-left',
    },
    styles: {
      type: Array,
      default: () => [
        {
          id: 'directions-origin-point',
          type: 'circle',
          source: 'directions',
          paint: {
            'circle-radius': 8,
            'circle-color': '#FFFFFF',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000',
          },
          filter: [
            'all',
            ['in', '$type', 'Point'],
            ['in', 'marker-symbol', 'A'],
          ],
        },
        {
          id: 'directions-origin-label',
          type: 'symbol',
          source: 'directions',
          visibility: 'none',
          filter: [
            'all',
            ['in', '$type', 'Point'],
            ['in', 'marker-symbol', 'A'],
          ],
        },
        {
          id: 'directions-destination-point',
          type: 'circle',
          source: 'directions',
          paint: {
            'circle-radius': 8,
            'circle-color': '#FFFFFF',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000',
          },
          filter: [
            'all',
            ['in', '$type', 'Point'],
            ['in', 'marker-symbol', 'B'],
          ],
        },
        {
          id: 'directions-destination-label',
          type: 'symbol',
          source: 'directions',
          visibility: 'none',
          filter: [
            'all',
            ['in', '$type', 'Point'],
            ['in', 'marker-symbol', 'B'],
          ],
        },
      ],
    },
    accessToken: {
      type: String,
      default: null,
    },
    api: {
      type: String,
      default: null,
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    profile: {
      type: String,
      default: 'mapbox/driving-traffic',
    },
    alternatives: {
      type: Boolean,
      default: false,
    },
    congestion: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: 'metric',
    },
    compile: {
      type: Function,
      default: null,
    },
    controls: {
      type: Object,
      default: undefined,
    },
    origin: {
      type: Object,
    },
    destination: {
      type: Object,
    },
  },
  data() {
    return {
      control: undefined,
    };
  },
  watch: {
    origin(val) {
      this.setOrigin(val);
    },
    destination(val) {
      this.setDestination(val);
    },
    profile(val) {
      this.setProfile(val);
    },
  },
  created() {
    /* eslint-disable no-underscore-dangle */
    this.control = new MapboxDirections(this._props);
  },
  methods: {
    $_deferredMount(payload) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.map = payload.map;
      this.map.addControl(this.control, this.position);
      this.$emit('added', this.control);
      this.origin && this.setOrigin(this.origin);
      this.destination && this.setDestination(this.destination);

      payload.component.$off('load', this.$_deferredMount);
    },
    setOrigin(location) {
      this.control.removeRoutes();
      if (location) {
        this.control.setOrigin([location.lng, location.lat]);
      }
      if (this.destination) {
        this.control.setDestination([this.destination.lng, this.destination.lat]);
      }
    },
    setDestination(location) {
      this.control.removeRoutes();
      if (this.origin) {
        this.control.setOrigin([this.origin.lng, this.origin.lat]);
      }
      if (location) {
        this.control.setDestination([location.lng, location.lat]);
      }
    },
    setProfile(query) {
      this.control.actions.setProfile(query);
    },
  },
  render: () => {},
};
