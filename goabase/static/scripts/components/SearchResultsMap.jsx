/* global babelHelpers, n */
/* eslint-disable class-methods-use-this, react/require-default-props */
import _ from 'lodash';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';
import React from 'react';
import store from 'amplify-store';

import BootstrapData from './BootstrapData';
import debounce from '../debounce';
import FavoredPartiesStore from '../stores/FavoredPartiesStore';
import FiltersPanelStore from '../stores/FiltersPanelStore';
import HostOwnPartyStore from '../stores/HostOwnPartyStore';
import PartyInteractionStore from '../stores/PartyInteractionStore';
import { HIGH_Z_INDEX } from './MapObject';
import { Map, Marker, Popup } from './map';
import { mq } from '../utils';

const o = babelHelpers.interopRequireDefault(n(14));
const v = babelHelpers.interopRequireDefault(n(15));
const y = babelHelpers.interopRequireDefault(n(2));
const k = babelHelpers.interopRequireDefault(n(30));
const w = babelHelpers.interopRequireDefault(n(7991));
const S = n(2275);
const D = babelHelpers.interopRequireDefault(n(2296));
const q = babelHelpers.interopRequireDefault(n(3603));
const N = babelHelpers.interopRequireDefault(n(7995));

var A = n(6008)
  , j = babelHelpers.interopRequireDefault(A)
  , F = n(8001)
  , B = babelHelpers.interopRequireDefault(F)
  , W = n(8007)
  , V = babelHelpers.interopRequireDefault(W)
  , G = n(8008)
  , Y = babelHelpers.interopRequireDefault(G)
  , te = n(8013)
  , ne = babelHelpers.interopRequireDefault(te)
  , re = n(1886)
  , ae = babelHelpers.interopRequireDefault(re)
  , de = n(8019)
  , pe = babelHelpers.interopRequireDefault(de)
  , fe = n(8021)
  , he = babelHelpers.interopRequireDefault(fe)
  , me = n(1836)
  , be = n(8023)
  , ve = n(8024)
  , ge = babelHelpers.interopRequireDefault(ve)
  , ye = n(8025)
  , _e = babelHelpers.interopRequireDefault(ye)
  , Pe = n(8026)
  , Ee = babelHelpers.interopRequireDefault(Pe)
  , Te = n(8027)
  , ke = babelHelpers.interopRequireDefault(Te)
  , Re = n(8028)
  , we = n(1839)
  , Ce = n(8029)
  , Se = n(1837)
  , Oe = n(8039)
  , De = babelHelpers.interopRequireDefault(Oe)
  , He = n(1787)
  , xe = n(7962)
  , qe = babelHelpers.interopRequireDefault(xe);

const propTypes = Object.assign(Object.assign({
  searchResponse: w.default.isRequired,
  p2AutoRefreshKey: React.PropTypes.string,
  p2ViewedMarkersKey: React.PropTypes.string,
  provider: React.PropTypes.string,
  isSmMapVisible: React.PropTypes.bool,
  showWebcotListingCards: React.PropTypes.bool,
}, Oe.withOptionalFiltersPropTypes), {
  hoveredListingId: React.PropTypes.number,
  clickedListingId: React.PropTypes.number,
  clickedDatelessListingId: React.PropTypes.number,
  datelessClickCount: React.PropTypes.number,
}, {
  wishlistedListingsIds: React.PropTypes.objectOf(React.PropTypes.bool),
});

const defaultProps = Object.assign(Object.assign({
  p2AutoRefreshKey: 'p2AutoRefreshSetting',
  p2ViewedMarkersKey: 'p2ViewedMarkers',
  provider: 'google',
  isSmMapVisible: false,
  showWebcotListingCards: false,
}, Oe.withFiltersDefaultProps), {
  wishlistedListingsIds: {},
});

export const storeConfig = {
  getStores: () => {
    return [PartyInteractionStore, FavoredPartiesStore, HostOwnPartyStore, FiltersPanelStore, ne.default];
  },
  getPropsFromStores: () => {
    const e = PartyInteractionStore.getState();
    const hoveredListingId = e.hoveredListingId;
    const clickedListingId = e.clickedListingId;
    const r = FavoredPartiesStore.getState();
    const wishlistedListingsIds = r.wishlistedListingsIds;
    const i = ne.default.getState();
    const businessOfficeLocations = i.businessOfficeLocations;
    const clickedOfficeLocationId = i.clickedOfficeLocationId;
    const u = FiltersPanelStore.getState();
    const isSmMapVisible = u.isSmMapVisible;

    return {
      hoveredListingId,
      wishlistedListingsIds,
      extraListingMarkers: [],
      clickedListingId,
      extraListingMarkerType: {},
      isSmMapVisible,
      businessOfficeLocations,
      clickedOfficeLocationId,
    };
  },
};

