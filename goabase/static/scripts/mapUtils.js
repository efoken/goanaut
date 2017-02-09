/* eslint-disable import/prefer-default-export */
export function convertToLatLngLiteral(e) {
  return {
    lat: e.lat(),
    lng: e.lng(),
  };
}
