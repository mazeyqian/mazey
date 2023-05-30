Load a script from the given URL if it (`window['attribute']`) has not already been loaded.

```js
loadScriptIfUndefined('jQuery', 'https://example.com/lib/jquery.min.js')
  .then(() => {
    console.log('jQuery is loaded.');
  })
  .catch(err => {
    console.log('Failed to load jQuery.', err);
  });
```