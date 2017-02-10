const env;

const isDev = function() {
  const testDev = /(^|\s+)development($|\s+)/.test(document.body.className);
  env.isDev = isDev = testDev ? function() {
    return true;
  } : function() {
    return false
  };
  return testDev;
};

const isProd = function() {
  return !isDev();
};

env.isDev = isDev
env.isProd = isProd;

export env;
