import _ from 'lodash';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';
import React from 'react';
import store from 'amplify-store';

import debounce from '../debounce';
import FavoredPartiesStore from '../stores/FavoredPartiesStore';
import PartyInteractionStore from '../stores/PartyInteractionStore';
import { Map, Marker, Popup } from './components/map';
import { mq } from '../utils';

// const z = babelHelpers.interopRequireDefault(n(8002))

var i = n(14)
  , o = babelHelpers.interopRequireDefault(i)
  , b = n(15)
  , v = babelHelpers.interopRequireDefault(b)
  , g = n(2)
  , y = babelHelpers.interopRequireDefault(g)
  , T = n(30)
  , k = babelHelpers.interopRequireDefault(T)
  , R = n(7991)
  , w = babelHelpers.interopRequireDefault(R)
  , S = n(2275)
  , O = n(2296)
  , D = babelHelpers.interopRequireDefault(O)
  , H = n(2305)
  , x = n(3603)
  , q = babelHelpers.interopRequireDefault(x)
  , I = n(7995)
  , N = babelHelpers.interopRequireDefault(I)
  , A = n(6008)
  , j = babelHelpers.interopRequireDefault(A)
  , F = n(8001)
  , B = babelHelpers.interopRequireDefault(F)
  , W = n(8007)
  , V = babelHelpers.interopRequireDefault(W)
  , G = n(8008)
  , Y = babelHelpers.interopRequireDefault(G)
  , K = n(8009)
  , Q = babelHelpers.interopRequireDefault(K)
  , J = n(8010)
  , ee = babelHelpers.interopRequireDefault(J)
  , te = n(8013)
  , ne = babelHelpers.interopRequireDefault(te)
  , re = n(1886)
  , ae = babelHelpers.interopRequireDefault(re)
  , ie = n(8016)
  , oe = babelHelpers.interopRequireDefault(ie)
  , ue = n(1914)
  , ce = babelHelpers.interopRequireDefault(ue)
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
}, Oe.withOptionalFiltersPropTypes), Q.default, oe.default);

const defaultProps = Object.assign(Object.assign({
  p2AutoRefreshKey: 'p2AutoRefreshSetting',
  p2ViewedMarkersKey: 'p2ViewedMarkers',
  provider: 'google',
  isSmMapVisible: false,
  showWebcotListingCards: false,
}, Oe.withFiltersDefaultProps), ie.defaultProps);

