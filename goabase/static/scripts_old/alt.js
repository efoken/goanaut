import Alt from 'alt';
import cache from 'global-cache';
import ReactDOM from 'react-dom';

import env from './env';

const alt = cache.setIfMissingThenGet('alt', () => new Alt({
  deserialize: (e) => {
    if (typeof e === 'string') {
      return JSON.parse(e);
    }
    return e;
  },
  batchingFunction: ReactDOM.unstable_batchedUpdates,
}));

if (env.isDev) {
  Alt.debug('alt', alt);
}

export default alt;
