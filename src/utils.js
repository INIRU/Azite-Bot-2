const logger = require('./logger.js');

const getEnvironmentVariable = (value) => {
  const envValue = process.env[value];
  if (!envValue) {
    logger.error(`Env Variable is Null ${value}`);
    throw new Error(`Env Variable is Null ${value}`);
  } else return envValue;
};

module.exports = {
  getEnvironmentVariable,
};