export const GOOGLE_POPUP_OFFSET = {
  x: -10,
  y: -10,
};

class PureSearchResultsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: true,
      readyToRefresh: false,
      inSmallP2Experiment: false,
      bounds: null,
      zoom: null,
      loaded: false,
      popupOffset: { x: 0, y: 0 },
    };
    this.isProgrammaticBoundsChange = false;
    this.zoom = null;
    this.sw = null;
    this.onClickRefresh = this.onClickRefresh.bind(this);
    this.onMapChanged = this.onMapChanged.bind(this);
    this.onMapChangedDebounced = debounce(this.onMapChanged, 100);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onToggleAutoRefresh = this.onToggleAutoRefresh.bind(this);
    this.onCardPhotoClick = this.onCardPhotoClick.bind(this);
    this.onCardInfoClick = this.onCardInfoClick.bind(this);
    this.onWishlistButtonPress = this.onWishlistButtonPress.bind(this);
    this.onOfficeLocationPinClick = this.onOfficeLocationPinClick.bind(this);
    this.setMapViewFromProps = this.setMapViewFromProps.bind(this);
    this.setMapViewFromMarkers = this.setMapViewFromMarkers.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.windowDidResize = this.windowDidResize.bind(this);
    this.windowDidResizeDebounced = debounce(this.windowDidResize, 150);
  }

  componentDidMount() {
    const n = store(this.props.p2AutoRefreshKey);
    const a = this.props.searchResponse.filters;
    const isSmMapVisible = this.props.isSmMapVisible;
    const autoRefresh = n === undefined || n;

    this.setState({ autoRefresh });

    if ((0, me.hasBoundingBox)(a) && (0, me.hasZoom)(a)) {
      (0, S.onMapsLoad)(() => {
        this.setMapViewFromProps(this.props),
        this.setState({
          loading: false,
        });
      });
    } else {
      (0, S.onMapsLoad)(() => {
        this.setMapViewFromMarkers(this.props),
        this.setState({
          loading: false,
        });
      });
    }

    if (isSmMapVisible) {
        var s = k.default.getBootstrap("small_p2_map_auto_refresh") && v.default.deliverExperiment("small_p2_map_auto_refresh", {
            control: function() {
                function e() {
                    return false
                }
                return e
            }(),
            treatment: function() {
                function e() {
                    return true
                }
                return e
            }(),
            treatment_unknown: function() {
                function e() {
                    return false
                }
                return e
            }()
        });
        this.setState({
            loading: true,
            autoRefresh: s && autoRefresh,
            inSmallP2Experiment: s
        })
    }
    const popupOffset = { x: GOOGLE_POPUP_OFFSET.x, y: GOOGLE_POPUP_OFFSET.y };
    this.setState({ popupOffset });
    (0, Re.loadBusinessLocations)();
    window.addEventListener('resize', this.handleWindowResize);
    if (BootstrapData.get('p2_map_transit')) {
      this.setState({
        showTransitLayer: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    var t = this.props
      , n = t.searchResponse
      , r = n.filters
      , a = n.results
      , i = t.hoveredListingId
      , o = nextProps.searchResponse
      , l = o.filters
      , s = o.results
      , u = o.metadata
      , c = nextProps.hoveredListingId;
    if (i === c) {
        var d = (0, me.changedZoom)(r, l)
          , p = (0, me.changedBoundingBox)(r, l)
          , f = (0, me.changedLocation)(r, l)
          , h = (0, be.changedListingIds)(a, s)
          , m = (0, me.hasBoundingBox)(l) && (0, me.hasZoom)(l)
          , b = (0, me.changedSearchFilters)(r, l);
        if ((d || p || f || h) && (this.setState({
            loading: false,
            readyToRefresh: false
        }),
        m || this.setMapViewFromMarkers(nextProps)),
        f && this.setState({
            bounds: null,
            zoom: null
        }),
        b && !f) {
            var v = this.state
              , g = v.bounds
              , y = v.zoom;
            if (g && y) {
                var _ = l.page
                  , P = u.search.mobile_session_id;
            }
        }
    }
  }

  componentWillUnmount() {
    this.isProgrammaticBoundsChange = false;
    window.removeEventListener('resize', this.handleWindowResize);
  }

  onToggleAutoRefresh(ev) {
    const autoRefresh = !!ev.target.checked;
    this.setState({ autoRefresh });
    store(this.props.p2AutoRefreshKey, autoRefresh);
  }

  onClickRefresh() {
    const bounds = this.state.bounds;
    const zoom = this.state.zoom;
    this.refreshMap({ bounds, zoom });
  }

  onCardPhotoClick(ev, t) {
    const n = this.props.searchResponse;
    const r = n.filters;
    const a = n.metadata;
    (0, Y.default)({
      section: 'listing_cards_map',
      messageType: a.urgency_commitment.message_type,
      searchFilters: r,
    });
  }

  onCardInfoClick(ev, t) {
    const n = this.props.searchResponse;
    const r = n.filters;
    const a = n.metadata;
    (0, Y.default)({
      section: 'listing_cards_map',
      messageType: a.urgency_commitment.message_type,
      searchFilters: r,
    });
  }

  onWishlistButtonPress(ev, t) {
    const n = this.props.searchResponse;
    const r = n.filters;
    const a = n.metadata;
    (0, V.default)({
      section: 'map',
      messageType: a.urgency_commitment.message_type,
      searchFilters: r,
      listingId: t.id,
    });
  }

  onMarkerClick(ev) {
    const n = ev.data;
    this.programmaticMapChange(() => {
      const e = n.listing.id;
      const r = this.props;
      const a = r.hoveredListingId;
      const i = r.wishlistedListingsIds;
      // const o = (0, he.default)({
      //   hovered: e === a,
      //   viewed: this.isListingMarkerViewed(e),
      //   wishlisted: i[e] === true,
      // });
      this.setListingMarkerViewed(e);
      ae.default.clickedListingCard(e);
    });
  }

  onOfficeLocationPinClick(ev) {
    (0, Re.clickedOfficeLocationCard)(ev);
  }

  onMapClick() {
    ae.default.closedListingCard();
    (0, Re.closedOfficeLocationCard)();
  }

  onMapChanged(e) {
          var t = e.bounds
            , n = e.zoom
            , r = this.props.searchResponse
            , a = r.filters
            , i = r.metadata;
          if (this.state.loaded || this.setState({
              loaded: true
          }),
          this.isProgrammaticBoundsChange) {
              var o = a.page
                , l = i.search.mobile_session_id;
          }
          if (!this.isProgrammaticBoundsChange && !this.windowResizing) {
              var s = t.toJSON();
              this.setState({
                  bounds: t,
                  zoom: n
              }),
              this.checkMapMovedEnough({
                  jsonBounds: s,
                  zoom: n
              }) && (this.setState({
                  readyToRefresh: true
              }),
              this.state.autoRefresh && this.refreshMap({
                  bounds: t,
                  zoom: n
              }),
              this.zoom = n,
              this.sw = s.sw)
          }
      }

  setMapViewFromProps(e) {
    const n = e.searchResponse.filters;
    const r = new D.default({
      lat: n.sw_lat,
      lng: n.sw_lng,
    }, {
      lat: n.ne_lat,
      lng: n.ne_lng,
    });
    this.programmaticMapChange(() => {
      this.map.setView(this.getCenter(), n.zoom);
    });
  }

  setMapViewFromMarkers(props) {
    const n = props.searchResponse;
    const r = n.results;
    const a = n.metadata;
    const location = n.filters.location;
    const l = props.extraListingMarkers;

    const s = r.map((e) => {
      const lat = e.listing.lat
      const lng = e.listing.lng;
      return { lat, lng };
    });

    if ((0, ge.default)(a)) {
      const lat = a.geography.lat;
      const lng = a.geography.lng;
      s.push({ lat, lng });
    }

    l.forEach((e) => {
      if (e) {
        s.push({ lat: e.listing.lat, lng: e.listing.lng });
      }
    });
    if (s.length !== 0) {
      var f = (0, q.default)(s);
      var h = new D.default(f.sw, f.ne);
      this.programmaticMapChange(() => {
        this.map.fitBounds(h);
      });
    }
  }

  getMapParams(e) {
    const bounds = e.bounds;
    const zoom = e.zoom;
    const r = this.map;
    const a = r && r.refs.container;
    const i = $(a);
    const width = i.width();
    return (0, pe.default)({ bounds, zoom, width });
  }

  setListingMarkerViewed(e) {
    const t = this.props.p2ViewedMarkersKey;
    const n = store(t) || {};
    n[e] = true;
    store(t, n, {
      expires: moment.duration(1, 'days'),
    });
  }

  checkMapMovedEnough(e) {
    const t = e.jsonBounds;
    const n = e.zoom;

    if (this.zoom !== n) {
      return true;
    }
    const r = t.ne;
    const a = t.sw;
    const i = 0.05;
    const o = Math.abs(this.sw.lat - a.lat);
    const l = Math.abs(this.sw.lng - a.lng);
    const s = r.lat - a.lat + l;
    const u = r.lng - a.lng + o;
    return (o * u + l * s - o * l) / (u * s) > i;
  }

  isListingMarkerViewed(e) {
    const t = store(this.props.p2ViewedMarkersKey);
    return !(!t || !t[e]);
  }

  programmaticMapChange(e) {
    this.isProgrammaticBoundsChange = true;
    const r = this.map && this.map.state.map;

    if (r) {
      r.once('idle', () => {
        this.isProgrammaticBoundsChange = false
      });
    }

    e();

    if (!r) {
      this.isProgrammaticBoundsChange = false;
    }
  }

  refreshMap(e) {
    const bounds = e.bounds;
    const zoom = e.zoom;
    const r = this.getMapParams({ bounds, zoom });
    const a = _.pick(r, Object.keys(Se.MapDetailsPropTypes));
    const i = !!BootstrapData.get('webcot');

    if (i) {
      const o = this.props;
      const stagedFilters = o.stagedFilters;
      const responseFilters = o.responseFilters;
      qe.default.pushToHistory({
        stagedFilters: Object.assign({}, stagedFilters, a),
        responseFilters,
        currentTab: He.EXPLORE_TABS.HOMES,
      });
    } else {
      (0, Ce.updateFilters)(a);
    }

    this.setState({
      loading: true,
    });
  }

  handleWindowResize() {
    this.windowResizing = true;
    this.windowDidResizeDebounced();
  }

  windowDidResize() {
    this.windowResizing = false;
  }

  renderMapAddressPin() {
    const response = this.props.searchResponse;
    const metadata = response.metadata

    if ((0, ge.default)(metadata)) {
      return <Marker
        icon={{ url: BootstrapData.get('p2_marker_image_path')['page2/address_pin.png'] }}
        markerType="address"
        position={{ lat: metadata.geography.lat, lng: metadata.geography.lng }}
        title={response.filters.location}
      />;
    }
    return null;
  }

  renderOfficeLocationPins() {
    const n = this.props.businessOfficeLocations;
    if (n.length === 0) {
      return null;
    }
    const i = this.props.searchResponse;
    const l = i.metadata;
    const u = l.geography;
    if (!u) {
      return null;
    }
    const f = n.filter((e) => {
      return Math.abs(e.lat - u.lat) + Math.abs(e.lng - u.lng) < 2;
    });
    if (f.length === 0) {
      return null;
    }

    if (h) {
      return f.map(t => (
        <Marker
          icon={{ url: BootstrapData.get('p2_marker_image_path')['page2/address_pin.png'] }}
          markerType="office_location"
          position={{ lat: t.lat, lng: t.lng }}
          onClick={() => this.onOfficeLocationPinClick(t.id)}
          key={`office-pin-${t.id}`}
        >
          <Popup visible={this.props.clickedOfficeLocationId === t.id} offset={this.state.popupOffset} onMapClick={this.onMapClick}>
            <div className="business-office-location-panel text-center">
              <div>{t.business_entity_name}</div>
              <div>{t.office_name}</div>
              <div className="text-muted">{t.street}</div>
            </div>
          </Popup>
        </Marker>
      ));
    }
    return null;
  }

  render() {
    var e = this
      , t = this.props
      , n = t.searchResponse
      , r = n.filters
      , i = n.results
      , o = n.metadata
      , l = t.clickedListingId
      , s = t.provider
      , u = t.hoveredListingId
      , c = t.wishlistedListingsIds
      , d = t.extraListingMarkers
      , f = t.extraListingMarkerType
      , h = t.isSmMapVisible
      , m = t.showWebcotListingCards
      , b = this.state
      , v = b.autoRefresh
      , g = b.loading
      , _ = b.readyToRefresh
      , P = b.showTransitLayer
      , T = b.inSmallP2Experiment
      , k = o.geography
      , R = o.guidebook;

    const w = {
      ref: (t) => {
        this.map = t;
      },
      containerProps: {
        className: 'map-canvas',
        role: 'presentation',
      },
      defaultZoom: r.zoom,
      onBoundsChange: this.onMapChangedDebounced,
      onDragEnd: this.onMapChangedDebounced,
      onZoomChange: this.onMapChangedDebounced,
      clickableIcons: !h,
      showTransitLayer: P,
    };
    if (k) {
      const lat = k.lat;
      const lng = k.lng;
      w.defaultCenter = { lat, lng };
    }

    const D = i.slice();
    d.forEach((e) => {
      if (!(0, be.containsListingInfo)(i, e)) {
        D.push(e);
      }
    });

    var x = !(0, me.hasDates)(r) && (0, we.inShowFromPriceTreatment)();
    var q = BootstrapData.get('p2_greedy_slideshow_preload_count');

    return (
      <div
        className={classNames('search-results-map', {
          loading: g && mq.matchMedia.is('sm'),
        })}
        style={{ height: '100%' }}
      >
        <Map {...w}>
          {D.map(function(t) {
            const n = t.listing;
            const i = n.id;
            const s = i === l;
            const d = i === u;
            const p = e.isListingMarkerViewed(i);
            const b = c[i] === true;
            const v = f[i] === Ee.default.HOST_OWN_LISTING_MARKER;
            const g = t.pricing_quote;
            const _ = (0, he.default)({
              hovered: d,
              viewed: p,
              wishlisted: b,
            });
            const P = { x: 15, y: 70 };
            const T = React.createElement(B.default, {
              pricingQuote: g,
              hovered: d,
              viewed: p,
              wishlisted: b,
              isHostOwnListing: v,
            });
            const k = {
              key: i,
              position: { lat: n.lat, lng: n.lng },
              markerType: _,
              icon: T,
              onClick: e.onMarkerClick,
              data: t,
              visible: !s,
            };
            if (s || d) {
              k.zIndex = HIGH_Z_INDEX;
            }
            var R = null;
            if (s) {
              const w = (0, me.roomPathWithParams)(n.id, r, o);
              const S = (0, ke.default)(n, BootstrapData.get('is_mobile'));
              R = React.createElement(Popup, {
                visible: s && (!mq.matchMedia.is('sm') || h),
                offset: e.state.popupOffset,
                onMapClick: e.onMapClick,
                clearance: P,
              },
                React.createElement("div", {
                  className: "listing-map-popover"
                },
                  React.createElement(N.default, {
                    imagePreloadCount: q,
                    listing: n,
                    listingUrl: w,
                    listingLinkTarget: S,
                    pricingQuote: g,
                    onPhotoPress: e.onCardPhotoClick,
                    onInfoPress: e.onCardInfoClick,
                    onWishlistButtonPress: e.onWishlistButtonPress,
                    showCompactInfo: true,
                    showNameSecondLine: m,
                    useLegacySlideshow: true,
                    useLegacyWishlistButton: true,
                    showFromPrice: x,
                  })
                )
              )
            }
            return React.createElement(Marker, k, R);
          })}
          {this.renderMapAddressPin()}
          {this.renderOfficeLocationPins()}
        </Map>
        {React.createElement(j.default, {
          autoRefresh: v,
          className: s,
          onClickRefresh: this.onClickRefresh,
          onToggleAutoRefresh: this.onToggleAutoRefresh,
          readyToRefresh: _,
          shouldSmallMapAutoRefresh: T
        })}
        {!mq.matchMedia.is('sm') && React.createElement(_e.default, {
          guidebook: R,
        })}
      </div>
    );
  }
}

PureSearchResultsMap.propTypes = propTypes,
PureSearchResultsMap.defaultProps = defaultProps;

const Fe = connectToStores(storeConfig, PureSearchResultsMap);

export { PureSearchResultsMap };
export const LegacySearchResultsMap = Fe;

export default (0, De.default)(Fe);
