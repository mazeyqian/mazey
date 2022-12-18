# scripts

## release

Release this project with version by `process.env.VERSION` or `package.json`.

Usage:

```
const pkgVersion = process.env.VERSION || require('../package.json').version;
release(pkgVersion);
```

<!-- @param {string} ver Version
@returns {void} -->
