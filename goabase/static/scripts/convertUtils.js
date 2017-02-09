export function shortNumber(number, decimals) {
  return String(number.toFixed(decimals)).replace(/\.?0+$/m, '');
}

export function latLngToString(latLng) {
  const lat = latLng.lat;
  const lng = latLng.lng;
  return `${shortNumber(lat, 5)},${shortNumber(lng, 5)}`;
}

export function lngLatToString(latLng) {
  const lat = latLng.lat;
  const lng = latLng.lng;
  return `${shortNumber(lng, 5)},${shortNumber(lat, 5)}`;
}

export function joinWithMaxLength(a, t, n) {
  return a.reduce((e, r) => {
    if (e.length + t.length + r.length <= n) {
      return `${e}${e.length ? t : ''}${r}`;
    }
    return e;
  }, '');
}
