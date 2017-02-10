class OverlayView extends google.maps.OverlayView {
  constructor(e, t, r) {
    this.marker_ = e;
    this.handCursorURL_ = e.handCursorURL;
    this.labelDiv_ = document.createElement('div');
    this.labelDiv_.style.cssText = 'position: absolute; overflow: hidden;';
    this.eventDiv_ = document.createElement('div');
    this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;
    this.eventDiv_.setAttribute('onselectstart', 'return false;');
    this.eventDiv_.setAttribute('ondragstart', 'return false;');
    this.crossDiv_ = OverlayView.getSharedCross(t);
  }

  static getSharedCross(e) {
    if (typeof OverlayView.getSharedCross.crossDiv === 'undefined') {
      const img = document.createElement('img');
      img.style.cssText = 'position: absolute; z-index: 1000002; display: none;';
      img.style.marginLeft = '-8px';
      img.style.marginTop = '-9px';
      img.src = e;
      OverlayView.getSharedCross.crossDiv = img;
    }
    return OverlayView.getSharedCross.crossDiv;
  }

  onAdd() {
    let zIndex, subLan, subLng, i, o, position, center;

    const c = false;
    const d = false;
    const p = 20;
    const cursorUrl = `url(${this.handCursorURL_})`;

    function h(ev) {
      if (ev.preventDefault) {
        ev.preventDefault();
      }
      ev.cancelBubble = true;
      if (ev.stopPropagation) {
        ev.stopPropagation();
      }
    }

    const that = this;

    function m() {
      that.marker_.setAnimation(null);
    }

    this.getPanes().overlayImage.appendChild(this.labelDiv_);
    this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);

    if (typeof n.getSharedCross.processed === 'undefined') {
      this.getPanes().overlayImage.appendChild(this.crossDiv_);
      n.getSharedCross.processed = true;
    }

    this.listeners_ = [
      google.maps.event.addDomListener(this.eventDiv_, 'mouseover', function mouseover(ev) {
        if (that.marker_.getDraggable() || that.marker_.getClickable()) {
          this.style.cursor = 'pointer';
          google.maps.event.trigger(that.marker_, 'mouseover', ev);
        }
      }),
      google.maps.event.addDomListener(this.eventDiv_, 'mouseout', function mouseout(ev) {
        if (!(!that.marker_.getDraggable() && !that.marker_.getClickable() || d)) {
          this.style.cursor = that.marker_.getCursor();
          google.maps.event.trigger(that.marker_, 'mouseout', ev);
        }
      }),
      google.maps.event.addDomListener(this.eventDiv_, 'mousedown', function mousedown(ev) {
        d = false;

        if (that.marker_.getDraggable()) {
          c = true;
          this.style.cursor = cursorUrl;
        }

        if (that.marker_.getDraggable() || that.marker_.getClickable()) {
          google.maps.event.trigger(that.marker_, 'mousedown', ev);
          h(ev);
        }
      }),
      google.maps.event.addDomListener(document, 'mouseup', (ev) => {
        let r;

        if (c) {
          c = false;
          this.eventDiv_.style.cursor = 'pointer';
          google.maps.event.trigger(this.marker_, 'mouseup', ev);
        }

        if (d) {
          if (o) {
            r = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
            r.y += p;
            this.marker_.setPosition(this.getProjection().fromDivPixelToLatLng(r));

            try {
              this.marker_.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(m, 1406);
            } catch (e) {}
          }

          this.crossDiv_.style.display = 'none';
          this.marker_.setZIndex(zIndex);
          i = true;
          d = false;
          ev.latLng = this.marker_.getPosition();
          google.maps.event.trigger(this.marker_, 'dragend', ev);
        }
      }),
      google.maps.event.addListener(this.marker_.getMap(), 'mousemove', (ev) => {
        let i;

        if (c) {
          if (d) {
            ev.latLng = new google.maps.LatLng(ev.latLng.lat() - subLan, ev.latLng.lng() - subLng);
            i = this.getProjection().fromLatLngToDivPixel(ev.latLng);

            if (o) {
              this.crossDiv_.style.left = `${i.x}px`;
              this.crossDiv_.style.top = `${i.y}px`;
              this.crossDiv_.style.display = '';
              i.y -= p;
            }

            this.marker_.setPosition(this.getProjection().fromDivPixelToLatLng(i));

            if (o) {
              this.eventDiv_.style.top = `${i.y + p}px`;
            }

            google.maps.event.trigger(this.marker_, 'drag', ev);
          } else {
            subLan = ev.latLng.lat() - this.marker_.getPosition().lat();
            subLng = ev.latLng.lng() - this.marker_.getPosition().lng();
            zIndex = this.marker_.getZIndex();
            position = this.marker_.getPosition();
            center = this.marker_.getMap().getCenter();
            o = this.marker_.get('raiseOnDrag');
            d = true;
            this.marker_.setZIndex(1e6);
            ev.latLng = this.marker_.getPosition();
            google.maps.event.trigger(this.marker_, 'dragstart', ev);
          }
        }
      }),
      google.maps.event.addDomListener(document, 'keydown', (ev) => {
        if (d && ev.keyCode === 27) {
          o = false;
          this.marker_.setPosition(position);
          this.marker_.getMap().setCenter(center);
          google.maps.event.trigger(document, 'mouseup', ev);
        }
      }),
      google.maps.event.addDomListener(this.eventDiv_, 'click', (ev) => {
        if (this.marker_.getDraggable() || this.marker_.getClickable()) {
          if (i) {
            i = false;
          } else {
            google.maps.event.trigger(this.marker_, 'click', ev);
            h(ev);
          }
        }
      }),
      google.maps.event.addDomListener(this.eventDiv_, 'dblclick', (ev) => {
        if (this.marker_.getDraggable() || this.marker_.getClickable()) {
          google.maps.event.trigger(this.marker_, 'dblclick', ev);
          h(ev);
        }
      }),
      google.maps.event.addListener(this.marker_, 'dragstart', function dragstart(ev) {
        if (!d) {
          o = this.get('raiseOnDrag');
        }
      }),
      google.maps.event.addListener(this.marker_, 'drag', function drag(ev) {
        if (d || o) {
          that.setPosition(p);
          that.labelDiv_.style.zIndex = 1e6 + (this.get('labelInBackground') ? -1 : 1);
        }
      }),
      google.maps.event.addListener(this.marker_, 'dragend', (ev) => {
        if (d || o) {
          this.setPosition(0);
        }
      }),
      google.maps.event.addListener(this.marker_, 'position_changed', () => {
        this.setPosition();
      }),
      google.maps.event.addListener(this.marker_, 'zindex_changed', () => {
        this.setZIndex();
      }),
      google.maps.event.addListener(this.marker_, 'visible_changed', () => {
        this.setVisible();
      }),
      google.maps.event.addListener(this.marker_, 'labelvisible_changed', () => {
        this.setVisible();
      }),
      google.maps.event.addListener(this.marker_, 'title_changed', () => {
        this.setTitle();
      }),
      google.maps.event.addListener(this.marker_, 'labelcontent_changed', () => {
        this.setContent();
      }),
      google.maps.event.addListener(this.marker_, 'labelanchor_changed', () => {
        this.setAnchor();
      }),
      google.maps.event.addListener(this.marker_, 'labelclass_changed', () => {
        this.setStyles();
      }),
      google.maps.event.addListener(this.marker_, 'labelstyle_changed', () => {
        this.setStyles();
      }),
    ];
  }

  onRemove() {
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
    this.eventDiv_.parentNode.removeChild(this.eventDiv_);
    for (let i = 0; i < this.listeners_.length; i++) {
      google.maps.event.removeListener(this.listeners_[i]);
    }
  }

  draw() {
    this.setContent();
    this.setTitle();
    this.setStyles();
  }

  setContent() {
    let e = this.marker_.get('labelContent');

    if (typeof e.nodeType === 'undefined') {
      this.labelDiv_.innerHTML = e;
      this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
    } else {
      this.labelDiv_.innerHTML = '';
      this.labelDiv_.appendChild(e);
      e = e.cloneNode(true);
      this.eventDiv_.innerHTML = '';
      this.eventDiv_.appendChild(e);
    }
  }

  setTitle() {
    this.eventDiv_.title = this.marker_.getTitle() || '';
  }

  setStyles() {
    this.labelDiv_.className = this.marker_.get('labelClass');
    this.eventDiv_.className = this.labelDiv_.className;
    this.labelDiv_.style.cssText = '';
    this.eventDiv_.style.cssText = '';
    const styles = this.marker_.get('labelStyle');

    for (let key in styles) {
      if (styles.hasOwnProperty(key)) {
        this.labelDiv_.style[key] = styles[key];
        this.eventDiv_.style[key] = styles[key];
      }
    }

    this.setMandatoryStyles();
  }

  setMandatoryStyles() {
    this.labelDiv_.style.position = 'absolute';
    this.labelDiv_.style.overflow = 'hidden';
    if (typeof this.labelDiv_.style.opacity !== 'undefined' && this.labelDiv_.style.opacity !== '') {
      this.labelDiv_.style.MsFilter = `"progid:DXImageTransform.Microsoft.Alpha(opacity=${100 * this.labelDiv_.style.opacity})"`;
      this.labelDiv_.style.filter = `alpha(opacity=${100 * this.labelDiv_.style.opacity})`;
    }
    this.eventDiv_.style.position = this.labelDiv_.style.position;
    this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
    this.eventDiv_.style.opacity = 0.01;
    this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"';
    this.eventDiv_.style.filter = 'alpha(opacity=1)';
    this.setAnchor();
    this.setPosition();
    this.setVisible();
  }

  setAnchor() {
    const point = this.marker_.get('labelAnchor');
    this.labelDiv_.style.marginLeft = `${-point.x}px`;
    this.labelDiv_.style.marginTop = `${-point.y}px`;
    this.eventDiv_.style.marginLeft = `${-point.x}px`;
    this.eventDiv_.style.marginTop = `${-point.y}px`;
  }

  setPosition(top = 0) {
    const point = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
    this.labelDiv_.style.left = `${Math.round(point.x)}px`;
    this.labelDiv_.style.top = `${Math.round(point.y - top)}px`;
    this.eventDiv_.style.left = this.labelDiv_.style.left;
    this.eventDiv_.style.top = this.labelDiv_.style.top;
    this.setZIndex();
  }

  setZIndex() {
    const index = this.marker_.get('labelInBackground') ? -1 : 1;
    if (typeof this.marker_.getZIndex() === 'undefined') {
      this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + index;
      this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
    } else {
      this.labelDiv_.style.zIndex = this.marker_.getZIndex() + index;
      this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
    }
  }

  setVisible() {
    if (this.marker_.get('labelVisible') {
      this.labelDiv_.style.display = this.marker_.getVisible() ? 'block' : 'none';
    } else {
      this.labelDiv_.style.display = 'none';
    }
    this.eventDiv_.style.display = this.labelDiv_.style.display;
  }
}

class MapMarker extends google.maps.Marker {
  constructor(options = {}) {
    options.labelContent = options.labelContent || '';
    options.labelAnchor = options.labelAnchor || new google.maps.Point(0, 0);
    options.labelClass = options.labelClass || 'markerLabels';
    options.labelStyle = options.labelStyle || {};
    options.labelInBackground = options.labelInBackground || false;
    if (options.labelVisible === 'undefined') {
      options.labelVisible = true;
    }
    if (options.raiseOnDrag === 'undefined') {
      options.raiseOnDrag = true;
    }
    if (options.clickable === 'undefined') {
      options.clickable = true;
    }
    if (options.draggable === 'undefined') {
      options.draggable = false;
    }
    if (options.optimized === 'undefined') {
      options.optimized = false;
    }
    options.crossImage = options.crossImage || `http${document.location.protocol === 'https:' ? 's' : ''}://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png`;
    options.handCursor = options.handCursor || `http${document.location.protocol === 'https:' ? 's' : ''}://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur`;
    options.optimized = false;
    super(options);
    this.label = new OverlayView(this, options.crossImage, options.handCursor);
  }

  setMap(map) {
    super.setMap(map);
    this.label.setMap(map);
  }
}

export default MapMarker;
