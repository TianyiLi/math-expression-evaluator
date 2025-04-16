import { $, build, Glob } from 'bun';
import { program, Option } from 'commander'
const glob = new Glob('./src/functionAdapters/**/*.ts')

program.addOption(new Option('-m, --mode <mode>', 'The mode to build in').choices(['esm', 'cjs']))
program.parse()
const mode = program.opts().mode as 'esm' | 'cjs' | undefined ?? 'esm'

const scannedFiles = await Array.fromAsync(glob.scan({ cwd: '.' }))
await build({
	entrypoints: ['./src/index.ts', ...scannedFiles],
	outdir: `./dist/${mode}`,
	format: mode === 'esm' ? 'esm' : 'cjs',
	sourcemap: 'linked',
	minify: true,
	splitting: true,
});
await $`./node_modules/.bin/tsc --project ./tsconfig.types.json`
console.log('done')