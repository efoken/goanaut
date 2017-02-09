/* eslint-disable no-underscore-dangle */
import MapHandlerRegistry from './MapHandlerRegistry';

class MapIcon extends MapHandlerRegistry {
  constructor(url, n = {}) {
    super();

    const a = n;
    const origin = a.origin;
    const size = a.size;
    const anchor = a.anchor;

    r._name = n.name;

    if (origin && size) {
      r._icon = a.isRetina ? {
        size,
        origin,
        anchor,
        url,
        scaledSize: {
          width: a.spriteSize.width / 2,
          height: a.spriteSize.height / 2,
        },
      } : { size, origin, anchor, url };
    } else {
      r._icon = a.isRetina ? {
        anchor,
        url,
        scaledSize: {
          width: size.width,
          height: size.height,
        },
      } : { anchor, url };
  }
}

export default MapIcon;
