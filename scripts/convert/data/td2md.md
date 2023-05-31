Load an image from the given URL.

The target image will be loaded in the background, and the Promise status will change after the image is loaded. If the image fails to load, the Promise status will change to `reject` with the error object. If the image is loaded successfully, the Promise status will change to `resolve` with the image object. This method can be used to preload images and cache them in the browser. It can also be used to implement lazy loading of images.

Note that this method will not add the image to the DOM.

```js
loadImage('https://example.com/example.png')
  .then((img) => {
    console.log(img);
  })
  .catch((err) => {
    console.log(err);
  });
```