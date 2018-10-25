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
      if (location) this.control.setOrigin([location.lng, location.lat]);
      else this.control.removeRoutes();
    },
    setDestination(location) {
      if (location) this.control.setDestination([location.lng, location.lat]);
      else this.control.removeRoutes();
    },
    setProfile(query) {
      this.control.actions.setProfile(query);
    },
  },
  render: () => {},
};
