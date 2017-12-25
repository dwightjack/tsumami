import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

import { version, name, license, author, homepage } from './package.json';

const banner = `
/**! ${name} - v${version}
 * ${homepage}
 * Copyright (c) ${(new Date().getFullYear())} - ${author};
 * Licensed ${license}
 */
`;

const plugins = [
    resolve({
        preferBuiltins: false
    }),
    commonjs(),
    babel({
        plugins: ['external-helpers'],
        exclude: 'node_modules/**' // only transpile our source code
    })
];

const baseConfig = {
    input: 'src/umd.js',
    amd: { id: 'tsumami' },
    banner
};

const output = (file) => ({
    format: 'umd',
    file,
    name,
    sourcemap: true
});

export default [
    Object.assign({
        output: output('umd/index.js'),
        plugins: [...plugins, filesize()]
    }, baseConfig),
    Object.assign({
        output: output('umd/index.min.js'),
        plugins: [...plugins, uglify({
            warnings: false,
            mangle: true,
            compress: {
                pure_funcs: ['classCallCheck']
            },
            output: {
                beautify: false
            }
        }), filesize()]
    }, baseConfig)
];