export const storeConfig = {
  getStores: () => {
    return [PartyInteractionStore, FavoredPartiesStore, ee.default, ce.default, ne.default];
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
    const u = ce.default.getState();
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

export const MAPBOX_POPUP_OFFSET = {
  x: -14,
  y: -20,
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
    var t = this
      , n = store(this.props.p2AutoRefreshKey)
      , r = this.props
      , a = r.searchResponse.filters
      , i = r.isSmMapVisible
      , l = void 0 === n || n;
    if (this.setState({
        autoRefresh: l
    }),
    (0, me.hasBoundingBox)(a) && (0, me.hasZoom)(a) ? (0, S.onMapsLoad)(function() {
        t.setMapViewFromProps(t.props),
        t.setState({
            loading: false
        })
    }) : (0, S.onMapsLoad)(function() {
        t.setMapViewFromMarkers(t.props),
        t.setState({
            loading: false
        })
    }),
    i) {
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
            autoRefresh: s && l,
            inSmallP2Experiment: s
        })
    }
    const popupOffset = { x: GOOGLE_POPUP_OFFSET.x, y: GOOGLE_POPUP_OFFSET.y };
    this.setState({ popupOffset });
    (0, Re.loadBusinessLocations)();
    window.addEventListener('resize', this.handleWindowResize);
    if (y.default.get('p2_map_transit')) {
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
                this.logMapBounds({
                    bounds: g,
                    zoom: y,
                    page: _,
                    urlTag: P
                })
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
    // z.default.trackListingCardPhotoClick({
    //   listing: t,
    //   section: "map",
    // });
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
    // z.default.trackListingCardInfoClick({
    //   listing: t,
    //   section: "map",
    // });
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

  onMarkerClick(e) {
    const n = e.data;
    this.programmaticMapChange(() => {
      const e = n.listing.id;
      const r = this.props;
      const a = r.hoveredListingId;
      const i = r.wishlistedListingsIds;
      const o = (0, he.default)({
        hovered: e === a,
        viewed: this.isListingMarkerViewed(e),
        wishlisted: i[e] === true,
      });
      this.setListingMarkerViewed(e);
      ae.default.clickedListingCard(e);
      // z.default.trackPricePinClick(e, o);
    });
  }

  onOfficeLocationPinClick(e) {
          var t = this.props.searchResponse
            , n = t.metadata
            , r = t.filters
            , a = n.geography
            , i = "";
          a && (i = a.city),
          // P.default.logEvent({
          //     event_name: "search_page",
          //     event_data: {
          //         sub_event: "map",
          //         operation: "click_office_location_pin",
          //         city: i,
          //         check_in: r.checkin
          //     }
          // }),
          (0, Re.clickedOfficeLocationCard)(e)
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
              this.logMapBounds({
                  bounds: t,
                  zoom: n,
                  page: o,
                  urlTag: l
              })
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
          var t = this
            , n = e.searchResponse.filters
            , r = new D.default({
              lat: n.sw_lat,
              lng: n.sw_lng
          },{
              lat: n.ne_lat,
              lng: n.ne_lng
          });
          this.programmaticMapChange(function() {
              t.map.setView(r.getCenter(), n.zoom)
          })
      }

  setMapViewFromMarkers(props) {
          var t = this
            , n = props.searchResponse
            , r = n.results
            , a = n.metadata
            , i = n.filters.location
            , o = props.provider
            , l = props.extraListingMarkers
            , s = r.map(function(e) {
              var t = e.listing
                , n = t.lat
                , r = t.lng;
              return {
                  lat: n,
                  lng: r
              }
          });
          if ((0, ge.default)(a)) {
              var u = a.geography
                , c = u.lat
                , d = u.lng
                , p = u.place_id;
              s.push({
                  lat: c,
                  lng: d
              }),
              // P.default.logEvent({
              //     event_name: "search_page",
              //     event_data: {
              //         sub_event: "map",
              //         operation: "precise_address",
              //         lat: c,
              //         lng: d,
              //         location: i,
              //         place_id: p
              //     }
              // })
          }
          if (l.forEach(function(e) {
              e && s.push({
                  lat: e.listing.lat,
                  lng: e.listing.lng
              })
          }),
          0 !== s.length) {
              var f = (0, q.default)(s)
                , h = new D.default(f.sw,f.ne);
              this.programmaticMapChange(function() {
                  "mapbox" === o ? setTimeout(function() {
                      t.map.fitBounds(h)
                  }, 0) : t.map.fitBounds(h)
              })
          }
      }

  getMapParams(e) {
          var t = e.bounds
            , n = e.zoom
            , r = this.map
            , a = r && r.refs.container
            , i = $(a)
            , o = i.width();
          return (0, pe.default)({
              bounds: t,
              zoom: n,
              width: o
          })
      }

  setListingMarkerViewed(e) {
          var t = this.props.p2ViewedMarkersKey
            , n = store(t) || {};
          n[e] = true,
          store(t, n, {
              expires: moment.duration(1, "days")
          })
      }

  checkMapMovedEnough(e) {
          var t = e.jsonBounds
            , n = e.zoom;
          if (this.zoom !== n)
              return true;
          var r = t.ne
            , a = t.sw
            , i = .05
            , o = Math.abs(this.sw.lat - a.lat)
            , l = Math.abs(this.sw.lng - a.lng)
            , s = r.lat - a.lat + l
            , u = r.lng - a.lng + o;
          return (o * u + l * s - o * l) / (u * s) > i
      }

  isListingMarkerViewed(e) {
    const t = store(this.props.p2ViewedMarkersKey);
    return !(!t || !t[e]);
  }

  logMapBounds(e) {
    // const bounds = e.bounds;
    // const zoom = e.zoom;
    // const page = e.page;
    // const params = this.getMapParams({ bounds, zoom });
    // P.default.logEvent({
    //   event_name: 'search_page',
    //   event_data: Object.assign({
    //     sub_event: 'map',
    //     operation: 'bounds_changed',
    //     url_tag: e.urlTag,
    //     page,
    //   }, params),
    // });
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
          var t = e.bounds
            , n = e.zoom
            , r = this.getMapParams({
              bounds: t,
              zoom: n
          })
            , a = _.pick(r, Object.keys(Se.MapDetailsPropTypes))
            , i = !!y.default.get("webcot");
          if (i) {
              var o = this.props
                , l = o.stagedFilters
                , s = o.responseFilters;
              qe.default.pushToHistory({
                  stagedFilters: Object.assign({}, l, a),
                  responseFilters: s,
                  currentTab: He.EXPLORE_TABS.HOMES
              })
          } else
              (0, Ce.updateFilters)(a);
          this.setState({
              loading: true
          })
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
        icon={{ url: y.default.get('p2_marker_image_path')['page2/address_pin.png'] }}
        markerType="address"
        position={{ lat: metadata.geography.lat, lng: metadata.geography.lng }}
        title={response.filters.location}
      />;
    }
    return null;
  }

  renderOfficeLocationPins() {
          var e = this
            , t = this.props
            , n = t.businessOfficeLocations
            , r = t.clickedOfficeLocationId;
          if (0 === n.length)
              return null;
          var i = this.props.searchResponse
            , l = i.metadata
            , s = i.filters
            , u = l.geography;
          if (!u)
              return null;
          var c = u.city
            , d = u.lat
            , p = u.lng
            , f = n.filter(function(e) {
              return Math.abs(e.lat - d) + Math.abs(e.lng - p) < 2
          });
          if (0 === f.length)
              return null;
          var h = o.default.current().id % 2 === 1;
          return P.default.logEvent({
              event_name: "biz_travel_experiments",
              event_data: {
                  experiment_name: "office_location",
                  show_pin: h,
                  city: c,
                  check_in: s.checkin
              }
          }),
          h ? f.map(function(t) {
              var n = t.id
                , i = t.lat
                , o = t.lng
                , l = t.business_entity_name
                , s = t.office_name
                , u = t.street;
              return React.createElement(Marker, {
                  icon: {
                      url: y.default.get("p2_marker_image_path")["page2/address_pin.png"]
                  },
                  markerType: "office_location",
                  position: {
                      lat: i,
                      lng: o
                  },
                  onClick: function() {
                      function t() {
                          e.onOfficeLocationPinClick(n)
                      }
                      return t
                  }(),
                  key: "office-pin-" + String(n)
              }, React.createElement(Popup, {
                  visible: r === n,
                  offset: e.state.popupOffset,
                  onMapClick: e.onMapClick
              }, React.createElement("div", {
                  className: "business-office-location-panel text-center"
              }, React.createElement("div", null, l), React.createElement("div", null, s), React.createElement("div", {
                  className: "text-muted"
              }, u))))
          }) : null
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
            , R = o.guidebook
            , w = {
              ref: function() {
                  function t(t) {
                      e.map = t
                  }
                  return t
              }(),
              containerProps: {
                  className: "map-canvas",
                  role: "presentation"
              },
              defaultZoom: r.zoom,
              onBoundsChange: this.onMapChangedDebounced,
              onDragEnd: this.onMapChangedDebounced,
              onZoomChange: this.onMapChangedDebounced,
              clickableIcons: !h,
              showTransitLayer: P
          };
          if (k) {
              var S = k.lat
                , O = k.lng;
              w.defaultCenter = {
                  lat: S,
                  lng: O
              }
          }
          var D = i.slice();
          d.forEach(function(e) {
              (0, be.containsListingInfo)(i, e) || D.push(e)
          });
          var x = !(0, me.hasDates)(r) && (0, we.inShowFromPriceTreatment)()
            , q = y.default.get("p2_greedy_slideshow_preload_count");
          return React.createElement("div", {
              style: {
                  height: "100%"
              },
              className: classNames("search-results-map", {
                  loading: g && mq.matchMedia.is('sm')
              })
          }, React.createElement(Map, w, D.map(function(t) {
              var n = t.listing
                , i = n.id
                , s = i === l
                , d = i === u
                , p = e.isListingMarkerViewed(i)
                , b = c[i] === true
                , v = f[i] === Ee.default.HOST_OWN_LISTING_MARKER
                , g = t.pricing_quote
                , _ = (0, he.default)({
                  hovered: d,
                  viewed: p,
                  wishlisted: b
              })
                , P = {
                  x: 15,
                  y: 70
              }
                , T = React.createElement(B.default, {
                  pricingQuote: g,
                  hovered: d,
                  viewed: p,
                  wishlisted: b,
                  isHostOwnListing: v
              })
                , k = {
                  key: i,
                  position: {
                      lat: n.lat,
                      lng: n.lng
                  },
                  markerType: _,
                  icon: T,
                  onClick: e.onMarkerClick,
                  data: t,
                  visible: !s
              };
              (s || d) && (k.zIndex = H.HIGH_Z_INDEX);
              var R = null;
              if (s) {
                  var w = (0, me.roomPathWithParams)(n.id, r, o)
                    , S = (0, ke.default)(n, y.default.get("is_mobile"));
                  R = React.createElement(Popup, {
                      visible: s && (!mq.matchMedia.is('sm') || h),
                      offset: e.state.popupOffset,
                      onMapClick: e.onMapClick,
                      clearance: P
                  }, React.createElement("div", {
                      className: "listing-map-popover"
                  }, React.createElement(N.default, {
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
                      showFromPrice: x
                  })))
              }
              return React.createElement(Marker, k, R)
          }), this.renderMapAddressPin(), this.renderOfficeLocationPins()), React.createElement(j.default, {
              autoRefresh: v,
              className: s,
              onClickRefresh: this.onClickRefresh,
              onToggleAutoRefresh: this.onToggleAutoRefresh,
              readyToRefresh: _,
              shouldSmallMapAutoRefresh: T
          }), !mq.matchMedia.is('sm') && React.createElement(_e.default, {
              guidebook: R
          }))
      }
}

PureSearchResultsMap.propTypes = propTypes,
PureSearchResultsMap.defaultProps = defaultProps;

const Fe = connectToStores(storeConfig, PureSearchResultsMap);

export PureSearchResultsMap;
export const LegacySearchResultsMap = Fe;

export default (0, De.default)(Fe);
