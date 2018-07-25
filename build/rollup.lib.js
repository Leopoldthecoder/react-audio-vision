const rollup = require('rollup')
const eslint = require('rollup-plugin-eslint').eslint
const babel = require('rollup-plugin-babel')
const cjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const inputOptions = {
  input: 'src/react-audio-vision.js',
  plugins: [
    eslint(),
    babel({
      babelrc: false,
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
    })
  ],
  external: ['react', 'react-dom']
}

const outputOptions = {
  name: 'AudioVision',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}

const build = async config => {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(Object.assign(outputOptions, config))
}

build({ file: 'lib/index.common.js', format: 'cjs' })
build({ file: 'lib/index.umd.js', format: 'umd' })
build({ file: 'lib/index.es.js', format: 'es' })
