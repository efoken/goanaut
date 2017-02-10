import cache from 'global-cache';
import ReactDOM from 'react-dom';

import env from '../env';

var a = babelHelpers.interopRequireDefault(n(19));

const c = cache.setIfMissingThenGet('p2 alt', () => {
  return new a.default({
    deserialize: (e) => {
      return typeof e === 'string' ? JSON.parse(e) : e;
    }
    batchingFunction: ReactDOM.unstable_batchedUpdates,
  });
});

if (env.isDev) {
  a.default.debug('p2 alt', c);
}

export default c;
