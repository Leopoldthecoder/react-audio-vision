import { eslint } from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-only'

export default {
  input: 'example/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    sourcemap: true
  },
  plugins: [
    eslint({
      exclude: '**.css'
    }),
    babel({
      babelrc: false,
      exclude: '**.css',
      presets: [ ['@babel/preset-env', { modules: false }], '@babel/preset-react' ],
      plugins: ['@babel/plugin-proposal-class-properties']
    }),
    cjs({
      namedExports: {
        'node_modules/react/index.js': ['Component', 'StrictMode']
      }
    }),
    resolve({
      browser: true,
    }),
    css({
      output: 'dist/index.css'
    })
  ],
  external: ['react', 'react-dom']
}