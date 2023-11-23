/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from 'rollup-plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
// import replace from '@rollup/plugin-replace';
// import copy from 'rollup-plugin-copy';

const { _resolve } = require('./build-helper');
const pkgVersion = process.env.SCRIPTS_NPM_PACKAGE_VERSION || process.env.VERSION || require('../package.json').version;
const debugMode = process.env.SCRIPTS_NPM_PACKAGE_DEBUG;
const banner =
  '/*!\n' +
  ` * Mazey v${pkgVersion} https://github.com/mazeyqian/mazey\n` +
  ` * (c) 2018-${new Date().getFullYear()} Cheng\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const plugins = [
  // replace({
  //   __MAZEY_NPM_PACKAGE_VERSION__: pkgVersion,
  // }),
  // Remove the `lib` directory before rebuilding.
  // https://github.com/aMarCruz/rollup-plugin-cleanup
  // cleaner({
  //   targets: [
  //     _resolve('../lib/'),
  //   ],
  // }),
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
  // dts(),
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
];

const iifePlugins = [];

// console.log('debugMode:', debugMode);
if (debugMode !== 'open') {
  iifePlugins.push(
    // Add minification.
    // https://github.com/TrySound/rollup-plugin-terser
    terser({ // https://github.com/terser/terser
      format: {
        // https://github.com/terser/terser#format-options
        comments: /^!\n\s\*\smazey/, // 'some', // `false` to omit comments in the output
      },
    }),
  );
}

const dTsConf = {
  input: _resolve('../src/typing.d.ts'),
  // https://rollupjs.org/guide/en/#outputformat
  output: [
    {
      file: _resolve('../lib/typing.d.ts'),
      format: 'es',
    },
  ],
  plugins: [
    // ...plugins,
    // cleaner({
    //   targets: [
    //     _resolve('../lib/index.d.ts'),
    //   ],
    // }),
    dts(),
  ],
  external: [],
};

// console.log('dTsConf:', dTsConf);

// https://rollupjs.org/guide/en/
export default [
  {
    input: _resolve('../src/index.ts'),
    // https://rollupjs.org/guide/en/#outputformat
    output: [
      {
        file: _resolve('../lib/index.cjs.js'),
        format: 'cjs',
        banner,
        plugins: iifePlugins,
      },
      {
        file: _resolve('../lib/index.esm.js'),
        format: 'esm',
        banner,
        plugins: iifePlugins,
      },
      {
        file: _resolve('../lib/mazey.min.js'),
        format: 'iife',
        name: 'mazey',
        banner,
        plugins: iifePlugins,
      },
    ],
    plugins: [
      ...plugins,
      cleaner({
        targets: [
          _resolve('../lib/'),
        ],
      }),
    ],
    external: [],
  },
  dTsConf,
];
