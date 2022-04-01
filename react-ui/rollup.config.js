import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

//TODO: Review to not include stories nor tests
//dts plugin conflicts to alias/paths '@/' ou '~/'

//TODO: Future check prod or DEV?
const sourcemap = true
const outDir = 'dist'
const outDirTypes = `${outDir}/types`

//const external = [...Object.keys({ ...pkg.peerDependencies })]
const external = [{ "react": "^17.0.2"}, {"react-dom": "^17.0.2"}]

const tsConfigOption = {
  tsconfig: './tsconfig.json',
  exclude: [
    'dist',
    'node_modules',
    'dev-docs',
    'src/**/*.test.tsx',
    'src/**/*.stories.tsx',
    'src/stories/**/*',
    'stories/**/*',
  ],
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap,
      },
    ],
    external,
    watch: {
      include: 'src/**',
    },
    plugins: [
      del({
        targets: `${outDir}/*`,
        hook: 'buildStart',
      }),
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript(tsConfigOption),
      sourcemaps(),
      terser(),
    ],
  },
  {
    input: `${outDirTypes}/index.d.ts`,
    output: [{ file: `${outDir}/index.d.ts`, format: 'esm' }],
    plugins: [
      dts(),
      del({
        targets: [`${outDirTypes}`],
        hook: 'buildEnd',
      }),
    ],
  },
]
