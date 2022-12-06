/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
// DOM

import { newLine, getDomain } from '../lib/index.esm';

test(`newLine: Transfer 'a\nb\nc' to 'a<br />b<br />c'?`, () => {
  expect(newLine('a\nb\nc')).toBe('a<br />b<br />c');
});

test(`newLine: Transfer 'a\n\nbc' to 'a<br /><br />bc'?`, () => {
  expect(newLine('a\n\nbc')).toBe('a<br /><br />bc');
});

// test(`Load JavsScript script: 'https://i.mazey.net/mazey/lib/mazey.min.js'?`, async () => {
//   const res = await loadScript(
//     'https://i.mazey.net/mazey/lib/mazey.min.js',
//     {
//       id: 'iamid', // (Optional) script ID, default none
//       timeout: 5000, // (Optional) timeout, default `5000`
//       isDefer: false, // (Optional) defer, default `false`
//     }
//   );
//   expect(res).toBe(true);
// });

test(`Can get Domain's params correctly? 'https://i.mazey.net/mazey/lib/mazey.min.js'?`, async () => {
  const res = await getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']); // example.com/test/thanks
  expect(res).toBe('example.com/test/thanks');
});

// Simulate the async.
function wasteTime (ms) {
  return new Promise(resolve => setTimeout(() => {
      resolve(ms);
      // console.log('waste', ms);
  }, ms));
}

test(`Can run async test?`, async () => {
  const res = await wasteTime(1000);
  expect(res).toBe(1000);
});
