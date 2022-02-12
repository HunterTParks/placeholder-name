import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'sugar',
  },
  plugins: [
    typescript({
      tsconfig: 'umd.tsconfig.json',
    }),
  ],
}
