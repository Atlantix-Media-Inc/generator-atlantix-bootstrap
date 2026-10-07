import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    minifyHTML(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declarationDir: './dist/types'
    }),
    nodeResolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
