const def = require('./default');
const dev = require('./development');
const prod = require('./production');

function getConfiguration() {
  if (process.env.NODE_ENV === 'development') {
    console.log('returning DEVELOPMENT CONFIG');
    console.log(dev);
    return dev;
  } else if (process.env.NODE_ENV === 'production') {
    console.log('returning PRIDUCTION CONFIG');
    console.log(prod);
    return prod;
  }
  return def;
}

module.exports = getConfiguration();
