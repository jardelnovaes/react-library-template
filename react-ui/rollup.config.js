import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import glob from 'glob'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'
import buildDistFiles from './scripts/buildDistFiles'

//TODO: Review to not include stories nor tests

//TODO: Future check prod or DEV?
const sourcemap = true
const external = [...Object.keys({ ...pkg.peerDependencies })]

const outDir = 'dist'
const outDirTypes = `${outDir}/types`
const multiEntryInput = {}
const multiEntryInputTypes = {}
const copyDisFilesTarget = buildCopyDistFiles()

function buildCopyDistFiles() {
  const target = [{ src: 'README.md', dest: 'dist/' }]
  if (sourcemap) {
    target.push({ src: 'src/', dest: 'dist/' })
  }
  return target
}

glob('src/*/index.{ts,tsx}', null, function (err, files) {
  if (err) {
    console.error(err)
    return
  }
  //multiEntryInput[]
  for (const file of files) {
    const id = file.match(/\w+/g)[1]
    console.log(`Adding file: ${file} to multiEntry items (id: ${id})`)
    multiEntryInput[id] = file
    multiEntryInputTypes[id] = `${outDirTypes}/${id}/index.d.ts`
  }
})

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
      typescript({ tsconfig: './tsconfig.json' }),
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
  {
    input: multiEntryInput,
    output: [
      {
        dir: `${outDir}`,
        format: 'cjs',
        exports: 'named',
        sourcemap,
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          outDir: `${outDir}`,
          declarationDir: `${outDirTypes}`,
        },
      }),
    ],
  },
  {
    input: multiEntryInputTypes,
    output: [
      {
        dir: `${outDir}`,
        format: 'esm',
      },
    ],
    plugins: [
      dts(),
      copy({
        targets: copyDisFilesTarget,
      }),
      buildDistFiles(outDir),
      del({
        targets: [`${outDirTypes}`],
        hook: 'buildEnd',
      }),
    ],
  },
]
