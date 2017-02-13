import Alt from 'alt';
import cache from 'global-cache';
import ReactDOM from 'react-dom';

import env from './env';

const p2Alt = cache.setIfMissingThenGet('p2 alt', () => new Alt({
  deserialize: (e) => {
    if (typeof e === 'string') {
      return JSON.parse(e);
    }
    return e;
  },
  batchingFunction: ReactDOM.unstable_batchedUpdates,
}));

if (env.isDev) {
  Alt.debug('p2 alt', p2Alt);
}

export default p2Alt;
