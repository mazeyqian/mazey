/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const _resolve = (_path) => path.resolve(__dirname, _path);
const format = require('date-fns/format');
// Generate version: 20210308.072903
const genVersion = () => {
  const d = new Date();
  const version = format(d, 'yyyyMMdd.HHmmss');
  return version;
};
const version = genVersion();

module.exports = {
  _resolve,
  version,
};
