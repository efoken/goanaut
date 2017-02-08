import mapStyles from '../mapStyles';

Object.defineProperty(t, "__esModule", {
        value: !0
      });

var r = n(2077)
  , a = babelHelpers.interopRequireDefault(r)
  , i = n(1991)
  , o = n(2078)
  , l = babelHelpers.interopRequireDefault(o)
  , s = n(2080)
  , u = babelHelpers.interopRequireDefault(s)
  , c = n(2081)
  , d = babelHelpers.interopRequireDefault(c)
  , h = n(137)
  , m = babelHelpers.interopRequireDefault(h)
  , b = n(104)
  , g = babelHelpers.interopRequireDefault(b)
  , v = "#a4ddf5"
  , y = function(e) {
  var t = Object.assign({}, d.default);
  return e ? (Object.keys(e).forEach(function(n) {
    var r = e[n];
    void 0 !== r && (t[n] = r)
  }),
  t) : t
}
  , _ = function(e) {
  function t(e, n) {
    babelHelpers.classCallCheck(this, t);
    var r = babelHelpers.possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
    return r.element = e,
    r.createMap(y(n)),
    r.popup = new l.default(r),
    r
  }
  return babelHelpers.inherits(t, e),
  babelHelpers.createClass(t, [{
    key: "getZoom",
    value: function() {
      function e() {
        return this.forMapProviders({
          google: function() {
            function e() {
              return this._map.zoom
            }
            return e
          }(),
          mapbox: function() {
            function e() {
              return this._map.getZoom()
            }
            return e
          }()
        })
      }
      return e
    }()
  }, {
    key: "getCenter",
    value: function() {
      function e() {
        return (0,
        i.convertToLatLngLiteral)(this._map.getCenter())
      }
      return e
    }()
  }, {
    key: "fitBounds",
    value: function() {
      function e(e) {
        return this._map.fitBounds(e._bounds),
        this
      }
      return e
    }()
  }, {
    key: "setView",
    value: function() {
      function e(e, t) {
        return this.forMapProviders({
          google: function() {
            function n() {
              this._map.setCenter(e),
              this._map.setZoom(t)
            }
            return n
          }(),
          mapbox: function() {
            function n() {
              this._map.setView(e, t)
            }
            return n
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "panTo",
    value: function() {
      function e(e) {
        return this._map.panTo(e),
        this
      }
      return e
    }()
  }, {
    key: "setZoom",
    value: function() {
      function e(e) {
        return this._map.setZoom(e),
        this
      }
      return e
    }()
  }, {
    key: "setMinZoom",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.setOptions({
                minZoom: e
              })
            }
            return t
          }(),
          mapbox: function() {
            function t() {
              this._map.options.minZoom = e
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "setMaxZoom",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.setOptions({
                maxZoom: e
              })
            }
            return t
          }(),
          mapbox: function() {
            function t() {
              this._map.options.maxZoom = e
            }
            return t;
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "setZoomControl",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.setOptions({
                zoomControl: e
              })
            }
            return t
          }(),
          mapbox: function() {
            function t() {
              this._map.options.zoomControl = e
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "setScaleControl",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.setOptions({
                scaleControl: e
              })
            }
            return t
          }(),
          mapbox: function() {
            function t() {
              e ? this._map.scaleControl ? this._map.scaleControl.addTo(this._map) : this._map.scaleControl = L.control.scale().addTo(this._map) : this._map.scaleControl && this._map.scaleControl.removeFrom(this._map)
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "setStreetViewControl",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.setOptions({
                streetViewControl: e
              })
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "showLocation",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function(e) {
            function t() {
              return e.apply(this, arguments)
            }
            return t.toString = function() {
              return e.toString()
            }
            ,
            t
          }(function() {
            var t = this;
            (new google.maps.Geocoder).geocode({
              address: e
            }, function(e, n) {
              n === google.maps.GeocoderStatus.OK && t._map.fitBounds(e[0].geometry.viewport)
            })
          }),
          mapbox: function() {
            function t() {
              var t = this;
              L.mapbox.geocoder("mapbox.places-v1").query(e, function(e, n) {
                n.lbounds ? t._map.fitBounds(n.lbounds) : n.latlng && t._map.setView([n.latlng[0], n.latlng[1]], 15)
              })
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "toggleTransitLayer",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.transitLayer || this.initTransitLayer(),
              e ? this._map.transitLayer.setMap(this._map) : this._map.transitLayer.setMap(null)
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "setDirections",
    value: function() {
      function e(e) {
        return this.forMapProviders({
          google: function() {
            function t() {
              this._map.directionsRenderer || this.initDirectionsRenderer(),
              this._map.directionsRenderer.setDirections(e)
            }
            return t
          }()
        }),
        this
      }
      return e
    }()
  }, {
    key: "initTransitLayer",
    value: function() {
      function e() {
        this.forMapProviders({
          google: function(e) {
            function t() {
              return e.apply(this, arguments)
            }
            return t.toString = function() {
              return e.toString()
            }
            ,
            t
          }(function() {
            var e = new google.maps.TransitLayer;
            e.setMap(this._map),
            this._map.transitLayer = e
          })
        })
      }
      return e
    }()
  }, {
    key: "initDirectionsRenderer",
    value: function() {
      function e() {
        this.forMapProviders({
          google: function(e) {
            function t() {
              return e.apply(this, arguments)
            }
            return t.toString = function() {
              return e.toString()
            }
            ,
            t
          }(function() {
            var e = new google.maps.DirectionsRenderer;
            e.setMap(this._map),
            this._map.directionsRenderer = e
          })
        })
      }
      return e
    }()
  }]),
  t
}(a.default);

class MapSearch {
  constructor(element, n) {
    super();
    this.element = element;
    this.createMap(y(n));
    this.popup = new l.default(this);
  }

  createMap(options) {
    const customStyles = options.customStyles;
    const disablePoi = options.disablePOI;
    const disableTransit = options.disableTransit;
    const showTransitLayer = options.showTransitLayer;
    const directions = options.directions;

    this._map = new google.maps.Map(this.element, {
      disableDefaultUI: options.disableDefaultUI,
      clickableIcons: options.clickableIcons,
      draggable: options.draggable,
      scrollwheel: false,
      center: options.center,
      zoom: options.zoom,
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      zoomControl: options.zoomControl,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition[options.zoomControlPosition],
      },
      backgroundColor: v,
      styles: this.getStyles(customStyles, disablePoi, disableTransit),
      scaleControl: options.scaleControl,
      streetViewControl: options.streetViewControl,
    });

    if (showTransitLayer) {
      this.toggleTransitLayer(showTransitLayer);
    }

    if (directions) {
      this.setDirections(directions);
    }
  }

  getStyles(customStyles, disablePoi = false, disableTransit = false) {
    if (customStyles) {
      return customStyles;
    }

    const styles = [].concat(mapStyles);

    if (disablePoi) {
      styles.push({
        featureType: 'poi',
        stylers: [{
          visibility: 'off',
        }],
      });
    }

    if (disableTransit) {
      styles.push({
        featureType: 'transit',
        stylers: [{
          visibility: 'off',
        }],
      });
    }

    return styles;
  }

  on(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    var r = this;

    if (n) {
      !function() {
        var n = r._map.getStreetView();
        var a = google.maps.event.addListener(n, e, function() {
          t(n);
        });
        r.registerHandlerId(e, t, a);
      }();
    } else {
      var a = google.maps.event.addListener(this._map, e, t);
      this.registerHandlerId(e, t, a);
    }

    return this;
  }

  off(e, t) {
    var n = this.getHandlerId(e, t);
    null !== n && google.maps.event.removeListener(n);
    return this;
  }

  once(e, t) {
    google.maps.event.addListenerOnce(this._map, e, t);
    return this;
  }

  getNE() {
    var e = this._map.getBounds();
    return e ? (0,
    i.convertToLatLngLiteral)(e.getNorthEast()) : null
  }

  getSW() {
    var e = this._map.getBounds();
    return e ? (0,
    i.convertToLatLngLiteral)(e.getSouthWest()) : null
  }

  getBounds() {
    var e = new u.default(this._map.getBounds());
    return e ? e : null
  }
}

export default MapSearch;
