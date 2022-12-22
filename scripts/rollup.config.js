/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from 'rollup-plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
// import { terser } from 'rollup-plugin-terser';
// import copy from 'rollup-plugin-copy';

const { _resolve } = require('./build-helper');
const pkgVersion = process.env.VERSION || require('../package.json').version;
const banner =
  '/*!\n' +
  ` * mazey v${pkgVersion}\n` +
  ` * (c) 2018-${new Date().getFullYear()} Mazey Chu\n` +
  ' * Released under the MIT License.\n' +
  ' */';

// https://rollupjs.org/guide/en/
export default {
  input: _resolve('../src/index.ts'),
  // https://rollupjs.org/guide/en/#outputformat
  output: [
    {
      file: _resolve('../lib/index.cjs.js'),
      format: 'cjs',
      banner,
    },
    {
      file: _resolve('../lib/index.esm.js'),
      format: 'esm',
      banner,
    },
    {
      file: _resolve('../lib/mazey.min.js'),
      format: 'iife',
      name: 'mazey',
      banner,
    },
  ],
  plugins: [
    // Remove the `lib` directory before rebuilding.
    // https://github.com/aMarCruz/rollup-plugin-cleanup
    cleaner({
      targets: [
        _resolve('../lib/'),
      ],
    }),
    rollupTypescript(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    }),
    // Add minification.
    // https://github.com/TrySound/rollup-plugin-terser
    // terser({ // https://github.com/terser/terser
    //   format: {
    //     // https://github.com/terser/terser#format-options
    //     comments: /^!\n\s\*\smazey/, // 'some', // `false` to omit comments in the output
    //   },
    // }),
    // uglify(),
    // https://www.npmjs.com/package/rollup-plugin-copy
    // copy({
    //   targets: [
    //     {
    //       src: _resolve('../src/t.html'),
    //       dest: _resolve('../docs'),
    //     },
    //   ],
    // }),
  ],
  external: [],
};
