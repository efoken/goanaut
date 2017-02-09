(function(e) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.LegacySearchResultsMap = t.PureSearchResultsMap = t.storeConfig = t.MAPBOX_POPUP_OFFSET = t.GOOGLE_POPUP_OFFSET = void 0;
                var r = n(10)
                  , a = babelHelpers.interopRequireDefault(r)
                  , i = n(14)
                  , o = babelHelpers.interopRequireDefault(i)
                  , l = n(194)
                  , s = babelHelpers.interopRequireDefault(l)
                  , u = n(16)
                  , c = babelHelpers.interopRequireDefault(u)
                  , d = n(89)
                  , p = babelHelpers.interopRequireDefault(d)
                  , f = n(169)
                  , h = babelHelpers.interopRequireDefault(f)
                  , m = n(152)
                  , b = n(15)
                  , v = babelHelpers.interopRequireDefault(b)
                  , g = n(2)
                  , y = babelHelpers.interopRequireDefault(g)
                  , _ = n(38)
                  , P = babelHelpers.interopRequireDefault(_)
                  , E = n(184)
                  , T = n(30)
                  , k = babelHelpers.interopRequireDefault(T)
                  , R = n(7991)
                  , w = babelHelpers.interopRequireDefault(R)
                  , C = n(2290)
                  , S = n(2275)
                  , O = n(2296)
                  , D = babelHelpers.interopRequireDefault(O)
                  , H = n(2305)
                  , x = n(3603)
                  , q = babelHelpers.interopRequireDefault(x)
                  , M = n(5246)
                  , L = babelHelpers.interopRequireDefault(M)
                  , I = n(7995)
                  , N = babelHelpers.interopRequireDefault(I)
                  , A = n(6008)
                  , j = babelHelpers.interopRequireDefault(A)
                  , F = n(8001)
                  , B = babelHelpers.interopRequireDefault(F)
                  , U = n(8002)
                  , z = babelHelpers.interopRequireDefault(U)
                  , W = n(8007)
                  , V = babelHelpers.interopRequireDefault(W)
                  , G = n(8008)
                  , Y = babelHelpers.interopRequireDefault(G)
                  , K = n(8009)
                  , Q = babelHelpers.interopRequireDefault(K)
                  , Z = n(1884)
                  , X = babelHelpers.interopRequireDefault(Z)
                  , J = n(8010)
                  , ee = babelHelpers.interopRequireDefault(J)
                  , te = n(8013)
                  , ne = babelHelpers.interopRequireDefault(te)
                  , re = n(1886)
                  , ae = babelHelpers.interopRequireDefault(re)
                  , ie = n(8016)
                  , oe = babelHelpers.interopRequireDefault(ie)
                  , le = n(8017)
                  , se = babelHelpers.interopRequireDefault(le)
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
                  , qe = babelHelpers.interopRequireDefault(xe)
                  , Me = Object.assign(Object.assign({
                    searchResponse: w.default.isRequired,
                    p2AutoRefreshKey: r.PropTypes.string,
                    p2ViewedMarkersKey: r.PropTypes.string,
                    provider: r.PropTypes.string,
                    isSmMapVisible: r.PropTypes.bool,
                    showWebcotListingCards: r.PropTypes.bool
                }, Oe.withOptionalFiltersPropTypes), Q.default, oe.default)
                  , Le = Object.assign(Object.assign({
                    p2AutoRefreshKey: "p2AutoRefreshSetting",
                    p2ViewedMarkersKey: "p2ViewedMarkers",
                    provider: "google",
                    isSmMapVisible: !1,
                    showWebcotListingCards: !1
                }, Oe.withFiltersDefaultProps), ie.defaultProps)
                  , Ie = {
                    getStores: function() {
                        function e() {
                            return [X.default, se.default, ee.default, ce.default, ne.default]
                        }
                        return e
                    }(),
                    getPropsFromStores: function() {
                        function e() {
                            var e = X.default.getState()
                              , t = e.hoveredListingId
                              , n = e.clickedListingId
                              , r = se.default.getState()
                              , a = r.wishlistedListingsIds
                              , i = ne.default.getState()
                              , o = i.businessOfficeLocations
                              , l = i.clickedOfficeLocationId
                              , s = {}
                              , u = ce.default.getState()
                              , c = u.isSmMapVisible;
                            return {
                                hoveredListingId: t,
                                wishlistedListingsIds: a,
                                extraListingMarkers: [],
                                clickedListingId: n,
                                extraListingMarkerType: s,
                                isSmMapVisible: c,
                                businessOfficeLocations: o,
                                clickedOfficeLocationId: l
                            }
                        }
                        return e
                    }()
                }
                  , Ne = t.GOOGLE_POPUP_OFFSET = {
                    x: -10,
                    y: -10
                }
                  , Ae = t.MAPBOX_POPUP_OFFSET = {
                    x: -14,
                    y: -20
                }
                  , je = function(t) {
                    function n(e) {
                        babelHelpers.classCallCheck(this, n);
                        var t = babelHelpers.possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
                        return t.state = {
                            autoRefresh: !0,
                            readyToRefresh: !1,
                            inSmallP2Experiment: !1,
                            bounds: null,
                            zoom: null,
                            loaded: !1,
                            popupOffset: {
                                x: 0,
                                y: 0
                            }
                        },
                        t.isProgrammaticBoundsChange = !1,
                        t.zoom = null,
                        t.sw = null,
                        t.onClickRefresh = t.onClickRefresh.bind(t),
                        t.onMapChanged = t.onMapChanged.bind(t),
                        t.onMapChangedDebounced = (0,
                        L.default)(t.onMapChanged, 100),
                        t.onMarkerClick = t.onMarkerClick.bind(t),
                        t.onToggleAutoRefresh = t.onToggleAutoRefresh.bind(t),
                        t.onCardPhotoClick = t.onCardPhotoClick.bind(t),
                        t.onCardInfoClick = t.onCardInfoClick.bind(t),
                        t.onWishlistButtonPress = t.onWishlistButtonPress.bind(t),
                        t.onOfficeLocationPinClick = t.onOfficeLocationPinClick.bind(t),
                        t.setMapViewFromProps = t.setMapViewFromProps.bind(t),
                        t.setMapViewFromMarkers = t.setMapViewFromMarkers.bind(t),
                        t.handleWindowResize = t.handleWindowResize.bind(t),
                        t.windowDidResize = t.windowDidResize.bind(t),
                        t.windowDidResizeDebounced = (0,
                        L.default)(t.windowDidResize, 150),
                        t
                    }
                    return babelHelpers.inherits(n, t),
                    babelHelpers.createClass(n, [{
                        key: "componentDidMount",
                        value: function() {
                            function t() {
                                var t = this
                                  , n = (0,
                                h.default)(this.props.p2AutoRefreshKey)
                                  , r = this.props
                                  , a = r.searchResponse.filters
                                  , i = r.isSmMapVisible
                                  , o = r.provider
                                  , l = void 0 === n || n;
                                if (this.setState({
                                    autoRefresh: l
                                }),
                                (0,
                                me.hasBoundingBox)(a) && (0,
                                me.hasZoom)(a) ? (0,
                                S.onMapsLoad)(function() {
                                    t.setMapViewFromProps(t.props),
                                    t.setState({
                                        loading: !1
                                    })
                                }) : (0,
                                S.onMapsLoad)(function() {
                                    t.setMapViewFromMarkers(t.props),
                                    t.setState({
                                        loading: !1
                                    })
                                }),
                                i) {
                                    var s = k.default.getBootstrap("small_p2_map_auto_refresh") && v.default.deliverExperiment("small_p2_map_auto_refresh", {
                                        control: function() {
                                            function e() {
                                                return !1
                                            }
                                            return e
                                        }(),
                                        treatment: function() {
                                            function e() {
                                                return !0
                                            }
                                            return e
                                        }(),
                                        treatment_unknown: function() {
                                            function e() {
                                                return !1
                                            }
                                            return e
                                        }()
                                    });
                                    this.setState({
                                        loading: !0,
                                        autoRefresh: s && l,
                                        inSmallP2Experiment: s
                                    })
                                }
                                var u = {};
                                "google" === o ? (u.x = Ne.x,
                                u.y = Ne.y) : "mapbox" === o && (u.x = Ae.x,
                                u.y = Ae.y),
                                this.setState({
                                    popupOffset: u
                                }),
                                (0,
                                Re.loadBusinessLocations)(),
                                e.window.addEventListener("resize", this.handleWindowResize),
                                "google" === o && y.default.get("p2_map_transit") && this.setState({
                                    showTransitLayer: !0
                                })
                            }
                            return t
                        }()
                    }, {
                        key: "componentWillReceiveProps",
                        value: function() {
                            function e(e) {
                                var t = this.props
                                  , n = t.searchResponse
                                  , r = n.filters
                                  , a = n.results
                                  , i = t.hoveredListingId
                                  , o = e.searchResponse
                                  , l = o.filters
                                  , s = o.results
                                  , u = o.metadata
                                  , c = e.hoveredListingId;
                                if (i === c) {
                                    var d = (0,
                                    me.changedZoom)(r, l)
                                      , p = (0,
                                    me.changedBoundingBox)(r, l)
                                      , f = (0,
                                    me.changedLocation)(r, l)
                                      , h = (0,
                                    be.changedListingIds)(a, s)
                                      , m = (0,
                                    me.hasBoundingBox)(l) && (0,
                                    me.hasZoom)(l)
                                      , b = (0,
                                    me.changedSearchFilters)(r, l);
                                    if ((d || p || f || h) && (this.setState({
                                        loading: !1,
                                        readyToRefresh: !1
                                    }),
                                    m || this.setMapViewFromMarkers(e)),
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
                            return e
                        }()
                    }, {
                        key: "componentWillUnmount",
                        value: function() {
                            function t() {
                                this.isProgrammaticBoundsChange = !1,
                                e.window.removeEventListener("resize", this.handleWindowResize)
                            }
                            return t
                        }()
                    }, {
                        key: "onToggleAutoRefresh",
                        value: function() {
                            function e(e) {
                                var t = !!e.target.checked;
                                this.setState({
                                    autoRefresh: t
                                }),
                                (0,
                                h.default)(this.props.p2AutoRefreshKey, t)
                            }
                            return e
                        }()
                    }, {
                        key: "onClickRefresh",
                        value: function() {
                            function e() {
                                var e = this.state
                                  , t = e.bounds
                                  , n = e.zoom;
                                this.refreshMap({
                                    bounds: t,
                                    zoom: n
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "onCardPhotoClick",
                        value: function() {
                            function e(e, t) {
                                var n = this.props.searchResponse
                                  , r = n.filters
                                  , a = n.metadata;
                                z.default.trackListingCardPhotoClick({
                                    listing: t,
                                    section: "map"
                                }),
                                (0,
                                Y.default)({
                                    section: "listing_cards_map",
                                    messageType: a.urgency_commitment.message_type,
                                    searchFilters: r
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "onCardInfoClick",
                        value: function() {
                            function e(e, t) {
                                var n = this.props.searchResponse
                                  , r = n.filters
                                  , a = n.metadata;
                                z.default.trackListingCardInfoClick({
                                    listing: t,
                                    section: "map"
                                }),
                                (0,
                                Y.default)({
                                    section: "listing_cards_map",
                                    messageType: a.urgency_commitment.message_type,
                                    searchFilters: r
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "onWishlistButtonPress",
                        value: function() {
                            function e(e, t) {
                                var n = this.props.searchResponse
                                  , r = n.filters
                                  , a = n.metadata;
                                (0,
                                V.default)({
                                    section: "map",
                                    messageType: a.urgency_commitment.message_type,
                                    searchFilters: r,
                                    listingId: t.id
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "onMarkerClick",
                        value: function() {
                            function e(e) {
                                var t = this
                                  , n = e.data;
                                this.programmaticMapChange(function() {
                                    var e = n.listing.id
                                      , r = t.props
                                      , a = r.hoveredListingId
                                      , i = r.wishlistedListingsIds
                                      , o = (0,
                                    he.default)({
                                        hovered: e === a,
                                        viewed: t.isListingMarkerViewed(e),
                                        wishlisted: i[e] === !0
                                    });
                                    t.setListingMarkerViewed(e),
                                    ae.default.clickedListingCard(e),
                                    z.default.trackPricePinClick(e, o)
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "onOfficeLocationPinClick",
                        value: function() {
                            function e(e) {
                                var t = this.props.searchResponse
                                  , n = t.metadata
                                  , r = t.filters
                                  , a = n.geography
                                  , i = "";
                                a && (i = a.city),
                                P.default.logEvent({
                                    event_name: "search_page",
                                    event_data: {
                                        sub_event: "map",
                                        operation: "click_office_location_pin",
                                        city: i,
                                        check_in: r.checkin
                                    }
                                }),
                                (0,
                                Re.clickedOfficeLocationCard)(e)
                            }
                            return e
                        }()
                    }, {
                        key: "onMapClick",
                        value: function() {
                            function e() {
                                ae.default.closedListingCard(),
                                (0,
                                Re.closedOfficeLocationCard)()
                            }
                            return e
                        }()
                    }, {
                        key: "onMapChanged",
                        value: function() {
                            function e(e) {
                                var t = e.bounds
                                  , n = e.zoom
                                  , r = this.props.searchResponse
                                  , a = r.filters
                                  , i = r.metadata;
                                if (this.state.loaded || this.setState({
                                    loaded: !0
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
                                        readyToRefresh: !0
                                    }),
                                    this.state.autoRefresh && this.refreshMap({
                                        bounds: t,
                                        zoom: n
                                    }),
                                    this.zoom = n,
                                    this.sw = s.sw)
                                }
                            }
                            return e
                        }()
                    }, {
                        key: "setMapViewFromProps",
                        value: function() {
                            function e(e) {
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
                            return e
                        }()
                    }, {
                        key: "setMapViewFromMarkers",
                        value: function() {
                            function e(e) {
                                var t = this
                                  , n = e.searchResponse
                                  , r = n.results
                                  , a = n.metadata
                                  , i = n.filters.location
                                  , o = e.provider
                                  , l = e.extraListingMarkers
                                  , s = r.map(function(e) {
                                    var t = e.listing
                                      , n = t.lat
                                      , r = t.lng;
                                    return {
                                        lat: n,
                                        lng: r
                                    }
                                });
                                if ((0,
                                ge.default)(a)) {
                                    var u = a.geography
                                      , c = u.lat
                                      , d = u.lng
                                      , p = u.place_id;
                                    s.push({
                                        lat: c,
                                        lng: d
                                    }),
                                    P.default.logEvent({
                                        event_name: "search_page",
                                        event_data: {
                                            sub_event: "map",
                                            operation: "precise_address",
                                            lat: c,
                                            lng: d,
                                            location: i,
                                            place_id: p
                                        }
                                    })
                                }
                                if (l.forEach(function(e) {
                                    e && s.push({
                                        lat: e.listing.lat,
                                        lng: e.listing.lng
                                    })
                                }),
                                0 !== s.length) {
                                    var f = (0,
                                    q.default)(s)
                                      , h = new D.default(f.sw,f.ne);
                                    this.programmaticMapChange(function() {
                                        "mapbox" === o ? setTimeout(function() {
                                            t.map.fitBounds(h)
                                        }, 0) : t.map.fitBounds(h)
                                    })
                                }
                            }
                            return e
                        }()
                    }, {
                        key: "getMapParams",
                        value: function() {
                            function e(e) {
                                var t = e.bounds
                                  , n = e.zoom
                                  , r = this.map
                                  , a = r && r.refs.container
                                  , i = $(a)
                                  , o = i.width();
                                return (0,
                                pe.default)({
                                    bounds: t,
                                    zoom: n,
                                    width: o
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "setListingMarkerViewed",
                        value: function() {
                            function e(e) {
                                var t = this.props.p2ViewedMarkersKey
                                  , n = (0,
                                h.default)(t) || {};
                                n[e] = !0,
                                (0,
                                h.default)(t, n, {
                                    expires: s.default.duration(1, "days")
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "checkMapMovedEnough",
                        value: function() {
                            function e(e) {
                                var t = e.jsonBounds
                                  , n = e.zoom;
                                if (this.zoom !== n)
                                    return !0;
                                var r = t.ne
                                  , a = t.sw
                                  , i = .05
                                  , o = Math.abs(this.sw.lat - a.lat)
                                  , l = Math.abs(this.sw.lng - a.lng)
                                  , s = r.lat - a.lat + l
                                  , u = r.lng - a.lng + o;
                                return (o * u + l * s - o * l) / (u * s) > i
                            }
                            return e
                        }()
                    }, {
                        key: "isListingMarkerViewed",
                        value: function() {
                            function e(e) {
                                var t = (0,
                                h.default)(this.props.p2ViewedMarkersKey);
                                return !(!t || !t[e])
                            }
                            return e
                        }()
                    }, {
                        key: "logMapBounds",
                        value: function() {
                            function e(e) {
                                var t = e.bounds
                                  , n = e.zoom
                                  , r = e.page
                                  , a = e.urlTag
                                  , i = this.getMapParams({
                                    bounds: t,
                                    zoom: n
                                });
                                P.default.logEvent({
                                    event_name: "search_page",
                                    event_data: Object.assign({
                                        sub_event: "map",
                                        operation: "bounds_changed",
                                        url_tag: a,
                                        page: r
                                    }, i)
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "programmaticMapChange",
                        value: function() {
                            function e(e) {
                                var t = this
                                  , n = this.props.provider;
                                this.isProgrammaticBoundsChange = !0;
                                var r = this.map && this.map.state.map;
                                if (r) {
                                    var a = void 0;
                                    "mapbox" === n ? a = "moveend" : "google" === n && (a = "idle"),
                                    r.once(a, function() {
                                        t.isProgrammaticBoundsChange = !1
                                    })
                                }
                                e(),
                                r || (this.isProgrammaticBoundsChange = !1)
                            }
                            return e
                        }()
                    }, {
                        key: "refreshMap",
                        value: function() {
                            function e(e) {
                                var t = e.bounds
                                  , n = e.zoom
                                  , r = this.getMapParams({
                                    bounds: t,
                                    zoom: n
                                })
                                  , a = (0,
                                m.pick)(r, Object.keys(Se.MapDetailsPropTypes))
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
                                    (0,
                                    Ce.updateFilters)(a);
                                this.setState({
                                    loading: !0
                                })
                            }
                            return e
                        }()
                    }, {
                        key: "handleWindowResize",
                        value: function() {
                            function e() {
                                this.windowResizing = !0,
                                this.windowDidResizeDebounced()
                            }
                            return e
                        }()
                    }, {
                        key: "windowDidResize",
                        value: function() {
                            function e() {
                                this.windowResizing = !1
                            }
                            return e
                        }()
                    }, {
                        key: "renderMapAddressPin",
                        value: function() {
                            function e() {
                                var e = this.props.searchResponse
                                  , t = e.metadata
                                  , n = e.filters;
                                if ((0,
                                ge.default)(t)) {
                                    var r = t.geography
                                      , i = r.lat
                                      , o = r.lng;
                                    return a.default.createElement(C.Marker, {
                                        icon: {
                                            url: y.default.get("p2_marker_image_path")["page2/address_pin.png"]
                                        },
                                        markerType: "address",
                                        position: {
                                            lat: i,
                                            lng: o
                                        },
                                        title: n.location
                                    })
                                }
                                return null
                            }
                            return e
                        }()
                    }, {
                        key: "renderOfficeLocationPins",
                        value: function() {
                            function e() {
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
                                    return a.default.createElement(C.Marker, {
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
                                    }, a.default.createElement(C.Popup, {
                                        visible: r === n,
                                        offset: e.state.popupOffset,
                                        onMapClick: e.onMapClick
                                    }, a.default.createElement("div", {
                                        className: "business-office-location-panel text-center"
                                    }, a.default.createElement("div", null, l), a.default.createElement("div", null, s), a.default.createElement("div", {
                                        className: "text-muted"
                                    }, u))))
                                }) : null
                            }
                            return e
                        }()
                    }, {
                        key: "render",
                        value: function() {
                            function e() {
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
                                    (0,
                                    be.containsListingInfo)(i, e) || D.push(e)
                                });
                                var x = !(0,
                                me.hasDates)(r) && (0,
                                we.inShowFromPriceTreatment)()
                                  , q = y.default.get("p2_greedy_slideshow_preload_count");
                                return a.default.createElement("div", {
                                    style: {
                                        height: "100%"
                                    },
                                    className: (0,
                                    p.default)("search-results-map", {
                                        loading: g && E.matchMedia.is("sm")
                                    })
                                }, a.default.createElement(C.Map, w, D.map(function(t) {
                                    var n = t.listing
                                      , i = n.id
                                      , s = i === l
                                      , d = i === u
                                      , p = e.isListingMarkerViewed(i)
                                      , b = c[i] === !0
                                      , v = f[i] === Ee.default.HOST_OWN_LISTING_MARKER
                                      , g = t.pricing_quote
                                      , _ = (0,
                                    he.default)({
                                        hovered: d,
                                        viewed: p,
                                        wishlisted: b
                                    })
                                      , P = {
                                        x: 15,
                                        y: 70
                                    }
                                      , T = a.default.createElement(B.default, {
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
                                        var w = (0,
                                        me.roomPathWithParams)(n.id, r, o)
                                          , S = (0,
                                        ke.default)(n, y.default.get("is_mobile"));
                                        R = a.default.createElement(C.Popup, {
                                            visible: s && (!E.matchMedia.is("sm") || h),
                                            offset: e.state.popupOffset,
                                            onMapClick: e.onMapClick,
                                            clearance: P
                                        }, a.default.createElement("div", {
                                            className: "listing-map-popover"
                                        }, a.default.createElement(N.default, {
                                            imagePreloadCount: q,
                                            listing: n,
                                            listingUrl: w,
                                            listingLinkTarget: S,
                                            pricingQuote: g,
                                            onPhotoPress: e.onCardPhotoClick,
                                            onInfoPress: e.onCardInfoClick,
                                            onWishlistButtonPress: e.onWishlistButtonPress,
                                            showCompactInfo: !0,
                                            showNameSecondLine: m,
                                            useLegacySlideshow: !0,
                                            useLegacyWishlistButton: !0,
                                            showFromPrice: x
                                        })))
                                    }
                                    return a.default.createElement(C.Marker, k, R)
                                }), this.renderMapAddressPin(), this.renderOfficeLocationPins()), a.default.createElement(j.default, {
                                    autoRefresh: v,
                                    className: s,
                                    onClickRefresh: this.onClickRefresh,
                                    onToggleAutoRefresh: this.onToggleAutoRefresh,
                                    readyToRefresh: _,
                                    shouldSmallMapAutoRefresh: T
                                }), !E.matchMedia.is("sm") && a.default.createElement(_e.default, {
                                    guidebook: R
                                }))
                            }
                            return e
                        }()
                    }]),
                    n
                }(a.default.Component);
                je.propTypes = Me,
                je.defaultProps = Le;
                var Fe = (0,
                c.default)(Ie, je);
                t.storeConfig = Ie,
                t.PureSearchResultsMap = je,
                t.LegacySearchResultsMap = Fe,
                t.default = (0,
                De.default)(Fe)
            }
