import MapBounds from './components/MapBounds';

export function latLngEqual(e, t) {
  return e.lat === t.lat && e.lng === t.lng;
}

export function positionEqual(e, t) {
  return e.x === t.x && e.y === t.y;
}

export function sizeEqual(e, t) {
  return e.width === t.width && e.height === t.height;
}

export function coordinatesEqual(e, t) {
  if (e === t) {
    return true;
  }
  if (e.length !== t.length) {
    return false;
  }
  for (let n = 0; n < e.length; n += 1) {
    if (e[n][0] !== t[n][0] || e[n][1] !== t[n][1]) {
      return false;
    }
  }
  return true;
}

export function boundsEqual(e, t) {
  return !(!e || !t) && (e instanceof MapBounds && t instanceof MapBounds ? e.equals(t) : latLngEqual(e.sw, t.sw) && latLngEqual(e.ne, t.ne)); // eslint-disable-line
}

export function using(e, t, n) {
  return e in n || e in t;
}

export function changed(e, t, n) {
  return using(e, t, n) && t[e] !== n[e];
}
