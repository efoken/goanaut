const env = {};

let isDev = () => {
  const testDev = /(^|\s+)development($|\s+)/.test(document.body.className);
  env.isDev = isDev = testDev ? () => true : () => false; // eslint-disable-line
  return testDev;
};

const isProd = () => !isDev();

env.isDev = isDev;
env.isProd = isProd;

export default env;
