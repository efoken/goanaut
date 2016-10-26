export function getMarkerHolderStyle(size, origin) {
  const left = -size.width * origin.x;
  const top = -size.height * origin.y;
  return {
    cursor: 'pointer',
    height: size.height,
    left: left,
    position: 'absolute',
    top: top,
    width: size.width,
  };
}

export function getMarkerStyle(size, origin) {
  const sizeOriginX = size.width * origin.x;
  const sizeOriginY = size.height * origin.y;
  return {
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${size.width}px ${size.height}px`,
    height: size.height,
    left: 0,
    position: 'absolute',
    top: 0,
    transformOrigin: `${sizeOriginX}px ${sizeOriginY}px`,
    transition: 'transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
    width: size.width,
    willChange: 'transform', // it looks like this setting make firefox random marker movements smaller
  };
}

export function getMarkerTextStyle() {
  return {
    color: 'black',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  };
}
