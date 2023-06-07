const logger = require('./logger.js');

const getEnvironmentVariable = (value) => {
  const envValue = process.env[value];
  if (!envValue) {
    logger.warn(`Env Variable is Null ${envValue}`);
    throw new Error(`Env Variable is Null ${envValue}`);
  } else return envValue;
};

module.exports = {
  getEnvironmentVariable,
};
