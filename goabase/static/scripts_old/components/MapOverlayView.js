/* eslint-disable no-param-reassign, no-underscore-dangle */
class MapOverlayView extends google.maps.OverlayView {
  constructor(t = {}) {
    super(t);
    this.content_ = t.content || '';
    this.disableAutoPan_ = t.disableAutoPan || false;
    this.maxWidth_ = t.maxWidth || 0;
    this.pixelOffset_ = t.pixelOffset || new google.maps.Size(0, 0);
    this.position_ = t.position || new google.maps.LatLng(0, 0);
    this.zIndex_ = t.zIndex || null;
    this.boxClass_ = t.boxClass || 'infoBox';
    this.boxStyle_ = t.boxStyle || {};
    this.closeBoxMargin_ = t.closeBoxMargin || '2px';
    this.closeBoxURL_ = t.closeBoxURL || 'http://www.google.com/intl/en_us/mapfiles/close.gif';
    if (t.closeBoxURL === '') {
      this.closeBoxURL_ = '';
    }
    this.infoBoxClearance_ = t.infoBoxClearance || new google.maps.Size(1, 1);
    if (typeof t.visible === 'undefined') {
      if (typeof t.isHidden === 'undefined') {
        t.visible = true;
      } else {
        t.visible = !t.isHidden;
      }
    }
    this.isHidden_ = !t.visible;
    this.alignBottom_ = t.alignBottom || false;
    this.pane_ = t.pane || 'floatPane';
    this.enableEventPropagation_ = t.enableEventPropagation || false;
    this.div_ = null;
    this.closeListener_ = null;
    this.moveListener_ = null;
    this.contextListener_ = null;
    this.eventListeners_ = null;
    this.fixedWidthSet_ = null;
  }

  createInfoBoxDiv_() {
    const i = (ev) => {
      ev.cancelBubble = true;
      if (ev.stopPropagation) {
        ev.stopPropagation();
      }
    };
    const o = (ev) => {
      ev.returnValue = false;
      if (ev.preventDefault) {
        ev.preventDefault();
      }
      if (!this.enableEventPropagation_) {
        i(ev);
      }
    };

    if (!this.div_) {
      this.div_ = document.createElement('div');
      this.setBoxStyle_();

      if (typeof this.content_.nodeType === 'undefined') {
        this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(this.content_);
      }

      this.getPanes()[this.pane_].appendChild(this.div_);
      this.addClickHandler_();

      if (this.div_.style.width) {
        this.fixedWidthSet_ = true;
      } else if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {
        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = 'auto';
        this.fixedWidthSet_ = true;
      } else {
        const r = this.getBoxWidths_();
        this.div_.style.width = `${this.div_.offsetWidth - r.left - r.right}px`;
        this.fixedWidthSet_ = false;
      }

      this.panBox_(this.disableAutoPan_);

      if (!this.enableEventPropagation_) {
        this.eventListeners_ = [];
        const n = ['mousedown', 'mouseover', 'mouseout', 'mouseup', 'click', 'dblclick', 'touchstart', 'touchend', 'touchmove'];
        for (let t = 0; t < n.length; t += 1) {
          this.eventListeners_.push(google.maps.event.addDomListener(this.div_, n[t], i));
        }
        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, 'mouseover', () => {
          this.style.cursor = 'default';
        }));
      }

