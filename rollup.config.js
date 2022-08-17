import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from 'rollup-plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';

// https://rollupjs.org/guide/en/
export default {
  input: 'src/index.ts',
  // https://rollupjs.org/guide/en/#outputformat
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
    },
    {
      file: 'lib/index.iife.js',
      format: 'iife',
      name: '$mazey',
    },
  ],
  plugins: [
    // Remove the `lib` directory before rebuilding.
    cleaner({
      targets: [
        './lib/',
      ]
    }),
    rollupTypescript(),
    commonjs({
      include: /node_modules/
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
    })
  ],
  external: [],
};
