export const breakpoints = {
  sm: '(max-width: 743px)',
  md: '(min-width: 744px) and (max-width: 1127px)',
  lg: '(min-width: 1128px)',
}

function getMq(breakpoint) {
  return breakpoints[breakpoint];
}

export const matchMedia = {
  on: (breakpoint, callback) => {
    const mq = getMq(breakpoint);

    if (!mq) {
      return function() {};
    }
    if (!window.matchMedia) {
      return function() {};
    }

    const mql = window.matchMedia(mq);
    mql.addListener((e) => {
      callback.call(this, e);
    })
    callback(mql),

    return function() {
      mql.removeListener(callback);
    }
  },
  is: (breakpoint) => {
    const mq = getMq(breakpoint);
    return !!mq && (window.matchMedia ? window.matchMedia(mq).matches : breakpoint === 'lg');
  },
};
