const npm = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const cjs = require('rollup-plugin-commonjs');

module.exports = {
  entry: './browser.js',
  dest: './test.js',
  format: 'iife',
  moduleName: 'D',
  sourceMap: true,
  plugins: [
    builtins(),
    npm({
      browser: true,
      preferBuiltins: false
    }),
    cjs({
      include: 'node_modules/**',
      exclude: 'node_modules/rollup-plugin-node-builtins/**',
      namedExports: {
        'node_modules/assert/assert.js': [
          'deepEqual',
          'deepStrictEqual',
          'notDeepEqual',
          'notEqual',
          'strictEqual'
        ]
      }
    }),
    babel({
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**',
      babelrc: false
    })
  ]
};
