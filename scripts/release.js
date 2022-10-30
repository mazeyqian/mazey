/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// release
const { release } = require('./github-helper');
const pkgVersion = process.env.VERSION || require('../package.json').version;

release(pkgVersion);
