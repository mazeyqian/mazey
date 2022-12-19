# scripts

## release

Release this project with version by `process.env.VERSION` or `package.json`.

Usage:

```
const pkgVersion = process.env.VERSION || require('../package.json').version;
release(pkgVersion);
```

It will be more straightforward if you use the development dependence CrossEnv.

```
# Install
npm i cross-env -D

# scripts
cross-env SCRIPTS_NPM_PACKAGE_VERSION=$npm_package_version node ./scripts/release.js

# release.js
release();
```

<!-- @param {string} ver Version
@returns {void} -->
