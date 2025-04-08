import { build } from 'bun';

await build({
	entrypoints: ['./src/index.ts', './src/functionAdapters/index.ts'],
	outdir: './dist/es',
	format: 'esm',
	sourcemap: 'linked',
	minify: true,
	splitting: true,
});

