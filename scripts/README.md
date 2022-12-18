# scripts

## release

Release code.

Example: Release code with version by `process.env.VERSION` or `package.json`.

```
const pkgVersion = process.env.VERSION || require('../package.json').version;
release(pkgVersion);
```
