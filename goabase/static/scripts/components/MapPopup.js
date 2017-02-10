/* eslint-disable no-underscore-dangle */
import MapHandlerRegistry from './MapHandlerRegistry';
import { mq } from '../utils';

const o = babelHelpers.interopRequireDefault(n(2295));

const DEFAULT_OFFSET = { x: 0, y: 0 };

class MapPopup extends MapHandlerRegistry {
  constructor(map) {
    super();
    this.close = this.close.bind(this);
    this._onClose = undefined;
    this._isOpen = false;

    const Popup = (0, o.default)(google);
    this._popup = new Popup({
      closeBoxURL: '',
      pane: 'floatPane',
      alignBottom: true,
      enableEventPropagation: true,
      zIndex: 330,
    });

    map.on('click', () => {
      if (this.ignoreNextMapClick) {
        this.ignoreNextMapClick = false;
      } else {
        if (this._onMapClick) {
          this._onMapClick();
        }
        this.close();
      }
    });
    this.map = map;
  }

  open(e, options = { offset: DEFAULT_OFFSET }) {
    if (this.isOpen()) {
      this.close();
    }

    if (options.onClose) {
      this._onClose = options.onClose;
    }
    if (options.onMapClick) {
      this._onMapClick = options.onMapClick;
    }
    if (!options.offset) {
      options.offset = DEFAULT_OFFSET; // eslint-disable-line
    }

    const content = e.getPopupContent();

    if (mq.matchMedia.is('sm')) {
      this.ignoreNextMapClick = true;
    }

    content.addEventListener('contextmenu', ev => ev.stopPropagation());
    content.addEventListener('dblclick', ev => ev.stopPropagation());
    content.addEventListener('click', () => {
      this.ignoreNextMapClick = true;
    });

    this._popup.setContent(content);
    this._popup.open(this.map._map, e._marker);
    this._popup.setOptions({
      pixelOffset: new google.maps.Size(-130 + options.offset.x, -12 + options.offset.y),
    });

    content.addEventListener('click', (ev) => {
      for (let element = ev.target; element && element !== ev.currentTarget;) {
        if (element.nodeName.toLowerCase() === 'a' && element.href && element.href !== '#') {
          return;
        }
        element = element.parentNode;
      }
      ev.preventDefault();
    });

    const callback = e.getPopupCallback();
    if (callback) {
      callback(content);
    }
    this._isOpen = true;
    this._parent = e;

    return this;
  }

  getParent() {
    return this._parent;
  }

  close() {
    this._popup.close();
    this._isOpen = false;
    if (this._onClose) {
      this._onClose();
      this._onClose = undefined;
    }
    return this;
  }

  isOpen() {
    return !!this._isOpen;
  }

  setClearance(point) {
    const width = point.x;
    const height = point.y;
    this._popup.setOptions({
      infoBoxClearance: new google.maps.Size(width, height),
    });
  }
}

export default MapPopup;