      this.contextListener_ = google.maps.event.addDomListener(this.div_, 'contextmenu', o);
      google.maps.event.trigger(this, 'domready');
    }
  }

  getCloseBoxImg_() {
    let e = '';
    if (this.closeBoxURL_ !== '') {
      e = `<img src="${this.closeBoxURL_}" align="right"
        style="position: relative; cursor: pointer; margin: ${this.closeBoxMargin_};" />`;
    }
    return e;
  }

  addClickHandler() {
    if (this.closeBoxURL_ !== '') {
      const t = this.div_.firstChild;
      this.closeListener_ = google.maps.event.addDomListener(t, 'click', this.getCloseClickHandler_());
    } else {
      this.closeListener_ = null;
    }
  }

  getCloseClickHandler_() {
    return (ev) => {
      ev.cancelBubble = true;
      if (ev.stopPropagation) {
        ev.stopPropagation();
      }
      google.maps.event.trigger(this, 'closeclick');
      this.close();
    };
  }

  panBox_(t) {
    let map;
    // let r;
    let a = 0;
    let i = 0;

    if (!t && (map = this.getMap(), map instanceof google.maps.Map)) { // eslint-disable-line
      if (!map.getBounds().contains(this.position_)) {
        map.setCenter(this.position_);
      }

      // r = map.getBounds();
      const o = map.getDiv();
      const l = o.offsetWidth;
      const s = o.offsetHeight;
      const u = this.pixelOffset_.width;
      const c = this.pixelOffset_.height;
      const d = this.div_.offsetWidth;
      const p = this.div_.offsetHeight;
      const f = this.infoBoxClearance_.width;
      const h = this.infoBoxClearance_.height;
      const m = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (m.x < -u + f) {
        a = (m.x + u) - f;
      } else if (m.x + d + u + f > l) {
        a = (m.x + d + u + f) - l;
      }

      if (this.alignBottom_) {
        if (m.y < -c + h + p) {
          i = (m.y + c) - h - p;
        } else if (m.y + c + h > s) {
          i = (m.y + c + h) - s;
        }
      } else if (m.y < -c + h) {
        i = (m.y + c) - h;
      } else if (m.y + p + c + h > s) {
        i = (m.y + p + c + h) - s;
      }

      if (a !== 0 || i !== 0) {
        map.getCenter();
        map.panBy(a, i);
      }
    }
  }

  setBoxStyle_() {
    if (this.div_) {
      this.div_.className = this.boxClass_;
      this.div_.style.cssText = '';
      const t = this.boxStyle_;
      for (let e in t) { // eslint-disable-line
        if (t.hasOwnProperty(e)) { // eslint-disable-line
          this.div_.style[e] = t[e];
        }
      }
      if (typeof this.div_.style.opacity !== 'undefined' && this.div_.style.opacity !== '') {
        this.div_.style.filter = `alpha(opacity=${100 * this.div_.style.opacity})`;
      }
      this.div_.style.position = 'absolute';
      this.div_.style.visibility = 'hidden';
      if (this.zIndex_ !== null) {
        this.div_.style.zIndex = this.zIndex_;
      }
    }
  }

  getBoxWidths_() {
    const widths = { top: 0, bottom: 0, left: 0, right: 0 };
    const div = this.div_;

    if (document.defaultView && document.defaultView.getComputedStyle) {
      const e = div.ownerDocument.defaultView.getComputedStyle(div, '');
      if (e) {
        widths.top = parseInt(e.borderTopWidth, 10) || 0;
        widths.bottom = parseInt(e.borderBottomWidth, 10) || 0;
        widths.left = parseInt(e.borderLeftWidth, 10) || 0;
        widths.right = parseInt(e.borderRightWidth, 10) || 0;
      }
    } else if (document.documentElement.currentStyle && div.currentStyle) {
      widths.top = parseInt(div.currentStyle.borderTopWidth, 10) || 0;
      widths.bottom = parseInt(div.currentStyle.borderBottomWidth, 10) || 0;
      widths.left = parseInt(div.currentStyle.borderLeftWidth, 10) || 0;
      widths.right = parseInt(div.currentStyle.borderRightWidth, 10) || 0;
    }
    return widths;
  }

  onRemove() {
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  }

  draw() {
    this.createInfoBoxDiv_();
    const point = this.getProjection().fromLatLngToDivPixel(this.position_);
    this.div_.style.left = `${point.x + this.pixelOffset_.width}px`;
    if (this.alignBottom_) {
      this.div_.style.bottom = `${-(point.y + this.pixelOffset_.height)}px`;
    } else {
      this.div_.style.top = `${point.y + this.pixelOffset_.height}px`;
    }
    if (this.isHidden_) {
      this.div_.style.visibility = 'hidden';
    } else {
      this.div_.style.visibility = 'visible';
    }
  }

  setOptions(options) {
    if (options.boxClass !== 'undefined') {
      this.boxClass_ = options.boxClass;
      this.setBoxStyle_();
    }
    if (options.boxStyle !== 'undefined') {
      this.boxStyle_ = options.boxStyle;
      this.setBoxStyle_();
    }
    if (options.content !== 'undefined') {
      this.setContent(options.content);
    }
    if (options.disableAutoPan !== 'undefined') {
      this.disableAutoPan_ = options.disableAutoPan;
    }
    if (options.maxWidth !== 'undefined') {
      this.maxWidth_ = options.maxWidth;
    }
    if (options.pixelOffset !== 'undefined') {
      this.pixelOffset_ = options.pixelOffset;
    }
    if (options.alignBottom !== 'undefined') {
      this.alignBottom_ = options.alignBottom;
    }
    if (options.position !== 'undefined') {
      this.setPosition(options.position);
    }
    if (options.zIndex !== 'undefined') {
      this.setZIndex(options.zIndex);
    }
    if (options.closeBoxMargin !== 'undefined') {
      this.closeBoxMargin_ = options.closeBoxMargin;
    }
    if (options.closeBoxURL !== 'undefined') {
      this.closeBoxURL_ = options.closeBoxURL;
    }
    if (options.infoBoxClearance !== 'undefined') {
      this.infoBoxClearance_ = options.infoBoxClearance;
    }
    if (options.isHidden !== 'undefined') {
      this.isHidden_ = options.isHidden;
    }
    if (options.visible !== 'undefined') {
      this.isHidden_ = !options.visible;
    }
    if (options.enableEventPropagation !== 'undefined') {
      this.enableEventPropagation_ = options.enableEventPropagation;
    }
    if (this.div_) {
      this.draw();
    }
  }

  setContent(content) {
    this.content_ = content;
    if (this.div_) {
      if (this.closeListener_) {
        google.maps.event.removeListener(this.closeListener_);
        this.closeListener_ = null;
      }
      if (!this.fixedWidthSet_) {
        this.div_.style.width = '';
      }
      if (typeof content.nodeType === 'undefined') {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
      if (!this.fixedWidthSet_) {
        this.div_.style.width = `${this.div_.offsetWidth}px`;
        if (typeof content.nodeType === 'undefined') {
          this.div_.innerHTML = this.getCloseBoxImg_() + content;
        } else {
          this.div_.innerHTML = this.getCloseBoxImg_();
          this.div_.appendChild(content);
        }
      }
      this.addClickHandler_();
    }
    google.maps.event.trigger(this, 'content_changed');
  }

  setPosition(position) {
    this.position_ = position;
    if (this.div_) {
      this.draw();
    }
    google.maps.event.trigger(this, 'position_changed');
  }

  setZIndex(zIndex) {
    this.zIndex_ = zIndex;
    if (this.div_) {
      this.div_.style.zIndex = zIndex;
    }
    google.maps.event.trigger(this, 'zindex_changed');
  }

  setVisible(visible) {
    this.isHidden_ = !visible;
    if (this.div_) {
      this.div_.style.visibility = this.isHidden_ ? 'hidden' : 'visible';
    }
  }

  getContent() {
    return this.content_;
  }

  getPosition() {
    return this.position_;
  }

  getZIndex() {
    return this.zIndex_;
  }

  getVisible() {
    return typeof this.getMap() !== 'undefined' && this.getMap() !== null && !this.isHidden_;
  }

  show() {
    this.isHidden_ = false;
    if (this.div_) {
      this.div_.style.visibility = 'visible';
    }
  }

  hide() {
    this.isHidden_ = true;
    if (this.div_) {
      this.div_.style.visibility = 'hidden';
    }
  }

  open(map, marker) {
    const that = this;
    if (marker) {
      this.position_ = marker.getPosition();
      this.moveListener_ = google.maps.event.addListener(marker, 'position_changed', function positionChanged() {
        that.setPosition(this.getPosition());
      });
    }
    this.setMap(map);
    if (this.div_) {
      this.panBox_();
    }
  }

  close() {
    if (this.closeListener_) {
      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }
    if (this.eventListeners_) {
      for (let i = 0; i < this.eventListeners_.length; i += 1) {
        google.maps.event.removeListener(this.eventListeners_[i]);
      }
      this.eventListeners_ = null;
    }
    if (this.moveListener_) {
      google.maps.event.removeListener(this.moveListener_);
      this.moveListener_ = null;
    }
    if (this.contextListener_) {
      google.maps.event.removeListener(this.contextListener_);
      this.contextListener_ = null;
    }
    this.setMap(null);
  }
}

export default MapOverlayView;
